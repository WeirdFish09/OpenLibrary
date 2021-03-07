import { AUTH_REFRESH, ActionType } from "../ActionTypes";
import { Chat } from "../../Models/Chat";
import { Token } from "../../Models/Token";
import { State } from "../State";

export const AuthReducer = (token: String = "", action: ActionType) => {
    if (action.type === AUTH_REFRESH) {
        return action.payload;
    }
    return token;
}