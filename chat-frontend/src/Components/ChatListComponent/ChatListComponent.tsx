import React from 'react';
import { Chat } from '../../Models/Chat';
import { loadSelectedChat } from '../../Redux/ActionCreators/ActiveChatActionCreator';
import { State } from '../../Redux/State';
import {connect} from 'react-redux';
import socketService from '../../Services/SocketService';
import styles from './ChatListComponent.module.scss';

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
            const lastMessage = chat.lastMessage ? chat.lastMessage.username + ": " + chat.lastMessage.message
                : null;
            return (
                <div key={chat.chatId} className={`${chat.chatId === this.props.activeChat.chatId ? styles.chatSelected : ""} ${styles.chatElement}`} onClick={() => this.handleSelectChat(chat.chatId)}>
                    <div className={styles.chatImgContainer}>
                        <img src={chat.imageURL} className={styles.chatImg}></img>
                    </div>
                    <div className={styles.chatTextContainer}>
                        <div className={styles.chatTitleContainer}>
                            {chat.name}
                        </div>
                        <div className={styles.chatLastmessageContainer}>
                            {lastMessage ?? (<i>No messages yet...</i>)}
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
            chatZone = (
                <div className={styles.noChats}>
                    <p>You aren't a part of any chats yet.</p>
                </div>
            );
        }

        return(
            <div className={styles.chatsContainer}>
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