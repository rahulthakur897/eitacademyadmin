import { all } from "redux-saga/effects";
import { getUserSaga } from "./user";
import { getCategorySaga } from "./category";
import { getCoursesSaga } from "./course"

function* rootSaga() {
  yield all([
    getUserSaga(),
    getCategorySaga(),
    getCoursesSaga(),
  ]);
}

export default rootSaga;
