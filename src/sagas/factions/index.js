import axios from 'axios'
import uri from 'urijs'

import { all, call, put, takeLatest } from 'redux-saga/effects'

import { GET_FACTIONS } from 'actions/factions/constants'
import { getFactionsError, getFactionsSuccess } from 'actions/factions'

import { API_PATH, API_SEGMENTS, REST_METHODS } from 'utils/definitions'

export function* getFactionsSaga() {
  const requestUrl = uri(API_PATH)
    .segment([API_SEGMENTS.FACTIONS])
    .toString()

  const opts = {
    method: REST_METHODS.GET,
    url: requestUrl,
  }
  try {
    const response = yield call(axios, opts)

    yield put(getFactionsSuccess(response.data.data))
  } catch (error) {
    yield put(getFactionsError(error))
  }
}

export function* getFactionsWatcher() {
  yield takeLatest(GET_FACTIONS, getFactionsSaga)
}

export default function* rootSaga() {
  yield all([call(getFactionsWatcher)])
}
