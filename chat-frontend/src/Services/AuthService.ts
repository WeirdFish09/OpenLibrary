import jwt_decode from 'jwt-decode';

const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjI3NmQ3M2FlLTVkNDctNDZmYS05Yzk3LWFkMmEzNTFlYTFkNSIsImV4cCI6MTYxNTI1MDc4NSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMCIsImF1ZCI6IlJQaUF1ZGlvIn0.n5XmyW_WzQf851Dp6US3H-Y18V9ykjMdZnDvTr4ItZ4';

class AuthService {
    getToken() {
        return token;
    }

    getUserId() {
        const tokenData: any = jwt_decode(this.getToken()); 
        const userId = tokenData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        return userId;
    }
}

const authService = new AuthService();
export default authService;