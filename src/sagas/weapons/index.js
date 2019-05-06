import axios from 'axios'
import uri from 'urijs'

import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import {
  GET_WEAPONS,
  ADD_WEAPON,
  ADD_PLAYER_CHARACTER_WEAPON,
} from 'actions/weapons/constants'

import { logout } from 'actions/authentication'
import {
  getWeaponsError,
  getWeaponsSuccess,
  addWeaponError,
  addWeaponSuccess,
  addPlayerCharacterWeaponError,
  addPlayerCharacterWeaponSuccess,
} from 'actions/weapons'

import { authenticationSelector } from 'reducers/authentication/selectors'

import { API_PATH, API_SEGMENTS, REST_METHODS } from 'utils/definitions'

export function* getWeaponsSaga() {
  const requestUrl = uri(API_PATH)
    .segment([API_SEGMENTS.WEAPONS])
    .toString()

  const opts = {
    method: REST_METHODS.GET,
    url: requestUrl,
  }
  try {
    const response = yield call(axios, opts)

    yield put(getWeaponsSuccess(response.data.data))
  } catch (error) {
    yield put(getWeaponsError(error))
  }
}

export function* getWeaponsWatcher() {
  yield takeLatest(GET_WEAPONS, getWeaponsSaga)
}

export function* addWeaponSaga({
  payload: {
    actions: { resetForm, setErrors, setIsNew, setSubmitting },
    weapon,
  },
}) {
  const authInfo = yield select(authenticationSelector)

  const requestUrl = uri(API_PATH)
    .segment([API_SEGMENTS.WEAPONS])
    .toString()

  const headers = {
    Authorization: `Bearer ${authInfo.get('jwt')}`,
    'Content-Type': 'application/json',
  }
  const opts = {
    data: JSON.stringify(weapon),
    headers,
    method: REST_METHODS.POST,
    url: requestUrl,
  }

  try {
    const response = yield call(axios, opts)

    yield put(addWeaponSuccess(response.data.data))
    yield call(setSubmitting, false)
    yield call(setIsNew, false)
    yield call(resetForm)
  } catch (error) {
    yield put(addWeaponError(error))
    yield call(setSubmitting, false)
    yield call(setErrors, { mainError: 'There was an error' }) // TODO: use real error from API

    if (error.response && error.response.status === 401) {
      yield put(logout())
    }
  }
}

export function* addWeaponWatcher() {
  yield takeLatest(ADD_WEAPON, addWeaponSaga)
}

export function* addPlayerCharacterWeaponSaga({
  payload: {
    actions: { resetForm, setErrors, setIsNew, setSubmitting },
    playerCharacterId,
    weaponId,
  },
}) {
  const authInfo = yield select(authenticationSelector)

  const requestUrl = uri(API_PATH)
    .segment([
      API_SEGMENTS.PLAYERS_CHARACTERS,
      `${playerCharacterId}`,
      API_SEGMENTS.WEAPON,
    ])
    .toString()

  const headers = {
    Authorization: `Bearer ${authInfo.get('jwt')}`,
    'Content-Type': 'application/json',
  }
  const opts = {
    data: JSON.stringify({ weapon_id: weaponId }),
    headers,
    method: REST_METHODS.POST,
    url: requestUrl,
  }

  try {
    const response = yield call(axios, opts)

    yield put(
      addPlayerCharacterWeaponSuccess(playerCharacterId, response.data.data),
    )
    yield call(setSubmitting, false)
    yield call(setIsNew, false)
    yield call(resetForm)
  } catch (error) {
    yield put(addPlayerCharacterWeaponError(playerCharacterId, error))
    yield call(setSubmitting, false)
    yield call(setErrors, { mainError: 'There was an error' }) // TODO: use real error from API

    if (error.response && error.response.status === 401) {
      yield put(logout())
    }
  }
}

export function* addPlayerCharacterWeaponWatcher() {
  yield takeLatest(ADD_PLAYER_CHARACTER_WEAPON, addPlayerCharacterWeaponSaga)
}

export default function* rootSaga() {
  yield all([
    call(getWeaponsWatcher),
    call(addWeaponWatcher),
    call(addPlayerCharacterWeaponWatcher),
  ])
}
