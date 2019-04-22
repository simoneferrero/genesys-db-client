import axios from 'axios'
import uri from 'urijs'

import { all, call, put, takeLatest } from 'redux-saga/effects'

import { GET_SKILLS } from 'actions/skills/constants'
import { getSkillsError, getSkillsSuccess } from 'actions/skills'

import { API_PATH, API_SEGMENTS, REST_METHODS } from 'utils/definitions'

export function* getSkillsSaga() {
  const requestUrl = uri(API_PATH)
    .segment([API_SEGMENTS.SKILLS])
    .toString()

  const opts = {
    method: REST_METHODS.GET,
    url: requestUrl,
  }
  try {
    const response = yield call(axios, opts)

    yield put(getSkillsSuccess(response.data.data))
  } catch (error) {
    yield put(getSkillsError(error))
  }
}

export function* getSkillsWatcher() {
  yield takeLatest(GET_SKILLS, getSkillsSaga)
}

export default function* rootSaga() {
  yield all([call(getSkillsWatcher)])
}
