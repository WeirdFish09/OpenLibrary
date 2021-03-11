import jwt_decode from 'jwt-decode';

const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjI3NmQ3M2FlLTVkNDctNDZmYS05Yzk3LWFkMmEzNTFlYTFkNSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJ0ZXN0MSIsImV4cCI6MTYxNTUyNDgzMywiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMCIsImF1ZCI6IlJQaUF1ZGlvIn0.prA4NzlCC3b302qoJRN_KxG3rjzBEqAKGxQMRekdJfc';

class AuthService {
    getToken() {
        return localStorage.getItem('token') || '';

        //return token;
    }

    checkToken() {
        if (!this.getToken()) {
            this.logout();
        }
    }

    getUserId() {
        const tokenData: any = jwt_decode(this.getToken()); 
        const userId = tokenData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        return userId;
    }

    getUserName() {
        const tokenData: any = jwt_decode(this.getToken()); 
        const userName = tokenData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
        return userName;
    }

    logout() {
        localStorage.removeItem('token');
        window.location.pathname = '/Login';
    }
}

const authService = new AuthService();
export default authService;