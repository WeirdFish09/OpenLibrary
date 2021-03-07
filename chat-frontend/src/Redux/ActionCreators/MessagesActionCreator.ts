import { Message } from "../../Models/Message";
import { MESSAGES_LOAD_ALL, MESSAGES_LOAD_NEW } from "../ActionTypes";

export const loadNewMessage = (message: Message) => {
    return {
        type: MESSAGES_LOAD_NEW,
        payload: message
    };
}

export const loadAllMessages = (messages: Message[]) => {
    return {
        type: MESSAGES_LOAD_ALL,
        payload: messages
    };
}