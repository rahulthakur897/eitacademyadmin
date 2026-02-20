import { combineReducers } from "redux";
import { userReducer } from "./user";
import { categoryReducer } from "./category";
import { courseReducer } from "./course"
import { blogReducer } from "./blog";
import { enquiryReducer } from "./enquiry";

export default combineReducers({
  user: userReducer, 
  category: categoryReducer,
  course: courseReducer,
  blog: blogReducer,
  enquiry: enquiryReducer,
});
