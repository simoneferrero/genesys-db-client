import axios from 'axios'
import uri from 'urijs'

import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import { logout } from 'actions/authentication'
import {
  // getAdversaries
  GET_ADVERSARIES,
  // // getAdversary
  // GET_ADVERSARY,
  // // editAdversary
  // EDIT_ADVERSARY,
} from 'actions/adversaries/constants'
import {
  // getAdversaries
  getAdversariesError,
  getAdversariesSuccess,
  // // getAdversary
  // getAdversarySuccess,
  // getAdversaryError,
  // // editAdversary
  // editAdversarySuccess,
  // editAdversaryError,
} from 'actions/adversaries'

import { authenticationSelector } from 'reducers/authentication/selectors'

import { API_PATH, API_SEGMENTS, REST_METHODS } from 'utils/definitions'

export function* getAdversariesSaga() {
  const authInfo = yield select(authenticationSelector)

  const requestUrl = uri(API_PATH)
    .segment([API_SEGMENTS.ADVERSARIES])
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

    yield put(getAdversariesSuccess(response.data.data))
  } catch (error) {
    yield put(getAdversariesError(error))

    if (error.response && error.response.status === 401) {
      yield put(logout())
    }
  }
}

export function* getAdversariesWatcher() {
  yield takeLatest(GET_ADVERSARIES, getAdversariesSaga)
}

// export function* getAdversarySaga({ payload: { id } }) {
//   if (!id) {
//     return
//   }
//
//   const authInfo = yield select(authenticationSelector)
//
//   const requestUrl = uri(API_PATH)
//     .segment([API_SEGMENTS.ADVERSARIES, id])
//     .toString()
//
//   const headers = {
//     Authorization: `Bearer ${authInfo.get('jwt')}`,
//     'Content-Type': 'application/json',
//   }
//
//   const opts = {
//     headers,
//     method: REST_METHODS.GET,
//     url: requestUrl,
//   }
//   try {
//     const response = yield call(axios, opts)
//
//     yield put(getAdversarySuccess(id, response.data.data))
//   } catch (error) {
//     yield put(getAdversaryError(id, error))
//
//     if (error.response && error.response.status === 401) {
//       yield put(logout())
//     }
//   }
// }
//
// export function* getAdversaryWatcher() {
//   yield takeLatest(GET_ADVERSARY, getAdversarySaga)
// }
//
// export function* editAdversarySaga({
//   payload: {
//     actions: { resetForm, setEditing, setErrors, setSubmitting },
//     id,
//     values: {
//       attributes: {
//         defense: { melee: defense_melee, ranged: defense_ranged },
//         soak,
//         strain: { current: strain_current, total: strain_total },
//         wounds: { current: wounds_current, total: wounds_total },
//       },
//       characteristics,
//       deletedCriticalInjuries,
//       deletedWeapons,
//       equipment,
//       favors,
//       motivations,
//       notes,
//       skills,
//       talents,
//       weapons,
//       xp,
//     },
//   },
// }) {
//   const authInfo = yield select(authenticationSelector)
//
//   const data = JSON.stringify({
//     characteristics,
//     defense_melee,
//     defense_ranged,
//     deletedCriticalInjuries: Object.entries(deletedCriticalInjuries).reduce(
//       (total, [criticalInjury, toDelete]) =>
//         toDelete ? [...total, criticalInjury] : total,
//       [],
//     ),
//     deletedWeapons: Object.entries(deletedWeapons).reduce(
//       (total, [weapon, toDelete]) => (toDelete ? [...total, weapon] : total),
//       [],
//     ),
//     equipment,
//     favors: Object.values(favors),
//     motivations,
//     notes,
//     skills: Object.values(skills).map(({ career, id, rank }) => ({
//       career,
//       id,
//       rank,
//     })),
//     soak,
//     strain_current,
//     strain_total,
//     talents: Object.values(talents).map(({ id, notes, rank }) => ({
//       id,
//       notes,
//       rank,
//     })),
//     weapons: Object.values(weapons).map(({ id, mods }) => ({ id, mods })),
//     wounds_current,
//     wounds_total,
//     xp,
//   })
//   const requestUrl = uri(API_PATH)
//     .segment([API_SEGMENTS.ADVERSARIES, id])
//     .toString()
//
//   const headers = {
//     Authorization: `Bearer ${authInfo.get('jwt')}`,
//     'Content-Type': 'application/json',
//   }
//
//   const opts = {
//     data,
//     headers,
//     method: REST_METHODS.PUT,
//     url: requestUrl,
//   }
//   try {
//     const response = yield call(axios, opts)
//
//     yield put(editAdversarySuccess(id, response.data.data))
//     yield call(setSubmitting, false)
//     yield call(setEditing, false)
//     yield call(resetForm)
//   } catch (error) {
//     yield put(editAdversaryError(id, error))
//     yield call(setSubmitting, false)
//     yield call(setErrors, { mainError: 'There was an error' }) // TODO: use real error from API
//
//     if (error.response && error.response.status === 401) {
//       yield put(logout())
//     }
//   }
// }
//
// export function* editAdversaryWatcher() {
//   yield takeLatest(EDIT_ADVERSARY, editAdversarySaga)
// }

export default function* rootSaga() {
  yield all([
    call(getAdversariesWatcher),
    // call(getAdversaryWatcher),
    // call(editAdversaryWatcher),
  ])
}
