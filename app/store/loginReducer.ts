
import { ActionReducer, Action } from '@ngrx/store';
import {
    LOGIN_USER,
    LOGOUT_USER
} from '../actions/action';


export const loginReducer: ActionReducer<any> = (state = {
}, action: Action) => {
    switch (action.type) {
        case LOGIN_USER:
            return Object.assign({}, state, action.payload)
        case LOGOUT_USER:
             return Object.assign({}, state, {});
        default:
            return state;
    }
};