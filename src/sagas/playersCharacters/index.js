import axios from 'axios'
import uri from 'urijs'

import { all, call, put, takeLatest } from 'redux-saga/effects'

import {
  // getPlayersCharacters
  GET_PLAYERS_CHARACTERS,
  // getPlayerCharacter
  GET_PLAYER_CHARACTER,
} from 'actions/playersCharacters/constants'
import {
  // getPlayersCharacters
  getPlayersCharactersError,
  getPlayersCharactersSuccess,
  // getPlayerCharacter
  getPlayerCharacterSuccess,
  getPlayerCharacterError,
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

export function* getPlayerCharacterSaga({ payload: { id } }) {
  const requestUrl = uri(API_PATH)
    .segment([API_SEGMENTS.PLAYERS_CHARACTERS, id])
    .toString()

  const opts = {
    method: REST_METHODS.GET,
    url: requestUrl,
  }
  try {
    const response = yield call(axios, opts)

    yield put(getPlayerCharacterSuccess(id, response.data))
  } catch (error) {
    yield put(getPlayerCharacterError(id, error))
  }
}

export function* getPlayerCharacterWatcher() {
  yield takeLatest(GET_PLAYER_CHARACTER, getPlayerCharacterSaga)
}

export default function* rootSaga() {
  yield all([
    call(getPlayersCharactersWatcher),
    call(getPlayerCharacterWatcher),
  ])
}
