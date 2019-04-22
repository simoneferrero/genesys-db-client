import { all, call, put, takeLatest } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import axios from 'axios'

import rootSaga, {
  loginSaga,
  loginWatcher,
  logoutSaga,
  logoutWatcher,
  getAuthInfoSaga,
  getAuthInfoWatcher,
} from '../index'
import { LOGIN, LOGOUT, GET_AUTH_INFO } from 'actions/authentication/constants'
import {
  loginError,
  loginSuccess,
  logout,
  getAuthInfoError,
  getAuthInfoSuccess,
} from 'actions/authentication'

import { apiPath, formikActions } from 'mocks'
import { genericError } from 'mocks/errors'
import { authInfoResponse, password, username } from 'mocks/authentication'

const details = { password, username }

describe('authentication sagas', () => {
  describe('login', () => {
    const action = {
      type: LOGIN,
      payload: {
        actions: formikActions,
        details,
      },
    }

    describe('loginSaga', () => {
      let generator

      beforeEach(() => {
        generator = loginSaga(action)
      })

      it('should dispatch the correct actions on success', () => {
        const headers = { 'Content-Type': 'application/json' }
        const opts = {
          data: JSON.stringify(details),
          headers,
          method: 'POST',
          url: `${apiPath}/login`,
        }
        const callAxiosDescriptor = generator.next().value
        const expectedCallAxiosDescriptor = call(axios, opts)
        expect(callAxiosDescriptor).toEqual(expectedCallAxiosDescriptor)

        const response = {
          data: { data: authInfoResponse },
        }
        const callSetItemDescriptor = generator.next(response).value
        const expectedCallSetItemDescriptor = call(
          window.localStorage.setItem,
          'authInfo',
          JSON.stringify(authInfoResponse),
        )
        expect(callSetItemDescriptor).toEqual(expectedCallSetItemDescriptor)

        const putSuccessDescriptor = generator.next().value
        const expectedPutSuccessDescriptor = put(loginSuccess(authInfoResponse))
        expect(putSuccessDescriptor).toEqual(expectedPutSuccessDescriptor)

        const callSetSubmittingDescriptor = generator.next().value
        const expectedCallSetSubmittingDescriptor = call(
          formikActions.setSubmitting,
          false,
        )
        expect(callSetSubmittingDescriptor).toEqual(
          expectedCallSetSubmittingDescriptor,
        )
      })

      it('should dispatch the correct actions on error', () => {
        generator.next().value
        const putErrorDescriptor = generator.throw(genericError).value
        const expectedPutErrorDescriptor = put(loginError(genericError))
        expect(putErrorDescriptor).toEqual(expectedPutErrorDescriptor)

        const callSetSubmittingDescriptor = generator.next().value
        const expectedCallSetSubmittingDescriptor = call(
          formikActions.setSubmitting,
          false,
        )
        expect(callSetSubmittingDescriptor).toEqual(
          expectedCallSetSubmittingDescriptor,
        )

        const callSetErrorsDescriptor = generator.next().value
        const expectedCallSetErrorsDescriptor = call(formikActions.setErrors, {
          mainError: 'There was an error',
        })
        expect(callSetErrorsDescriptor).toEqual(expectedCallSetErrorsDescriptor)
      })

      afterEach(() => {
        const endGeneratorDescriptor = generator.next().value
        expect(endGeneratorDescriptor).toBeUndefined()
      })
    })

    describe('loginWatcher', () => {
      it('should listen for the correct action', () => {
        const generator = loginWatcher(action)

        const takeLatestDescriptor = generator.next().value
        const expectedTakeLatestDescriptor = takeLatest(LOGIN, loginSaga)
        expect(takeLatestDescriptor).toEqual(expectedTakeLatestDescriptor)
      })
    })
  })

  describe('logout', () => {
    const action = {
      type: LOGOUT,
      payload: {},
    }

    describe('logoutSaga', () => {
      let generator

      beforeEach(() => {
        generator = logoutSaga(action)
      })

      it('should dispatch the correct actions', () => {
        const callClearDescriptor = generator.next().value
        const expectedCallClearDescriptor = call(window.localStorage.clear)
        expect(callClearDescriptor).toEqual(expectedCallClearDescriptor)

        const putDescriptor = generator.next().value
        const expectedPutDescriptor = put(push('/'))
        expect(putDescriptor).toEqual(expectedPutDescriptor)
      })

      afterEach(() => {
        const endGeneratorDescriptor = generator.next().value
        expect(endGeneratorDescriptor).toBeUndefined()
      })
    })

    describe('loginWatcher', () => {
      it('should listen for the correct action', () => {
        const generator = loginWatcher(action)

        const takeLatestDescriptor = generator.next().value
        const expectedTakeLatestDescriptor = takeLatest(LOGIN, loginSaga)
        expect(takeLatestDescriptor).toEqual(expectedTakeLatestDescriptor)
      })
    })
  })

  describe('getAuthInfo', () => {
    const action = {
      type: GET_AUTH_INFO,
      payload: {},
    }

    describe('getAuthInfoSaga', () => {
      let generator

      beforeEach(() => {
        generator = getAuthInfoSaga(action)

        const callSetItemDescriptor = generator.next().value
        const expectedCallSetItemDescriptor = call(
          window.localStorage.getItem,
          'authInfo',
        )
        expect(callSetItemDescriptor).toEqual(expectedCallSetItemDescriptor)
      })

      it('should dispatch the correct actions on success', () => {
        const putSuccessDescriptor = generator.next(
          JSON.stringify(authInfoResponse),
        ).value
        const expectedPutSuccessDescriptor = put(
          getAuthInfoSuccess(authInfoResponse),
        )
        expect(putSuccessDescriptor).toEqual(expectedPutSuccessDescriptor)
      })

      it('should dispatch the correct actions on error', () => {
        const putErrorDescriptor = generator.next().value
        const expectedPutErrorDescriptor = put(getAuthInfoError('Unauthorised'))
        expect(putErrorDescriptor).toEqual(expectedPutErrorDescriptor)

        const putLogoutDescriptor = generator.next().value
        const expectedPutLogoutDescriptor = put(logout())
        expect(putLogoutDescriptor).toEqual(expectedPutLogoutDescriptor)
      })

      afterEach(() => {
        const endGeneratorDescriptor = generator.next().value
        expect(endGeneratorDescriptor).toBeUndefined()
      })
    })

    describe('getAuthInfoWatcher', () => {
      it('should listen for the correct action', () => {
        const generator = getAuthInfoWatcher(action)

        const takeLatestDescriptor = generator.next().value
        const expectedTakeLatestDescriptor = takeLatest(
          GET_AUTH_INFO,
          getAuthInfoSaga,
        )
        expect(takeLatestDescriptor).toEqual(expectedTakeLatestDescriptor)
      })
    })
  })

  describe('rootSaga', () => {
    it('should export the correct root', () => {
      const generator = rootSaga({})

      const allDescriptor = generator.next().value
      const expectedAllDescriptor = all([
        call(loginWatcher),
        call(logoutWatcher),
        call(getAuthInfoWatcher),
      ])
      expect(allDescriptor).toEqual(expectedAllDescriptor)
    })
  })
})
