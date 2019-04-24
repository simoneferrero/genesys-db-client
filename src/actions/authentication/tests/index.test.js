import {
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  GET_AUTH_INFO,
  GET_AUTH_INFO_SUCCESS,
  GET_AUTH_INFO_ERROR,
} from '../constants'
import {
  login,
  loginError,
  loginSuccess,
  logout,
  getAuthInfo,
  getAuthInfoError,
  getAuthInfoSuccess,
} from '../index'

import { formikActions } from 'mocks'
import { authInfoResponse, password, username } from 'mocks/authentication'
import { genericError } from 'mocks/errors'

describe('authentication actions', () => {
  describe('login', () => {
    describe('login', () => {
      it('should dispatch the correct action', () => {
        const details = {
          password,
          username,
        }
        const result = login(details, formikActions)
        const expectedResult = {
          type: LOGIN,
          payload: {
            actions: formikActions,
            details,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })

    describe('loginSuccess', () => {
      it('should dispatch the correct action', () => {
        const result = loginSuccess(authInfoResponse)
        const expectedResult = {
          type: LOGIN_SUCCESS,
          payload: {
            authInfo: authInfoResponse,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })

    describe('loginError', () => {
      it('should dispatch the correct action', () => {
        const result = loginError(genericError)
        const expectedResult = {
          type: LOGIN_ERROR,
          payload: {
            error: genericError,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })
  })

  describe('logout', () => {
    describe('logout', () => {
      it('should dispatch the correct action', () => {
        const result = logout()
        const expectedResult = {
          type: LOGOUT,
          payload: {},
        }
        expect(result).toEqual(expectedResult)
      })
    })
  })

  describe('getAuthInfo', () => {
    describe('getAuthInfo', () => {
      it('should dispatch the correct action', () => {
        const result = getAuthInfo()
        const expectedResult = {
          type: GET_AUTH_INFO,
          payload: {},
        }
        expect(result).toEqual(expectedResult)
      })
    })

    describe('getAuthInfoSuccess', () => {
      it('should dispatch the correct action', () => {
        const result = getAuthInfoSuccess(authInfoResponse)
        const expectedResult = {
          type: GET_AUTH_INFO_SUCCESS,
          payload: {
            authInfo: authInfoResponse,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })

    describe('getAuthInfoError', () => {
      it('should dispatch the correct action', () => {
        const result = getAuthInfoError(genericError)
        const expectedResult = {
          type: GET_AUTH_INFO_ERROR,
          payload: {
            error: genericError,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })
  })
})
