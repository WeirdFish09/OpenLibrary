import { CHAT_LOAD_SELECTED, ActionType, MESSAGES_LOAD_NEW } from "../ActionTypes";
import { Chat } from "../../Models/Chat";
import { State } from "../State";
import { act } from "react-dom/test-utils";

const initialState: Chat = {
    chatId: "",
    imageURL: "",
    lastMessage: {
        message: "",
        username: "",
        dateTime: 0,
        userId: "",
        chatId: ""
    },
    name: ""
};

export const ActiveChatReducer = (activeChat: Chat = initialState, action: ActionType) => {
    if (action.type === CHAT_LOAD_SELECTED) {
        return action.payload;
    }
    return activeChat;
}