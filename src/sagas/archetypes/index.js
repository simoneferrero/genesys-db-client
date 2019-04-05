import axios from 'axios'
import uri from 'urijs'

import { all, call, put, takeLatest } from 'redux-saga/effects'

import { GET_ARCHETYPES } from 'actions/archetypes/constants'
import { getArchetypesError, getArchetypesSuccess } from 'actions/archetypes'

import { API_PATH, API_SEGMENTS, REST_METHODS } from 'utils/definitions'

export function* getArchetypesSaga() {
  const requestUrl = uri(API_PATH)
    .segment([API_SEGMENTS.ARCHETYPES])
    .toString()

  const opts = {
    method: REST_METHODS.GET,
    url: requestUrl,
  }
  try {
    const response = yield call(axios, opts)

    yield put(getArchetypesSuccess(response.data))
  } catch (error) {
    yield put(getArchetypesError(error))
  }
}

export function* getArchetypesWatcher() {
  yield takeLatest(GET_ARCHETYPES, getArchetypesSaga)
}

export default function* rootSaga() {
  yield all([call(getArchetypesWatcher)])
}
