import axios from 'axios'
import uri from 'urijs'

import { all, call, put, takeLatest } from 'redux-saga/effects'

import { GET_CAREERS } from 'actions/careers/constants'
import { getCareersError, getCareersSuccess } from 'actions/careers'

import { API_PATH, API_SEGMENTS, REST_METHODS } from 'utils/definitions'

export function* getCareersSaga() {
  const requestUrl = uri(API_PATH)
    .segment([API_SEGMENTS.CAREERS])
    .toString()

  const opts = {
    method: REST_METHODS.GET,
    url: requestUrl,
  }
  try {
    const response = yield call(axios, opts)

    yield put(getCareersSuccess(response.data))
  } catch (error) {
    yield put(getCareersError(error))
  }
}

export function* getCareersWatcher() {
  yield takeLatest(GET_CAREERS, getCareersSaga)
}

export default function* rootSaga() {
  yield all([call(getCareersWatcher)])
}
