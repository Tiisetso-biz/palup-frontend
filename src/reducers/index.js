import { combineReducers } from 'redux';

//combine reducers
import posts from "./posts"
import auth from "./auth";

export default combineReducers({ posts, auth });