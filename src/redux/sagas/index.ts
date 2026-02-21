import { all } from "redux-saga/effects";
import { getUserSaga } from "./user";
import { getCategorySaga } from "./category";
import { getCoursesSaga } from "./course"
import { getBlogSaga } from "./blog";
import { getEnquirySaga } from "./enquiry";

function* rootSaga() {
  yield all([
    getUserSaga(),
    getCategorySaga(),
    getCoursesSaga(),
    getBlogSaga(),
    getEnquirySaga()
  ]);
}

export default rootSaga;
