import React, { useEffect } from 'react';
import { Chat } from '../../Models/Chat';
import { loadSelectedChat } from '../../Redux/ActionCreators/ActiveChatActionCreator';
import { ActiveChatReducer } from '../../Redux/Reducers/ActiveChatReducer';
import { State } from '../../Redux/State';
import './ChatListComponent.css';
import {connect} from 'react-redux';
import socketService from '../../Services/SocketService';

type ChatListProp = {
    chats: Chat[];
    activeChat: Chat;
    setActiveChat: any;
}
class ChatListComponent extends React.Component<ChatListProp>{
    constructor(props: ChatListProp){
        super(props);
    }
    chatViews: any;
    private handleSelectChat(id: string): void{
        socketService.joinChat(id);
        this.props.setActiveChat(this.props.chats.filter(c => c.chatId == id)[0]);
    }
    private mapChats(){
        return this.props.chats.map(chat => {
            console.log(chat);
            const lastMessage = chat.lastMessage ? chat.lastMessage.username + ": " + chat.lastMessage.message
                : null;
            return(
            <div key={chat.chatId} className={chat === this.props.activeChat ? "chat-element-own":"chat-element"} onClick={() => this.handleSelectChat(chat.chatId)}>
                <div className="chat-img-container">
                    <img src={chat.imageURL} className="chat-img"></img>
                </div>
                <div className="chat-text-container">
                    <div className="chat-title-container">
                        {chat.name}
                    </div>
                    <div className="chat-lastmessage-container">
                        {lastMessage ?? "<i>No messages yet...</i>"}
                    </div>
                </div>
            </div>
            )
        })
    }

    render(){
        let chatZone;
        if(this.props.chats.length){
            chatZone = this.mapChats();
        } else {
            chatZone = "You aren't a part of any chats yet.";
        }
        return(
            <div className="chats-container">
                {chatZone}
            </div>
        )  
    }
}
const mapStateToProps = (state: State) => {
    const {chats, activeChat} = state;
    return {
      chats,
      activeChat: activeChat
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        setActiveChat:(chat: Chat) => dispatch(loadSelectedChat(chat))
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (ChatListComponent);