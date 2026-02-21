import { ADD_BLOG, DELETE_BLOG, FETCH_BLOG, UPDATE_BLOG } from "../constant/blog";

export function fetchBlog() {
  return {
    type: FETCH_BLOG,
  };
}

export function addBlog(formData: any) {
  return {
    type: ADD_BLOG,
    payload: formData
  };
}

export function deleteBlog(rowId: any) {
  return {
    type: DELETE_BLOG    ,
    payload: rowId
  };
}

export function updateBlog(formData: any) {
  return {
    type: UPDATE_BLOG,
    payload: formData
  };
}