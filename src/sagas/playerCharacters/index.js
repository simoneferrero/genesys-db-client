import axios from 'axios'
import uri from 'urijs'

import { all, call, put, takeLatest } from 'redux-saga/effects'

import { GET_PLAYER_CHARACTERS } from 'actions/playerCharacters/constants'
import {
  getPlayerCharactersError,
  getPlayerCharactersSuccess,
} from 'actions/playerCharacters'

import { API_PATH, API_SEGMENTS, REST_METHODS } from 'utils/definitions'

export function* getPlayerCharactersSaga() {
  const requestUrl = uri(API_PATH)
    .segment([API_SEGMENTS.PLAYER_CHARACTERS])
    .toString()

  const opts = {
    method: REST_METHODS.GET,
    url: requestUrl,
  }
  try {
    const response = yield call(axios, opts)

    yield put(getPlayerCharactersSuccess(response.data))
  } catch (error) {
    yield put(getPlayerCharactersError(error))
  }
}

export function* getPlayerCharactersWatcher() {
  yield takeLatest(GET_PLAYER_CHARACTERS, getPlayerCharactersSaga)
}

export default function* rootSaga() {
  yield all([call(getPlayerCharactersWatcher)])
}
