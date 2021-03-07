import { MESSAGES_LOAD_ALL, MESSAGES_LOAD_NEW, MESSAGES_SEND, ActionType } from "../ActionTypes";
import { Message } from "../../Models/Message";
import { State } from "../State";

const actionResolver: any = {};
actionResolver[MESSAGES_LOAD_ALL] = (messages: Message[], action: any): Message[] => {
    return action.payload;
};
actionResolver[MESSAGES_LOAD_NEW] = (messages: Message[], action: any): Message[] => {
    return [...messages, action.payload];
};
actionResolver[MESSAGES_SEND] = (messages: Message[], action: any): Message[] => {
    return [...messages, action.payload];
};

export const MessagesReducer = (messages: Message[] = [], action: ActionType) => {
    const func: (messages: Message[], action: ActionType) => Message[] = actionResolver[action.type] ??
        ((messages: Message[], action: ActionType) => { return messages });
    return func(messages, action);
}