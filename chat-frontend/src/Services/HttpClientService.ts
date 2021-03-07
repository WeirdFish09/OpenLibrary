import { Chat } from "../Models/Chat";
import { loadSelectedChat } from "../Redux/ActionCreators/ActiveChatActionCreator";
import { loadAllChats } from "../Redux/ActionCreators/ChatsActionCreator";
import { store } from "../Redux/Store";

const token: string = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjI3NmQ3M2FlLTVkNDctNDZmYS05Yzk3LWFkMmEzNTFlYTFkNSIsImV4cCI6MTYxNDkyODEzNSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMCIsImF1ZCI6IlJQaUF1ZGlvIn0.WM1hj8k7XWZdxRAwOtz5hZCzqoIqFvgvEy8D0Rhswng';
const hostURL = 'http://localhost:5000';
const apiURL: string = hostURL + '/api';

class HttpClientService{
    getUserChats(): Promise<Response>{
        return fetch(apiURL + '/chats', {
            method: 'GET',
            headers:{
                'Authorization': 'Bearer ' + token
            }
        });
    }
    getChatByid(chatId: string){
        const request = fetch(apiURL + '/chats/' + chatId, {
            method: 'GET',
            headers:{
                'Authorization': 'Bearer ' + token
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