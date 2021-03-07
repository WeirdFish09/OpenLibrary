import React, {useEffect, useRef, useState} from 'react';
import { Chat } from '../../Models/Chat';
import { Message } from '../../Models/Message';
import ChatListComponent from '../ChatListComponent/ChatListComponent';
import ChatComponent from '../ChatComponent/ChatComponent';
import styles from './ChatPageComponent.module.scss';
import httpClientService from '../../Services/HttpClientService';
import { State } from '../../Redux/State';
import {connect} from 'react-redux';
import { loadAllChats } from '../../Redux/ActionCreators/ChatsActionCreator';

type ChatPageProps = {
    currentChat: Chat;
    chats: Chat[];
    messages: Message[];
    getChats: any;
}
const ChatPageComponent = (props :ChatPageProps) => {
    useEffect(() => {
        httpClientService.getUserChats().then(response => {
            response.json().then((chats: Chat[]) => {
                props.getChats(chats);
            })
        });
    }, []);
    return(
        <div className={styles.chatsPage}>
            <div className={styles.chatsContainer}>
                <div className={styles.chatlistContainer}>
                    <ChatListComponent></ChatListComponent>
                </div>
                <div className={styles.chatContainer}>
                    <ChatComponent></ChatComponent>
                </div>
            </div>
        </div>
    )
}
  
const mapStateToProps = (state: State) => {
    const {messages, chats, activeChat} = state;
    return {
      messages,
      chats,
      currentChat: activeChat
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        getChats: (chats: Chat[]) => dispatch(loadAllChats(chats)) 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatPageComponent);