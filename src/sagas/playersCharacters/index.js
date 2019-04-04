import axios from 'axios'
import uri from 'urijs'

import { all, call, put, takeLatest } from 'redux-saga/effects'

import { GET_PLAYERS_CHARACTERS } from 'actions/playersCharacters/constants'
import {
  getPlayersCharactersError,
  getPlayersCharactersSuccess,
} from 'actions/playersCharacters'

import { API_PATH, API_SEGMENTS, REST_METHODS } from 'utils/definitions'

export function* getPlayersCharactersSaga() {
  const requestUrl = uri(API_PATH)
    .segment([API_SEGMENTS.PLAYERS_CHARACTERS])
    .toString()

  const opts = {
    method: REST_METHODS.GET,
    url: requestUrl,
  }
  try {
    const response = yield call(axios, opts)

    yield put(getPlayersCharactersSuccess(response.data))
  } catch (error) {
    yield put(getPlayersCharactersError(error))
  }
}

export function* getPlayersCharactersWatcher() {
  yield takeLatest(GET_PLAYERS_CHARACTERS, getPlayersCharactersSaga)
}

export default function* rootSaga() {
  yield all([call(getPlayersCharactersWatcher)])
}
