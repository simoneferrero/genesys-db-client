import axios from 'axios'
import uri from 'urijs'

import { all, call, put, takeLatest } from 'redux-saga/effects'

import { GET_CRITICAL_INJURIES } from 'actions/criticalInjuries/constants'
import {
  getCriticalInjuriesError,
  getCriticalInjuriesSuccess,
} from 'actions/criticalInjuries'

import { API_PATH, API_SEGMENTS, REST_METHODS } from 'utils/definitions'

export function* getCriticalInjuriesSaga() {
  const requestUrl = uri(API_PATH)
    .segment([API_SEGMENTS.CRITICAL_INJURIES])
    .toString()

  const opts = {
    method: REST_METHODS.GET,
    url: requestUrl,
  }
  try {
    const response = yield call(axios, opts)

    yield put(getCriticalInjuriesSuccess(response.data.data))
  } catch (error) {
    yield put(getCriticalInjuriesError(error))
  }
}

export function* getCriticalInjuriesWatcher() {
  yield takeLatest(GET_CRITICAL_INJURIES, getCriticalInjuriesSaga)
}

export default function* rootSaga() {
  yield all([call(getCriticalInjuriesWatcher)])
}
