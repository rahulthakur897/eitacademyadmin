import { put } from "redux-saga/effects";
import {
  ADD_COURSE,
  ADD_COURSE_SUCCESS,
  DELETE_COURSE,
  DELETE_COURSE_SUCCESS,
  FETCH_COURSES,
  FETCH_COURSES_SUCCESS,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE,
  FETCH_UPCOMING_COURSE_SUCCESS,
  FETCH_UPCOMING_COURSE,
  ADD_UPCOMING_COURSE_SUCCESS,
  ADD_UPCOMING_COURSE,
  UPDATE_UPCOMING_COURSE,
  UPDATE_UPCOMING_COURSE_SUCCESS,
  DELETE_UPCOMING_COURSE_SUCCESS,
  DELETE_UPCOMING_COURSE,
  FETCH_POPULAR_COURSE_SUCCESS,
  FETCH_POPULAR_COURSE,
  ADD_POPULAR_COURSE,
  DELETE_POPULAR_COURSE,
  DELETE_POPULAR_COURSE_SUCCESS,
  ADD_POPULAR_COURSE_SUCCESS,
} from "../constant";
import { API_CALLING, API_FAILURE } from "../constant/common";
import { takeLatest } from "redux-saga/effects";
import { Api } from "@/services/api";
import { BASEURL } from "@/utils/constant";

function* fetchCourses(): Generator<any, void, any> {
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

function* addCourse(data: any): Generator<any, void, any> {
  try {
    yield put({ type: API_CALLING });
    const response = yield Api.post(BASEURL, `/course/add`, data.payload);
    const apiResponse = response.data;
    yield put({ type: ADD_COURSE_SUCCESS, response: data.payload });
  } catch (error) {
    const errorObj = {
      status: 401,
      statusText: "Invalid Request",
    };
    yield put({ type: API_FAILURE, error: errorObj });
  }
}

function* updateCourse(data: any): Generator<any, void, any> {
  try {
    yield put({ type: API_CALLING });
    const response = yield Api.post(BASEURL, `/course/update`, data.payload);
    const apiResponse = response.data;
    yield put({ type: UPDATE_COURSE_SUCCESS, response: data.payload });
  } catch (error) {
    const errorObj = {
      status: 401,
      statusText: "Invalid Request",
    };
    yield put({ type: API_FAILURE, error: errorObj });
  }
}

function* deleteCourse(data: any): Generator<any, void, any> {
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

function* fetchUpcomingCourse(): Generator<any, void, any> {
  try {
    yield put({ type: API_CALLING });
    const response = yield Api.get(BASEURL, `/course/upcoming`);
    const apiResponse = response.data;
    yield put({ type: FETCH_UPCOMING_COURSE_SUCCESS, response: apiResponse?.data });
  } catch (error) {
    const errorObj = {
      status: 401,
      statusText: "Invalid Request",
    };
    yield put({ type: API_FAILURE, error: errorObj });
  }
}

function* addUpcomingCourse(data: any): Generator<any, void, any> {
  try {
    yield put({ type: API_CALLING });
    const response = yield Api.post(BASEURL, `/course/upcoming/add`, data.payload);
    const apiResponse = response.data;
    const returObj ={...data.payload, id:apiResponse?.data}
    yield put({ type: ADD_UPCOMING_COURSE_SUCCESS, response:  returObj });
  } catch (error) {
    const errorObj = {
      status: 401,
      statusText: "Invalid Request",
    };
    yield put({ type: API_FAILURE, error: errorObj });
  }
}

function* updateUpcomingCourse(data: any): Generator<any, void, any> {
  try {
    yield put({ type: API_CALLING });
    const response = yield Api.post(BASEURL, `/course/upcoming/update`, data.payload);
    const apiResponse = response.data;
    const returObj ={...data.payload, id:apiResponse?.data}
    yield put({ type: UPDATE_UPCOMING_COURSE_SUCCESS, response:  returObj });
  } catch (error) {
    const errorObj = {
      status: 401,
      statusText: "Invalid Request",
    };
    yield put({ type: API_FAILURE, error: errorObj });
  }
}
function* deleteUpcomingCourse(data: any): Generator<any, void, any> {
  try {
    yield put({ type: API_CALLING });
    const response = yield Api.delete(BASEURL, `/course/upcoming/delete/${data.payload}`);
    
    yield put({ type: DELETE_UPCOMING_COURSE_SUCCESS, response: data.payload });
  } catch (error) {
    const errorObj = {
      status: 401,
      statusText: "Invalid Request",
    };
    yield put({ type: API_FAILURE, error: errorObj });
  }
}
// getPopularCourse
function* getPopularCourse(): Generator<any, void, any> {
  try {
    yield put({ type: API_CALLING });
    const response = yield Api.get(BASEURL, `/course/popular`);
    const apiResponse = response.data;
    yield put({ type: FETCH_POPULAR_COURSE_SUCCESS, response: apiResponse?.data });
  } catch (error) {
    const errorObj = {
      status: 401,
      statusText: "Invalid Request",
    };
    yield put({ type: API_FAILURE, error: errorObj });
  }
}

function* addPopularCourse(data: any): Generator<any, void, any> {
  try {
    yield put({ type: API_CALLING });
    const response = yield Api.post(BASEURL, `/course/popular/add`, data.payload);
    const apiResponse = response.data;
    const returObj ={...data.payload, id:apiResponse?.data}
    yield put({ type: ADD_POPULAR_COURSE_SUCCESS, response:  returObj });
  } catch (error) {
    const errorObj = {
      status: 401,
      statusText: "Invalid Request",
    };
    yield put({ type: API_FAILURE, error: errorObj });
  }
}

function* deletePopularCourse(data: any): Generator<any, void, any> {
  try {
    yield put({ type: API_CALLING });
    const response = yield Api.delete(BASEURL, `/course/popular/delete/${data.payload}`);
    
    yield put({ type: DELETE_POPULAR_COURSE_SUCCESS, response: data.payload });
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
  yield takeLatest(UPDATE_COURSE, updateCourse);
  yield takeLatest(FETCH_UPCOMING_COURSE, fetchUpcomingCourse);
  yield takeLatest(ADD_UPCOMING_COURSE, addUpcomingCourse);
  yield takeLatest(UPDATE_UPCOMING_COURSE, updateUpcomingCourse);
  yield takeLatest(DELETE_UPCOMING_COURSE, deleteUpcomingCourse);
  yield takeLatest(FETCH_POPULAR_COURSE, getPopularCourse);
  yield takeLatest(ADD_POPULAR_COURSE, addPopularCourse);
  yield takeLatest(DELETE_POPULAR_COURSE, deletePopularCourse);
}