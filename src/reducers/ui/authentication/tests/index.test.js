import { fromJS } from 'immutable'

import reducer, { initialState } from '../index'
import { login, loginError, loginSuccess } from 'actions/authentication'

import { formikActions } from 'mocks'
import { genericError } from 'mocks/errors'
import { authInfoResponse, password, username } from 'mocks/authentication'
import { uiElement, uiElementError, uiElementLoading } from 'mocks/ui'

describe('authentication ui reducer', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, {})
    expect(result).toEqual(initialState)
  })

  describe('login', () => {
    it('should handle action', () => {
      const details = {
        password,
        username,
      }
      const result = reducer(initialState, login(details, formikActions))
      const expectedResult = initialState.mergeDeep(fromJS(uiElementLoading))
      expect(result).toEqual(expectedResult)
    })
  })

  describe('loginSuccess', () => {
    it('should handle action', () => {
      const result = reducer(initialState, loginSuccess(authInfoResponse))
      const expectedResult = initialState.mergeDeep(fromJS(uiElement))
      expect(result).toEqual(expectedResult)
    })
  })

  describe('loginError', () => {
    it('should handle action', () => {
      const result = reducer(initialState, loginError(genericError))
      const expectedResult = initialState.mergeDeep(fromJS(uiElementError))
      expect(result).toEqual(expectedResult)
    })
  })
})
