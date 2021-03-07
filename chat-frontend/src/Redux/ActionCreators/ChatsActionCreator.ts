import { Chat } from "../../Models/Chat";
import { CHATS_LOAD_ALL } from "../ActionTypes";

export const loadAllChats = (chats: Chat[]) => {
    return {
        type: CHATS_LOAD_ALL,
        payload: chats
    };
}