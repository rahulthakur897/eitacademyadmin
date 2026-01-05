import { combineReducers } from "redux";
import { userReducer } from "./user";
import { categoryReducer } from "./category";
import { courseReducer } from "./course"

export default combineReducers({
  user: userReducer, 
  category: categoryReducer,
  course: courseReducer
});
