import { CHATS_LOAD_ALL, ActionType } from "../ActionTypes";
import { Chat } from "../../Models/Chat";

export const ChatsReducer = (chats: Chat[] = [], action: ActionType) => {
    if (action.type === CHATS_LOAD_ALL) {
        return action.payload;
    }
    return chats;
}