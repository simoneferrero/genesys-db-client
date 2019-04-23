import axios from 'axios'
import uri from 'urijs'

import { all, call, put, takeLatest } from 'redux-saga/effects'
import { push } from 'connected-react-router'

import { LOGIN, LOGOUT, GET_AUTH_INFO } from 'actions/authentication/constants'
import {
  loginError,
  loginSuccess,
  logout,
  getAuthInfoError,
  getAuthInfoSuccess,
} from 'actions/authentication'

import { API_PATH, API_SEGMENTS, REST_METHODS } from 'utils/definitions'

export function* loginSaga({
  payload: {
    actions: { resetForm, setSubmitting, setErrors },
    details,
  },
}) {
  const requestUrl = uri(API_PATH)
    .segment([API_SEGMENTS.LOGIN])
    .toString()

  const headers = { 'Content-Type': 'application/json' }

  const opts = {
    data: JSON.stringify(details),
    headers,
    method: REST_METHODS.POST,
    url: requestUrl,
  }

  try {
    const {
      data: { data },
    } = yield call(axios, opts)

    yield call(window.localStorage.setItem, 'authInfo', JSON.stringify(data))
    yield put(loginSuccess(data))
    yield call(setSubmitting, false)
  } catch (error) {
    yield put(loginError(error))
    yield call(setSubmitting, false)
    yield call(resetForm)
    yield call(setErrors, { mainError: 'There was an error' }) // TODO: use real error from API
  }
}

export function* loginWatcher() {
  yield takeLatest(LOGIN, loginSaga)
}

export function* logoutSaga() {
  yield call(window.localStorage.clear)
  yield put(push('/'))
}

export function* logoutWatcher() {
  yield takeLatest(LOGOUT, logoutSaga)
}

export function* getAuthInfoSaga() {
  const authInfo = yield call(window.localStorage.getItem, 'authInfo')

  if (authInfo) {
    yield put(getAuthInfoSuccess(JSON.parse(authInfo)))
  } else {
    yield put(getAuthInfoError('Unauthorised'))
    yield put(logout())
  }
}

export function* getAuthInfoWatcher() {
  yield takeLatest(GET_AUTH_INFO, getAuthInfoSaga)
}

export default function* rootSaga() {
  yield all([call(loginWatcher), call(logoutWatcher), call(getAuthInfoWatcher)])
}
