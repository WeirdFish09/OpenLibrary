import { Message } from "./Message";

export interface Chat {
    chatId: string;
    name: string;
    imageURL: string;
    lastMessage: Message;
};