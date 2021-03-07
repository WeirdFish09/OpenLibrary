import { connect } from "react-redux";
import React, { Component, SyntheticEvent, useState } from "react";
import { Chat } from "../../Models/Chat";
import { Message } from "../../Models/Message";
import { loadNewMessage } from "../../Redux/ActionCreators/MessagesActionCreator";
import { State } from "../../Redux/State";
import "./ChatComponent.scss";
import socketService from "../../Services/SocketService";
import { sendMessage } from "@microsoft/signalr/dist/esm/Utils";

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
        const msgClassName = message.userId === userId ? "message-own" : "message-foreign";
        return (
            <div className="message-container">
                <div className={`message ${msgClassName}`}>
                    {message.username}:    {message.message}
                </div>
                <div>
                    {message.dateTime}
                </div>
            </div>
        )
    });

    return (
        <div id="chat-container">
            <div id="title">
                <span>
                    Title
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