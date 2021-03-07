import { CHAT_LOAD_SELECTED, ActionType } from "../ActionTypes";
import { Chat } from "../../Models/Chat";
import { State } from "../State";

const initialState: Chat = {
    chatId: "",
    imageURL: "",
    lastMessage: {
        message: "",
        username: "",
        dateTime: 0,
        userId: ""
    },
    name: ""
};

export const ActiveChatReducer = (activeChat: Chat = initialState, action: ActionType) => {
    if (action.type === CHAT_LOAD_SELECTED) {
        return action.payload;
    }
    return activeChat;
}