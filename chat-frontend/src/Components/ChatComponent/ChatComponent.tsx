import { connect } from "react-redux";
import React, { useState } from "react";
import { Chat } from "../../Models/Chat";
import { Message } from "../../Models/Message";
import { loadNewMessage } from "../../Redux/ActionCreators/MessagesActionCreator";
import { State } from "../../Redux/State";
import styles from "./ChatComponent.module.scss";
import socketService from "../../Services/SocketService";
import noData from '../../images/noData.png';

type ChatComponentProps = {
    activeChat: Chat;
    messages: Message[];
    sendMessage: any;
}
const ChatComponent = (props: ChatComponentProps) => {
    const userId = "276d73ae-5d47-46fa-9c97-ad2a351ea1d5";
    const [message, setMessage] = useState("");
    const handleSend = () => {
        socketService.sendMessage(message, props.activeChat.chatId);
    }
    const onMessageChange = (e: React.FormEvent<EventTarget>) => {
        setMessage((e.target as HTMLInputElement).value);
    }

    const messageViews = props.messages.map(message => {
        const msgClassName = message.userId === userId ? styles.messageOwn : styles.messageForeign;
        return (
            <div className={styles.messageContainer}>
                <div className={`${styles.message} ${msgClassName}`}>
                    {message.username}:    {message.message}
                </div>
                <div>
                    {message.dateTime}
                </div>
            </div>
        )
    });
    console.log(props.activeChat);
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
                <>
                    <div className={styles.title}>
                        <span>
                            {props.activeChat.name}
                        </span>
                    </div>
                    <div id="messages-container">
                        {messageViews}
                    </div>
                    {props.activeChat.chatId !== "" ? (
                        <div id="input-container">
                            <input id="message-input" value={message} onChange={onMessageChange} />
                            <button id="send-message-btn" onClick={handleSend}>Send</button>
                        </div>
                    ) : ""}
                </>
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