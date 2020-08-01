import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducers";
import logger from 'redux-logger';
let store;
export function configureStore()
{
    store = createStore(reducer, applyMiddleware(thunk, logger));
    return store;
}
