import axios from 'axios'
import uri from 'urijs'

import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import {
  GET_CRITICAL_INJURIES,
  ADD_PLAYER_CHARACTER_CRITICAL_INJURY,
} from 'actions/criticalInjuries/constants'

import { logout } from 'actions/authentication'
import {
  getCriticalInjuriesError,
  getCriticalInjuriesSuccess,
  addPlayerCharacterCriticalInjuryError,
  addPlayerCharacterCriticalInjurySuccess,
} from 'actions/criticalInjuries'

import { authenticationSelector } from 'reducers/authentication/selectors'

import { API_PATH, API_SEGMENTS, REST_METHODS } from 'utils/definitions'

export function* getCriticalInjuriesSaga() {
  const requestUrl = uri(API_PATH)
    .segment([API_SEGMENTS.CRITICAL_INJURIES])
    .toString()

  const opts = {
    method: REST_METHODS.GET,
    url: requestUrl,
  }
  try {
    const response = yield call(axios, opts)

    yield put(getCriticalInjuriesSuccess(response.data.data))
  } catch (error) {
    yield put(getCriticalInjuriesError(error))
  }
}

export function* getCriticalInjuriesWatcher() {
  yield takeLatest(GET_CRITICAL_INJURIES, getCriticalInjuriesSaga)
}

export function* addPlayerCharacterCriticalInjurySaga({
  payload: {
    actions: { resetForm, setErrors, setIsNew, setSubmitting },
    criticalInjuryId,
    playerCharacterId,
  },
}) {
  const authInfo = yield select(authenticationSelector)

  const requestUrl = uri(API_PATH)
    .segment([
      API_SEGMENTS.PLAYERS_CHARACTERS,
      `${playerCharacterId}`,
      API_SEGMENTS.CRITICAL_INJURY,
    ])
    .toString()

  const headers = {
    Authorization: `Bearer ${authInfo.get('jwt')}`,
    'Content-Type': 'application/json',
  }
  const opts = {
    data: JSON.stringify({ critical_injury_id: criticalInjuryId }),
    headers,
    method: REST_METHODS.POST,
    url: requestUrl,
  }

  try {
    const response = yield call(axios, opts)

    yield put(
      addPlayerCharacterCriticalInjurySuccess(
        playerCharacterId,
        response.data.data,
      ),
    )
    yield call(setSubmitting, false)
    yield call(setIsNew, false)
    yield call(resetForm)
  } catch (error) {
    yield put(addPlayerCharacterCriticalInjuryError(playerCharacterId, error))
    yield call(setSubmitting, false)
    yield call(setErrors, { mainError: 'There was an error' }) // TODO: use real error from API

    if (error.response && error.response.status === 401) {
      yield put(logout())
    }
  }
}

export function* addPlayerCharacterCriticalInjuryWatcher() {
  yield takeLatest(
    ADD_PLAYER_CHARACTER_CRITICAL_INJURY,
    addPlayerCharacterCriticalInjurySaga,
  )
}

export default function* rootSaga() {
  yield all([
    call(getCriticalInjuriesWatcher),
    call(addPlayerCharacterCriticalInjuryWatcher),
  ])
}
