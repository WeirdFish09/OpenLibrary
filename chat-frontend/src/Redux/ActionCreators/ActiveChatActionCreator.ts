import { Chat } from "../../Models/Chat";
import { CHATS_LOAD_ALL, CHAT_LOAD_SELECTED } from "../ActionTypes";
import { loadAllChats } from "./ChatsActionCreator";

export const loadSelectedChat = (chat: Chat) => {
    return {
        type: CHAT_LOAD_SELECTED,
        payload: chat
    }
}