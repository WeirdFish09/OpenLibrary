import jwtDecode from "jwt-decode";

class UserTokenService {
    saveToken(accessToken: string) {
        localStorage.setItem('token', accessToken);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getUserId() {
        const token = this.getToken();
        if (token == null || token == undefined) {
            return null;
        }

        const tokenData: any = jwtDecode(token);
        return tokenData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    }

    getUserName() {
        const token = this.getToken();
        if (token == null || token == undefined) {
            return null;
        }

        const tokenData: any = jwtDecode(token);
        return tokenData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    }

    cleanToken() {
        localStorage.removeItem('token');
    }

    isUserAuthorized() {
        return !!this.getToken();
    }
}

const userTokenService = new UserTokenService();

export default userTokenService;