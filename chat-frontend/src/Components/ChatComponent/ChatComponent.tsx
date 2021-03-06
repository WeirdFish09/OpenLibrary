import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { Chat } from "../../Models/Chat";
import { Message } from "../../Models/Message";
import { loadNewMessage } from "../../Redux/ActionCreators/MessagesActionCreator";
import { State } from "../../Redux/State";
import styles from "./ChatComponent.module.scss";
import socketService from "../../Services/SocketService";
import noData from '../../images/noData.png';
import Moment from 'moment';
import authService from '../../Services/AuthService';

type ChatComponentProps = {
    activeChat: Chat;
    messages: Message[];
    sendMessage: any;
}
const ChatComponent = (props: ChatComponentProps) => {
    const [message, setMessage] = useState("");

    const userId = authService.getUserId();

    const scroll = ()  => {
        const objDiv = document.getElementById("messagesList");
        if (objDiv != null) {
            objDiv.scrollTop = objDiv.scrollHeight;
        }
    };

    useEffect(() => {
        scroll();
    }, [props.messages]);

    const handleSend = () => {
        if (message == "") {
            return;
        }

        socketService.sendMessage(message, props.activeChat.chatId);
        setMessage("");
    }
    const onMessageChange = (e: React.FormEvent<EventTarget>) => {
        setMessage((e.target as HTMLInputElement).value);
    }

    const messageViews = props.messages.map(message => {
        const msgClassName = message.userId === userId ? styles.messageOwn : styles.messageForeign;
        return (
            <div key={`${message.userId}${message.dateTime}`} className={`${styles.messageData} ${msgClassName}`}>
                <div className={styles.userName}>{message.username}</div>
                <div className={styles.message}>
                    {message.message}
                </div>
                <div className={styles.dateTime}>
                    {Moment(message.dateTime).format('DD MMM H:mm')}
                </div>
                <div className={styles.rectangle}></div>
            </div>
        )
    });
    
    return (
        <div className={styles.chatContainer}>
            {props.activeChat.chatId == "" ? (
                <div className={styles.noData}>
                    <img src={noData} />
                    <p>
                        No chat selected... 
                    </p>
                </div>
            ) : (
                <div className={styles.chatData}>
                    <div className={styles.title}>
                        <span>
                            {props.activeChat.name}
                        </span>
                    </div>
                    <div className={styles.messagesList} id="messagesList">
                        <div className={styles.messagesContainer}>
                            {messageViews}
                        </div>
                    </div>
                    {props.activeChat.chatId !== "" ? (
                        <div className={styles.inputContainer}>
                            <input className={styles.messageInput} value={message} onChange={onMessageChange} placeholder="Write a message..." />
                            <button className={styles.sendMessageBtn} onClick={handleSend}>Send</button>
                        </div>
                    ) : ""}
                </div>
            )} 
        </div>
    )
}

const mapStateToProps = (state: State) => {
    const { messages, activeChat } = state;
    return {
        messages,
        activeChat: activeChat
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        sendMessage: (message: Message) => dispatch(loadNewMessage(message))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatComponent);