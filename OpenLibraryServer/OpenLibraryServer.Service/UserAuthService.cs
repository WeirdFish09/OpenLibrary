using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using OpenLibraryServer.DataAccess;
using OpenLibraryServer.Models;
using OpenLibraryServer.Models.DTOs;
using OpenLibraryServer.Service.Exceptions;
using OpenLibraryServer.Service.HelperFunctions;
using OpenLibraryServer.Service.Interfaces;

namespace OpenLibraryServer.Service
{
    public class UserAuthService : IUserAuthService
    {
        private readonly OpenLibraryServerDBContext _dbContext;
        private readonly TokenConfig _tokenConfig;
        private readonly SigningCredentials _signingCredentials;
        private readonly JwtSecurityTokenHandler _tokenHandler;

        public UserAuthService(OpenLibraryServerDBContext dbContext, IOptions<TokenConfig> tokenConfig)
        {
            _dbContext = dbContext;
            _tokenConfig = tokenConfig.Value;
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_tokenConfig.Secret));
            _signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
            _tokenHandler = new JwtSecurityTokenHandler();
        }
        
        private string CreateJWT(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name,user.UserId.ToString())
            };

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: _tokenConfig.Issuer,
                audience: _tokenConfig.Audience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(_tokenConfig.JWTLifetime),
                signingCredentials: _signingCredentials
            );

            return _tokenHandler.WriteToken(token);
        }
        private string GenerateRefreshToken()
        {
            return Guid.NewGuid().ToString();
        }
        private TokenTO CreateTokenTO(User user)
        {
            var accessToken = CreateJWT(user);
            var refreshTokenValue = GenerateRefreshToken();
            return new TokenTO() { AccessToken = accessToken, RefreshToken = refreshTokenValue };
        }
        
        private Guid GetUserId(TokenTO tokenTO)
        {
            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(tokenTO.AccessToken);
            return Guid.Parse(token.Id);
        }

        public async Task<TokenTO> RefreshToken(TokenTO tokenTO)
        {
            var userId = GetUserId(tokenTO);
            var user = await GetDBUser(userId);
            var token = await _dbContext.Tokens.FirstOrDefaultAsync(t => t.RefreshToken == tokenTO.RefreshToken);
            _dbContext.Tokens.Remove(token);

            var newToken = CreateTokenTO(user);
            var dbToken = new Token()
            {
                RefreshToken = newToken.RefreshToken,
                User = user,
                DueDate = DateTime.Now.AddMinutes(_tokenConfig.RefreshTokenLifetime)
            };
            await _dbContext.Tokens.AddAsync(dbToken);
            await _dbContext.SaveChangesAsync();
            return newToken;
        }
        
        public async Task<UserTO> GetUserById(Guid userId)
        {
            var user = await GetDBUser(userId);
            return new UserTO()
            {
                UserId = user.UserId,
                UserName = user.UserName,
                UITheme = user.UITheme
            };
        }

        private async Task<User> GetDBUser(Guid userId)
        {
            User user = await _dbContext.Users.FirstOrDefaultAsync(u => u.UserId == userId);
            if (user == null)
            {
                throw new NotFoundException($"User with Id {userId} not found");
            }

            return user;
        }

        public async Task<TokenTO> Login(LoginTO loginTO)
        {
            User user = await _dbContext.Users.FirstOrDefaultAsync(u => u.UserName == loginTO.UserName);
            if(user == null)
                throw new NotFoundException($"User with username {loginTO.UserName} not found");

            if(!PasswordHelpers.ValidatePassword(loginTO.Password, user.PasswordSalt, user.PasswordHash))
                throw new Exception("Invalid password");

            var tokenTO = CreateTokenTO(user);
            var dbToken = new Token()
            {
                RefreshToken = tokenTO.RefreshToken,
                User = user,
                DueDate = DateTime.Now.AddMinutes(_tokenConfig.RefreshTokenLifetime)
            };
            await _dbContext.Tokens.AddAsync(dbToken);
            await _dbContext.SaveChangesAsync();
            return tokenTO;
        }

        public async Task Register(RegisterTO registerTo)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.UserName == registerTo.UserName);
            if (user != null)
                throw new AlreadyExistsException($"User with username {registerTo.UserName} already exists");

            byte[] passwordSalt = PasswordHelpers.GenerateSalt();
            string passwordHash = PasswordHelpers.HashPassword(registerTo.Password, passwordSalt);

            User newUser = new User()
            {
                UserName = registerTo.UserName,
                PasswordSalt = Convert.ToBase64String(passwordSalt),
                PasswordHash = passwordHash
            };
            await _dbContext.Users.AddAsync(newUser);
            await _dbContext.SaveChangesAsync();
        }
    }
}