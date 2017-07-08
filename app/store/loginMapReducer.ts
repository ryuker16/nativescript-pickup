import { combineReducers } from '@ngrx/store';
import { loginReducer } from './loginReducer';
import { markerReducer } from './markerReducer';

// Combine our map reducers
export const loginMapReducer = combineReducers({
    markerReducer,
    loginReducer
})
