import axios, { AxiosRequestConfig } from 'axios';
import env from '@/config/env';
import userTokenService from './userTokenService'
import router from '@/router';


class UserService {
    login(userName: string, password: string) {
        const loginModel = {
          userName: userName,
          password: password
        };

        axios
            .post(`${env.apiUrl}/users/login`, loginModel)
            .then(response => {
                console.log('ok', response);
                userTokenService.saveToken(response.data.accessToken);
                router.push({ name: 'UserProfile' });
            }, error => {
                const errorData = error.response.data; 
                alert(errorData.ErrorMessage);
                console.log(errorData);
            });
    }

    register(userName: string, password: string) {
        const registerModel = {
          userName: userName,
          password: password,
          confirmPassword: password
        };

        axios
            .post(`${env.apiUrl}/users/register`, registerModel)
            .then(response => {
                alert('User registered, please log in');
                router.push({ name: 'Login' });
            }, error => {
                const errorData = error.response.data; 
                alert(errorData.ErrorMessage);
                console.log(errorData);
            });
    }

    getCurrentUser() {
        const currentUserId = userTokenService.getUserId();

        return axios
            .get(`${env.apiUrl}/users/${currentUserId}`, this.getAxiosRequestConfig());
    }

    changePassword(oldPassword: string, newPassword: string) {
        return axios
            .post(`${env.apiUrl}/users/changePassword`, { oldPassword, newPassword }, this.getAxiosRequestConfig());
    }
    
    logout() {
        userTokenService.cleanToken();
        router.push({ name: 'Login' });
    }

    private getAxiosRequestConfig() {
        const accessToken = userTokenService.getToken();

        const config: AxiosRequestConfig = {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        };

        return config;
    }
}

const userService = new UserService();

export default userService;