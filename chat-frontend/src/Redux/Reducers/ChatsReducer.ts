import { CHATS_LOAD_ALL, ActionType, MESSAGES_LOAD_NEW } from "../ActionTypes";
import { Chat } from "../../Models/Chat";
import { act } from "react-dom/test-utils";

export const ChatsReducer = (chats: Chat[] = [], action: ActionType) => {
    if (action.type === CHATS_LOAD_ALL) {
        return action.payload;
    } else if (action.type === MESSAGES_LOAD_NEW) {
        return chats.map(c => c.chatId === action.payload.chatId ? { ...c, lastMessage: action.payload } : c);
    }
    return chats;
}