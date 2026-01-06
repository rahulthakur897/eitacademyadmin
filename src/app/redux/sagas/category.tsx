import { put } from "redux-saga/effects";
import {
  FETCH_CATEGORY,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_FAILURE,
  ADD_CATEGORY,
  ADD_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_FAILURE,
  ADD_CATEGORY_FAILURE,
  DELETE_CATEGORY,
  DELETE_CATEGORY_SUCCESS,
} from "../constant";
import { API_CALLING, API_FAILURE } from "../constant/common";
import { takeLatest } from "redux-saga/effects";
import { Api } from "@/services/api";
import { BASEURL } from "@/utils/constant";

function* fetchCategory() {
  try {
    yield put({ type: API_CALLING });
    const response = yield Api.get(BASEURL, `/category/all`);
    const apiResponse = response.data;
    yield put({ type: FETCH_CATEGORY_SUCCESS, response: apiResponse?.data });
  } catch (error) {
    const errorObj = {
      status: 401,
      statusText: "Invalid Request",
    };
    yield put({ type: FETCH_CATEGORY_FAILURE, error: errorObj });
  }
}

function* addCategory(data) {
  try {
    yield put({ type: API_CALLING });
    const response = yield Api.post(BASEURL, `/category/add`, data.payload);
    const apiResponse = response.data;
    yield put({ type: ADD_CATEGORY_SUCCESS, response: {id: apiResponse?.data, name: data.payload.name} });
  } catch (error) {
    const errorObj = {
      status: 401,
      statusText: "Invalid Request",
    };
    yield put({ type: ADD_CATEGORY_FAILURE, error: errorObj });
  }
}

function* updateCategory(data) {
  try {
    yield put({ type: API_CALLING });
    const response = yield Api.post(BASEURL, `/category/update`, data.payload);
    const apiResponse = response.data;
    yield put({ type: UPDATE_CATEGORY_SUCCESS, response: data.payload });
  } catch (error) {
    const errorObj = {
      status: 401,
      statusText: "Invalid Request",
    };
    yield put({ type: UPDATE_CATEGORY_FAILURE, error: errorObj });
  }
}

function* deleteCategory(data) {
  try {
    yield put({ type: API_CALLING });
    const response = yield Api.delete(BASEURL, `/category/delete/${data.payload}`);
    const apiResponse = response.data;
    yield put({ type: DELETE_CATEGORY_SUCCESS, response: data.payload });
  } catch (error) {
    const errorObj = {
      status: 401,
      statusText: "Invalid Request",
    };
    yield put({ type: API_FAILURE, error: errorObj });
  }
}
export function* getCategorySaga() {
  yield takeLatest(FETCH_CATEGORY, fetchCategory);
  yield takeLatest(ADD_CATEGORY, addCategory);
  yield takeLatest(UPDATE_CATEGORY, updateCategory);
  yield takeLatest(DELETE_CATEGORY, deleteCategory);
}
