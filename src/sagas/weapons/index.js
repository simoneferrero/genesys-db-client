import axios from 'axios'
import uri from 'urijs'

import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import { GET_WEAPONS, ADD_WEAPON } from 'actions/weapons/constants'
import {
  getWeaponsError,
  getWeaponsSuccess,
  addWeaponError,
  addWeaponSuccess,
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
    actions: { setErrors, setIsNew, setSubmitting },
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
  } catch (error) {
    yield put(addWeaponError(error))
    yield call(setSubmitting, false)
    yield call(setErrors, { mainError: 'There was an error' }) // TODO: use real error from API
  }
}

export function* addWeaponWatcher() {
  yield takeLatest(ADD_WEAPON, addWeaponSaga)
}

export default function* rootSaga() {
  yield all([call(getWeaponsWatcher), call(addWeaponWatcher)])
}
