import AuthenticationRecord from '../records'

import reducer from '../index'
import initialState from '../initialState'

import {
  getAuthInfoError,
  getAuthInfoSuccess,
  loginSuccess,
  logout,
} from 'actions/authentication'

import { authInfoResponse } from 'mocks/authentication'
import { genericError } from 'mocks/errors'

describe('authentication reducer', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, {
      type: '',
      payload: {},
    })
    expect(result).toEqual(initialState)
  })

  describe('login', () => {
    describe('loginSuccess', () => {
      it('should handle the action correctly', () => {
        const result = reducer(initialState, loginSuccess(authInfoResponse))
        const expectedResult = new AuthenticationRecord(authInfoResponse)

        expect(result).toEqual(expectedResult)
      })
    })
  })

  describe('logout', () => {
    describe('logout', () => {
      it('should handle the action correctly', () => {
        const result = reducer(initialState, logout())
        const expectedResult = new AuthenticationRecord()

        expect(result).toEqual(expectedResult)
      })
    })
  })

  describe('getAuthInfo', () => {
    describe('getAuthInfoSuccess', () => {
      it('should handle the action correctly', () => {
        const result = reducer(
          initialState,
          getAuthInfoSuccess(authInfoResponse),
        )
        const expectedResult = new AuthenticationRecord(authInfoResponse)

        expect(result).toEqual(expectedResult)
      })
    })

    describe('getAuthInfoError', () => {
      it('should handle the action correctly', () => {
        const result = reducer(initialState, getAuthInfoError(genericError))
        const expectedResult = new AuthenticationRecord()

        expect(result).toEqual(expectedResult)
      })
    })
  })
})
