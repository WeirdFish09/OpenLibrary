import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import {Message} from "../Models/Message";
import { loadAllMessages, loadNewMessage } from "../Redux/ActionCreators/MessagesActionCreator";
import { store } from "../Redux/Store";
import { Configuration } from '../configuration/environments';
import authService from './AuthService';

class SocketService{
    connection: any = null;

    configure(dispatch: any) {
        this.connection = new HubConnectionBuilder()
            .withUrl(Configuration.socketUrl + '/chathub', {accessTokenFactory: () => authService.getToken()})
            .withAutomaticReconnect()
            .build();

        this.connection.on('ReceiveMessage', (message: Message) => {
            dispatch(loadNewMessage(message));
        });
        this.connection.on('ReceiveMessageHistory', (messageHistory: Message[]) =>{
            dispatch(loadAllMessages(messageHistory));
        })
        this.connection.start();
    }

    joinChat(chatId: string){
        this.connection.invoke("JoinChat",chatId);
    }
    
    leaveChat(chatId: string){
        this.connection.invoke("LeaveChat",chatId)
    }
    
    sendMessage(message: string, chatId: string){
        this.connection.invoke("SendMessage", {chatId, message});
    }
}


const socketService = new SocketService();
export default socketService;