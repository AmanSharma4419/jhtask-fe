import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";

import { composeWithDevTools } from "@redux-devtools/extension";

import { blogsReducer } from "../reducers/blogReducer";

const parentReducer = combineReducers({
  blogsReducer,
});

const composeEnhancers = composeWithDevTools({});

const store = createStore(
  parentReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
