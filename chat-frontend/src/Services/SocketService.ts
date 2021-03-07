import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import {Message} from "../Models/Message";
import { loadAllMessages, loadNewMessage } from "../Redux/ActionCreators/MessagesActionCreator";
import { store } from "../Redux/Store";
const token: string = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjI3NmQ3M2FlLTVkNDctNDZmYS05Yzk3LWFkMmEzNTFlYTFkNSIsImV4cCI6MTYxNDkyODEzNSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMCIsImF1ZCI6IlJQaUF1ZGlvIn0.WM1hj8k7XWZdxRAwOtz5hZCzqoIqFvgvEy8D0Rhswng';
const hostURL = 'http://localhost:5000';
const apiURL: string = hostURL + '/api';


class SocketService{
    connection: any = null;
    configure(dispatch: any) {
        this.connection = new HubConnectionBuilder()
        .withUrl(hostURL + '/chat', {accessTokenFactory: () => token})
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