import { all } from "redux-saga/effects";
import { getUserSaga } from "./user";
import { getCategorySaga } from "./category";

function* rootSaga() {
  yield all([
    getUserSaga(),
    getCategorySaga(),
  ]);
}

export default rootSaga;
