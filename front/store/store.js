import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers/index";

const middleware = applyMiddleware(thunk);

let store = createStore(reducers, compose(middleware));

export default store;