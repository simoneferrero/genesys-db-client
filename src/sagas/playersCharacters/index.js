import axios from 'axios'
import uri from 'urijs'

import { all, call, put, takeLatest } from 'redux-saga/effects'

import {
  // getPlayersCharacters
  GET_PLAYERS_CHARACTERS,
  // getPlayerCharacter
  GET_PLAYER_CHARACTER,
  // editPlayerCharacter
  EDIT_PLAYER_CHARACTER,
} from 'actions/playersCharacters/constants'
import {
  // getPlayersCharacters
  getPlayersCharactersError,
  getPlayersCharactersSuccess,
  // getPlayerCharacter
  getPlayerCharacterSuccess,
  getPlayerCharacterError,
  // editPlayerCharacter
  editPlayerCharacterSuccess,
  editPlayerCharacterError,
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

    yield put(getPlayersCharactersSuccess(response.data.data))
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

    yield put(getPlayerCharacterSuccess(id, response.data.data))
  } catch (error) {
    yield put(getPlayerCharacterError(id, error))
  }
}

export function* getPlayerCharacterWatcher() {
  yield takeLatest(GET_PLAYER_CHARACTER, getPlayerCharacterSaga)
}

export function* editPlayerCharacterSaga({
  payload: {
    actions,
    id,
    values: {
      attributes: {
        wounds: { current: wounds_current },
        strain: { current: strain_current },
      },
      favors,
      skills,
    },
  },
}) {
  const data = JSON.stringify({
    favors: Object.values(favors),
    skills: Object.values(skills)
      .filter(({ rank }) => rank)
      .map(({ id, rank }) => ({
        id,
        rank,
      })),
    strain_current,
    wounds_current,
  })
  const requestUrl = uri(API_PATH)
    .segment([API_SEGMENTS.PLAYERS_CHARACTERS, id])
    .toString()
  const headers = { 'Content-Type': 'application/json' }

  const opts = {
    data,
    headers,
    method: REST_METHODS.PUT,
    url: requestUrl,
  }
  try {
    const response = yield call(axios, opts)

    yield put(editPlayerCharacterSuccess(id, response.data.data))
    yield call(actions.setSubmitting, false)
    yield call(actions.setEditing, false)
  } catch (error) {
    yield put(editPlayerCharacterError(id, error))
    yield call(actions.setSubmitting, false)
    yield call(actions.setErrors, { mainError: 'There was an error' }) // TODO: use real error from API
  }
}

export function* editPlayerCharacterWatcher() {
  yield takeLatest(EDIT_PLAYER_CHARACTER, editPlayerCharacterSaga)
}

export default function* rootSaga() {
  yield all([
    call(getPlayersCharactersWatcher),
    call(getPlayerCharacterWatcher),
    call(editPlayerCharacterWatcher),
  ])
}
