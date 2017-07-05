import {marker} from '../components/interface/marker';
// const fakeEvent = require('./fakeevent.json');
import { ActionReducer, Action } from '@ngrx/store';
import {
    MARKER_RENEW,
    MARKER_ADD,
    MARKER_REMOVE,
    MARKER_LEAVE,
    MARKER_JOIN,
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

export const mapReducer: ActionReducer<any> = (state = []
, action: Action) => {
    switch (action.type) {
        case MARKER_RENEW:
            return state = action.payload;
        case MARKER_ADD:
            return [...state, action.payload];
        case MARKER_REMOVE:
            return state.filter(marker => marker.id !== action.payload);
        case MARKER_LEAVE:
            return state.map(marker => {
                if (marker.id !== action.payload.id) {
                    return marker;
                }
                return Object.assign({}, marker, action.payload);
            });
        case MARKER_JOIN:
            return state.map(marker => {
                if (marker.id !== action.payload.joinId) {
                    return marker;
                }
                return Object.assign({}, marker, action.payload.event);
            });
        default:
            return state;
    }
};
