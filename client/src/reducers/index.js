import { combineReducers } from "redux";
import auth from "./auth";
import product from "./product";

export default combineReducers({
	auth,
	product
});
