// Core
import { combineReducers } from 'redux';

// Instruments
import { postsReducer } from './posts/reducer';
import { authReducer } from "./auth/reducer";

export const rootReducer = combineReducers({
    posts: postsReducer,
    auth: authReducer,
});
