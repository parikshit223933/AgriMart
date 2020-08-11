import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducers";
import logger from 'redux-logger';
let store;
export function configureStore(useLogger)
{
    if(useLogger)
    {
        store = createStore(reducer, applyMiddleware(thunk, logger));
        return store;
    }
    store = createStore(reducer, applyMiddleware(thunk));
    return store;
}
