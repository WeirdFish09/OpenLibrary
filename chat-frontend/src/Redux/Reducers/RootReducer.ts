import { combineReducers } from "redux";
import { AuthReducer } from "./AuthReducers";
import { ActiveChatReducer } from "./ActiveChatReducer";
import { ChatsReducer } from "./ChatsReducer";
import { MessagesReducer } from "./MessagesReducer";

export default combineReducers({
    token: AuthReducer,
    activeChat: ActiveChatReducer,
    chats: ChatsReducer,
    messages: MessagesReducer
});