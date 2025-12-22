import { all } from "redux-saga/effects";
import { getUserSaga } from "./user";

function* rootSaga() {
  yield all([
    getUserSaga(),
  ]);
}

export default rootSaga;
