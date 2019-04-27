import axios from 'axios'
import uri from 'urijs'

import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import { logout } from 'actions/authentication'
import { ADD_FAVOR } from 'actions/favors/constants'
import { addFavorError, addFavorSuccess } from 'actions/favors'

import { authenticationSelector } from 'reducers/authentication/selectors'

import { API_PATH, API_SEGMENTS, REST_METHODS } from 'utils/definitions'

export function* addFavorSaga({
  payload: { actions, favor, playerCharacterId },
}) {
  const authInfo = yield select(authenticationSelector)

  const requestUrl = uri(API_PATH)
    .segment([
      API_SEGMENTS.PLAYERS_CHARACTERS,
      `${playerCharacterId}`,
      API_SEGMENTS.FAVOR,
    ])
    .toString()

  const headers = {
    Authorization: `Bearer ${authInfo.get('jwt')}`,
    'Content-Type': 'application/json',
  }

  const opts = {
    data: JSON.stringify(favor),
    headers,
    method: REST_METHODS.POST,
    url: requestUrl,
  }

  try {
    const response = yield call(axios, opts)

    yield put(addFavorSuccess(playerCharacterId, response.data.data))
    yield call(actions.setSubmitting, false)
    yield call(actions.setIsNew, false)
  } catch (error) {
    yield put(addFavorError(playerCharacterId, error))
    yield call(actions.setSubmitting, false)
    yield call(actions.setErrors, { mainError: 'There was an error' }) // TODO: use real error from API

    if (error.response && error.response.status === 401) {
      yield put(logout())
    }
  }
}

export function* addFavorWatcher() {
  yield takeLatest(ADD_FAVOR, addFavorSaga)
}

export default function* rootSaga() {
  yield all([call(addFavorWatcher)])
}
