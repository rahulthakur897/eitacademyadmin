import { put } from "redux-saga/effects";
import { ADMIN_LOGIN_ACTION, ADMIN_LOGIN_SUCCESS, ADMIN_LOGIN_ERROR, FETCH_CATEGORY_SUCCESS, GET_INSTRUCTOR_LIST, GET_INSTRUCTOR_LIST_SUCCESS } from "../constant";
import { API_CALLING, API_FAILURE } from "../constant/common";
import { takeLatest } from "redux-saga/effects";
import { BASEURL } from "@/utils/constant";
import { Api } from "@/services/api";


function* adminLoginAction(data: any): Generator<any, void, any> {
  const { email, password } = data.payload;
  try {
    yield put({ type: API_CALLING });
    const response = yield Api.post(BASEURL, `/auth/admin/login`, { username: email, password });
    const apiResponse = response.data;
    yield put({ type: ADMIN_LOGIN_SUCCESS, response: apiResponse?.data });
  } catch (error) {
    const errorObj = {
      status: 401,
      statusText: "Unauthorized - Invalid credentials",
    };
    yield put({ type: ADMIN_LOGIN_ERROR, error: errorObj });
  }
}

function* getInstructorList(): Generator<any, void, any> {
try {
    yield put({ type: API_CALLING });
    const response = yield Api.get(BASEURL, `/user/instructors`);
    const apiResponse = response.data;
    yield put({ type: GET_INSTRUCTOR_LIST_SUCCESS, response: apiResponse?.data });
  } catch (error) {
    const errorObj = {
      status: 401,
      statusText: "Invalid Request",
    };
    yield put({ type: API_FAILURE, error: errorObj });
  }
}

export function* getUserSaga() {
  yield takeLatest(ADMIN_LOGIN_ACTION, adminLoginAction);
  yield takeLatest(GET_INSTRUCTOR_LIST, getInstructorList);
}
