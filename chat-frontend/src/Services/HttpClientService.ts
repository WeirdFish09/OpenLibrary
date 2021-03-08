import { Chat } from "../Models/Chat";
import authService from "./AuthService";
import { Configuration } from '../configuration/environments';
class HttpClientService{
    getUserChats(): Promise<Response>{
        return fetch(Configuration.webApiUrl + '/chats', {
            method: 'GET',
            headers:{
                'Authorization': 'Bearer ' + authService.getToken()
            }
        });
    }
    getChatByid(chatId: string){
        const request = fetch(Configuration.webApiUrl + '/chats/' + chatId, {
            method: 'GET',
            headers:{
                'Authorization': 'Bearer ' + authService.getToken()
            }
        }).then(response => {
            response.json().then((chat: Chat) => {
                return chat;
            })
        })
    }

}

const httpClientService = new HttpClientService();
export default httpClientService;