import axios from 'axios'
import uri from 'urijs'

import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import {
  GET_TALENTS,
  ADD_TALENT,
  ADD_PLAYER_CHARACTER_TALENT,
} from 'actions/talents/constants'

import { logout } from 'actions/authentication'
import {
  getTalentsError,
  getTalentsSuccess,
  addTalentError,
  addTalentSuccess,
  addPlayerCharacterTalentError,
  addPlayerCharacterTalentSuccess,
} from 'actions/talents'

import { authenticationSelector } from 'reducers/authentication/selectors'

import { API_PATH, API_SEGMENTS, REST_METHODS } from 'utils/definitions'

export function* getTalentsSaga() {
  const requestUrl = uri(API_PATH)
    .segment([API_SEGMENTS.TALENTS])
    .toString()

  const opts = {
    method: REST_METHODS.GET,
    url: requestUrl,
  }
  try {
    const response = yield call(axios, opts)

    yield put(getTalentsSuccess(response.data.data))
  } catch (error) {
    yield put(getTalentsError(error))
  }
}

export function* getTalentsWatcher() {
  yield takeLatest(GET_TALENTS, getTalentsSaga)
}

export function* addTalentSaga({
  payload: {
    actions: { resetForm, setErrors, setIsNew, setSubmitting },
    talent,
  },
}) {
  const authInfo = yield select(authenticationSelector)

  const requestUrl = uri(API_PATH)
    .segment([API_SEGMENTS.TALENTS])
    .toString()

  const headers = {
    Authorization: `Bearer ${authInfo.get('jwt')}`,
    'Content-Type': 'application/json',
  }
  const opts = {
    data: JSON.stringify(talent),
    headers,
    method: REST_METHODS.POST,
    url: requestUrl,
  }

  try {
    const response = yield call(axios, opts)

    yield put(addTalentSuccess(response.data.data))
    yield call(setSubmitting, false)
    yield call(setIsNew, false)
    yield call(resetForm)
  } catch (error) {
    yield put(addTalentError(error))
    yield call(setSubmitting, false)
    yield call(setErrors, { mainError: 'There was an error' }) // TODO: use real error from API

    if (error.response && error.response.status === 401) {
      yield put(logout())
    }
  }
}

export function* addTalentWatcher() {
  yield takeLatest(ADD_TALENT, addTalentSaga)
}

export function* addPlayerCharacterTalentSaga({
  payload: {
    actions: { resetForm, setErrors, setIsNew, setSubmitting },
    talentId,
    playerCharacterId,
  },
}) {
  const authInfo = yield select(authenticationSelector)

  const requestUrl = uri(API_PATH)
    .segment([
      API_SEGMENTS.PLAYERS_CHARACTERS,
      `${playerCharacterId}`,
      API_SEGMENTS.TALENT,
    ])
    .toString()

  const headers = {
    Authorization: `Bearer ${authInfo.get('jwt')}`,
    'Content-Type': 'application/json',
  }
  const opts = {
    data: JSON.stringify({ talent_id: talentId }),
    headers,
    method: REST_METHODS.POST,
    url: requestUrl,
  }

  try {
    const response = yield call(axios, opts)

    yield put(
      addPlayerCharacterTalentSuccess(playerCharacterId, response.data.data),
    )
    yield call(setSubmitting, false)
    yield call(setIsNew, false)
    yield call(resetForm)
  } catch (error) {
    yield put(addPlayerCharacterTalentError(playerCharacterId, error))
    yield call(setSubmitting, false)
    yield call(setErrors, { mainError: 'There was an error' }) // TODO: use real error from API

    if (error.response && error.response.status === 401) {
      yield put(logout())
    }
  }
}

export function* addPlayerCharacterTalentWatcher() {
  yield takeLatest(ADD_PLAYER_CHARACTER_TALENT, addPlayerCharacterTalentSaga)
}

export default function* rootSaga() {
  yield all([
    call(getTalentsWatcher),
    call(addTalentWatcher),
    call(addPlayerCharacterTalentWatcher),
  ])
}
