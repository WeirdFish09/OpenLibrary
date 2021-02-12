using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OpenLibraryServer.DataAccess;
using OpenLibraryServer.Models;
using OpenLibraryServer.Models.DTOs;
using OpenLibraryServer.Service.Exceptions;
using OpenLibraryServer.Service.Interfaces;

namespace OpenLibraryServer.Service
{
    public class BookService : IBookService
    {
        private readonly OpenLibraryServerDBContext _dbContext;

        public BookService(OpenLibraryServerDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Genre>> GetBookGenres()
        {
            return await _dbContext.Genres.ToListAsync();
        }

        public async Task<BookTO> GetById(Guid guid)
        {
            var book = await GetDBBookById(guid);
            return ConvertToTO(book);
        }

        private async Task<Book> GetDBBookById(Guid guid)
        {
            var book = await _dbContext.Books.Include(b => b.Genres).FirstOrDefaultAsync(b => b.BookId == guid);
            if (book == null)
            {
                throw new NotFoundException($"Book with Id {guid} not found");
            }

            return book;
        }

        public async Task<IEnumerable<BookTO>> GetByFilter(BookFilter filter, int count, int offset)
        {
            var books = _dbContext.Books.AsQueryable();
            if (filter.Title != "")
            {
                books = books.Where(b => b.Title.ToLower().Contains(filter.Title.ToLower()));
            }
            if (filter.Genres.Length > 0)
            {
                books = books.Where(b => filter.Genres.All(g => b.Genres.Any(bg => bg.GenreId == g)));
            }
            if (filter.Author != "")
            {
                books = books.Where(b => b.Author.ToLower().Contains(filter.Author.ToLower()));
            }

            return await books.Include(b => b.Genres).Skip(offset).Take(count)
                .Select(b => ConvertToTO(b)).ToListAsync();
        }

        public async Task<BookTO> AddBook(BookTO bookTo)
        {
            var book = new Book()
            {
                Author = bookTo.Author,
                Description = bookTo.Description,
                Genres = bookTo.Genres,
                Status = bookTo.Status,
                Title = bookTo.Title,
                FileURL = bookTo.FileURL,
                PictureURL = bookTo.ImageLink
            };
            var newBook = await _dbContext.Books.AddAsync(book);
            await _dbContext.SaveChangesAsync();
            return ConvertToTO(newBook.Entity);
        }

        public async Task ChangeBookStatus(Guid bookId, string status)
        {
            var book = await GetDBBookById(bookId);
            book.Status = status;
            await _dbContext.SaveChangesAsync();
        }

        private static BookTO ConvertToTO(Book book)
        {
            return new BookTO()
            {
                Author = book.Author,
                Description = book.Description,
                Genres = book.Genres,
                Status = book.Status,
                Title = book.Title,
                BookId = book.BookId,
                FileURL = book.FileURL,
                ImageLink = book.PictureURL
            };
        }
    }
}