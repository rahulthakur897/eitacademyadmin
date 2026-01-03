import { put } from "redux-saga/effects";
import { ADMIN_LOGIN_ACTION, ADMIN_LOGIN_ERROR } from "../constant";
import { API_CALLING } from "../constant/common";
import { takeLatest } from "redux-saga/effects";


function* adminLoginAction(data) {
  const { email, password } = data.payload;
  try {
    yield put({ type: API_CALLING });
    // const response = yield Api.post(BASEURL, `/auth/admin/login`, { username: email, password });
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

export function* getUserSaga() {
  yield takeLatest(ADMIN_LOGIN_ACTION, adminLoginAction);
}
