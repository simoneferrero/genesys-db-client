import axios from 'axios'
import uri from 'urijs'

import { all, call, put, takeLatest } from 'redux-saga/effects'

import { GET_TUBE_STATUSES } from 'actions/getTubeStatuses/constants'
import {
  getTubeStatusesError,
  getTubeStatusesSuccess,
} from 'actions/getTubeStatuses'

import { TFL_API_PATH } from 'utils/definitions'

export function* getTubeStatusesSaga() {
  const requestUrl = uri(TFL_API_PATH)
    .segment(['Line', 'Mode', 'tube', 'Status'])
    .toString()

  const opts = {
    method: 'GET',
    url: requestUrl,
  }
  try {
    const response = yield call(axios, opts)
    // Axios puts the result in the "data" key
    yield put(getTubeStatusesSuccess(response.data))
  } catch (error) {
    yield put(getTubeStatusesError(error))
  }
}

export function* getTubeStatusesWatcher() {
  yield takeLatest(GET_TUBE_STATUSES, getTubeStatusesSaga)
}

export default function* rootSaga() {
  yield all([call(getTubeStatusesWatcher)])
}
