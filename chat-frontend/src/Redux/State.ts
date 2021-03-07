import { Chat } from "../Models/Chat";
import { Message } from "../Models/Message";
import { Token } from "../Models/Token";

export type State = {
    activeChat: Chat;
    chats: Chat[];
    messages: Message[];
    token: Token;
}