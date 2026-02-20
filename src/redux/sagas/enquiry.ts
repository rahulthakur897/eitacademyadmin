import { put } from "redux-saga/effects";
import { API_CALLING, API_FAILURE } from "../constant/common";
import { takeLatest } from "redux-saga/effects";
import { Api } from "@/services/api";
import { BASEURL } from "@/utils/constant";
import { DELETE_BLOG, DELETE_BLOG_SUCCESS, UPDATE_BLOG, UPDATE_BLOG_SUCCESS } from "../constant/blog";
import { FETCH_ENQUIRY, FETCH_ENQUIRY_SUCCESS } from "../constant/enquiry";

function* fetchEnquiry(): Generator<any, void, any> {
  try {
    yield put({ type: API_CALLING });
    const response = yield Api.get(BASEURL, `/enquiry/all`);
    console.log("response", response)
    const apiResponse = response.data;
    yield put({ type: FETCH_ENQUIRY_SUCCESS, response: apiResponse?.data });
  } catch (error) {
    const errorObj = {
      status: 401,
      statusText: "Invalid Request",
    };
    yield put({ type: API_FAILURE, error: errorObj });
  }
}


function* updateBlog(data: any): Generator<any, void, any> {
  try {
    yield put({ type: API_CALLING });
    const response = yield Api.patch(BASEURL, `/blog/update`, data.payload);
    yield put({ type: UPDATE_BLOG_SUCCESS, response: data.payload });
  } catch (error) {
    const errorObj = {
      status: 401,
      statusText: "Invalid Request",
    };
    yield put({ type: API_FAILURE, error: errorObj });
  }
}

function* deleteBlog(data: any): Generator<any, void, any> {
  try {
    yield put({ type: API_CALLING });
    const response = yield Api.delete(BASEURL, `/blog/delete/${data.payload}`);
    yield put({ type: DELETE_BLOG_SUCCESS, response: data.payload });
  } catch (error) {
    const errorObj = {
      status: 401,
      statusText: "Invalid Request",
    };
    yield put({ type: API_FAILURE, error: errorObj });
  }
}

export function* getEnquirySaga() {
  yield takeLatest(FETCH_ENQUIRY, fetchEnquiry);
  yield takeLatest(UPDATE_BLOG, updateBlog);
  yield takeLatest(DELETE_BLOG, deleteBlog);

}