import { put } from "redux-saga/effects";
import {
  ADD_COURSE,
  ADD_COURSE_SUCCESS,
  DELETE_COURSE,
  DELETE_COURSE_SUCCESS,
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

function* addCourse(data) {
  try {
    yield put({ type: API_CALLING });
    const response = yield Api.post(BASEURL, `/course/add`, data.payload);
    const apiResponse = response.data;
    const returObj ={...data.payload, id:apiResponse?.data}
    yield put({ type: ADD_COURSE_SUCCESS, response:  returObj });
  } catch (error) {
    const errorObj = {
      status: 401,
      statusText: "Invalid Request",
    };
    yield put({ type: API_FAILURE, error: errorObj });
  }
}

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

function* deleteCourse(data) {
  try {
    yield put({ type: API_CALLING });
    const response = yield Api.delete(BASEURL, `/course/delete/${data.payload}`);
    
    yield put({ type: DELETE_COURSE_SUCCESS, response: data.payload });
  } catch (error) {
    const errorObj = {
      status: 401,
      statusText: "Invalid Request",
    };
    yield put({ type: API_FAILURE, error: errorObj });
  }
}
export function* getCoursesSaga() {
  yield takeLatest(FETCH_COURSES, fetchCourses);
  yield takeLatest(ADD_COURSE, addCourse);
  yield takeLatest(DELETE_COURSE, deleteCourse);
}
