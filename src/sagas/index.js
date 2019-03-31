import { all, call } from 'redux-saga/effects'
import statusesRootSaga from './statuses'

// This is the main entrypoint from which all sagas are started
export default function* rootSaga() {
  yield all([call(statusesRootSaga)])
}
