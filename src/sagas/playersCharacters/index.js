import axios from 'axios'
import uri from 'urijs'

import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import { logout } from 'actions/authentication'
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

import { authenticationSelector } from 'reducers/authentication/selectors'

import { API_PATH, API_SEGMENTS, REST_METHODS } from 'utils/definitions'

export function* getPlayersCharactersSaga() {
  const authInfo = yield select(authenticationSelector)

  const requestUrl = uri(API_PATH)
    .segment([API_SEGMENTS.PLAYERS_CHARACTERS])
    .toString()

  const headers = {
    Authorization: `Bearer ${authInfo.get('jwt')}`,
    'Content-Type': 'application/json',
  }

  const opts = {
    headers,
    method: REST_METHODS.GET,
    url: requestUrl,
  }
  try {
    const response = yield call(axios, opts)

    yield put(getPlayersCharactersSuccess(response.data.data))
  } catch (error) {
    yield put(getPlayersCharactersError(error))

    if (error.response && error.response.status === 401) {
      yield put(logout())
    }
  }
}

export function* getPlayersCharactersWatcher() {
  yield takeLatest(GET_PLAYERS_CHARACTERS, getPlayersCharactersSaga)
}

export function* getPlayerCharacterSaga({ payload: { id } }) {
  if (!id) {
    return
  }

  const authInfo = yield select(authenticationSelector)

  const requestUrl = uri(API_PATH)
    .segment([API_SEGMENTS.PLAYERS_CHARACTERS, id])
    .toString()

  const headers = {
    Authorization: `Bearer ${authInfo.get('jwt')}`,
    'Content-Type': 'application/json',
  }

  const opts = {
    headers,
    method: REST_METHODS.GET,
    url: requestUrl,
  }
  try {
    const response = yield call(axios, opts)

    yield put(getPlayerCharacterSuccess(id, response.data.data))
  } catch (error) {
    yield put(getPlayerCharacterError(id, error))

    if (error.response && error.response.status === 401) {
      yield put(logout())
    }
  }
}

export function* getPlayerCharacterWatcher() {
  yield takeLatest(GET_PLAYER_CHARACTER, getPlayerCharacterSaga)
}

export function* editPlayerCharacterSaga({
  payload: {
    actions: { resetForm, setEditing, setErrors, setSubmitting },
    id,
    values: {
      attributes: {
        wounds: { current: wounds_current },
        strain: { current: strain_current },
      },
      deletedCriticalInjuries,
      deletedWeapons,
      equipment,
      favors,
      motivations,
      notes,
      skills,
      talents,
      weapons,
    },
  },
}) {
  const authInfo = yield select(authenticationSelector)

  const data = JSON.stringify({
    deletedCriticalInjuries: Object.entries(deletedCriticalInjuries).reduce(
      (total, [criticalInjury, toDelete]) =>
        toDelete ? [...total, criticalInjury] : total,
      [],
    ),
    deletedWeapons: Object.entries(deletedWeapons).reduce(
      (total, [weapon, toDelete]) => (toDelete ? [...total, weapon] : total),
      [],
    ),
    equipment,
    favors: Object.values(favors),
    motivations,
    notes,
    skills: Object.values(skills)
      .filter(({ rank }) => rank)
      .map(({ id, rank }) => ({
        id,
        rank,
      })),
    strain_current,
    talents: Object.values(talents).map(({ id, notes, rank }) => ({
      id,
      notes,
      rank,
    })),
    weapons: Object.values(weapons).map(({ id, mods }) => ({ id, mods })),
    wounds_current,
  })
  const requestUrl = uri(API_PATH)
    .segment([API_SEGMENTS.PLAYERS_CHARACTERS, id])
    .toString()

  const headers = {
    Authorization: `Bearer ${authInfo.get('jwt')}`,
    'Content-Type': 'application/json',
  }

  const opts = {
    data,
    headers,
    method: REST_METHODS.PUT,
    url: requestUrl,
  }
  try {
    const response = yield call(axios, opts)

    yield put(editPlayerCharacterSuccess(id, response.data.data))
    yield call(setSubmitting, false)
    yield call(setEditing, false)
    yield call(resetForm)
  } catch (error) {
    yield put(editPlayerCharacterError(id, error))
    yield call(setSubmitting, false)
    yield call(setErrors, { mainError: 'There was an error' }) // TODO: use real error from API

    if (error.response && error.response.status === 401) {
      yield put(logout())
    }
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
