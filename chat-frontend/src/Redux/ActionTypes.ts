export const CHATS_LOAD_ALL = "chats/loadAll";
export const CHAT_LOAD_SELECTED = "activeChat/loadSelected";

export const MESSAGES_LOAD_ALL = "messages/loadAll";
export const MESSAGES_LOAD_NEW = "messages/loadNew";
export const MESSAGES_SEND = "messages/send";

export const AUTH_REFRESH = "auth/refresh";

export type ActionType = {
    type: string;
    payload: any;
}