import { DELETE_ENQUIRY, FETCH_ENQUIRY, UPDATE_ENQUIRY } from "../constant/enquiry";

export function fetchEnquiry() {
  return {
    type: FETCH_ENQUIRY,
  };
}

export function deleteBlog(rowId: any) {
  return {
    type: DELETE_ENQUIRY,
    payload: rowId
  };
}

export function updateBlog(formData: any) {
  return {
    type: UPDATE_ENQUIRY,
    payload: formData
  };
}