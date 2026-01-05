import { put } from "redux-saga/effects";
import {
  FETCH_COURSES,
  FETCH_COURSES_SUCCESS
} from "../constant";
import { API_CALLING, API_FAILURE } from "../constant/common";
import { takeLatest } from "redux-saga/effects";
import { Api } from "@/services/api";
import { BASEURL } from "@/utils/constant";

function* fetchCourses() {
  try {
    yield put({ type: API_CALLING });
    const response = yield Api.get(BASEURL, `/course/all`);
    const apiResponse = response.data;
    yield put({ type: FETCH_COURSES_SUCCESS, response: apiResponse?.data });
  } catch (error) {
    const errorObj = {
      status: 401,
      statusText: "Invalid Request",
    };
    yield put({ type: API_FAILURE, error: errorObj });
  }
}

// function* addCategory(data) {
//   try {
//     yield put({ type: API_CALLING });
//     const response = yield Api.post(BASEURL, `/category/add`, data.payload);
//     const apiResponse = response.data;
//     yield put({ type: ADD_CATEGORY_SUCCESS, response: {id: apiResponse?.data, name: data.payload.name} });
//   } catch (error) {
//     const errorObj = {
//       status: 401,
//       statusText: "Invalid Request",
//     };
//     yield put({ type: ADD_CATEGORY_FAILURE, error: errorObj });
//   }
// }

// function* updateCategory(data) {
//   try {
//     yield put({ type: API_CALLING });
//     const response = yield Api.post(BASEURL, `/category/update`, data.payload);
//     const apiResponse = response.data;
//     yield put({ type: UPDATE_CATEGORY_SUCCESS, response: data.payload });
//   } catch (error) {
//     const errorObj = {
//       status: 401,
//       statusText: "Invalid Request",
//     };
//     yield put({ type: UPDATE_CATEGORY_FAILURE, error: errorObj });
//   }
// }

// function* deleteCategory(data) {
//   try {
//     yield put({ type: API_CALLING });
//     const response = yield Api.delete(BASEURL, `/category/delete/${data.payload}`);
//     const apiResponse = response.data;
//     yield put({ type: DELETE_CATEGORY_SUCCESS, response: data.payload });
//   } catch (error) {
//     const errorObj = {
//       status: 401,
//       statusText: "Invalid Request",
//     };
//     yield put({ type: API_FAILURE, error: errorObj });
//   }
// }
export function* getCoursesSaga() {
  yield takeLatest(FETCH_COURSES, fetchCourses);
}
