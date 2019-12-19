import { createStore, applyMiddleware } from "redux";
import root from "./reducers";
import thunk from "redux-thunk";
const store = createStore(root, applyMiddleware(thunk));
export default store;