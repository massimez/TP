import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import {StudentReducer} from "./StudentReducer";

const AllReducers = combineReducers({
    auth:AuthReducer,
    residents:StudentReducer,
})

export default AllReducers;
