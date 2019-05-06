import { fromJS } from 'immutable'

import reducer, { initialState } from '../index'
import {
  getCriticalInjuries,
  getCriticalInjuriesError,
  getCriticalInjuriesSuccess,
} from 'actions/criticalInjuries'

import { criticalInjuries } from 'mocks/criticalInjuries'
import { genericError } from 'mocks/errors'
import { uiElement, uiElementError, uiElementLoading } from 'mocks/ui'

describe('criticalInjuries ui reducer', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, {})
    expect(result).toEqual(initialState)
  })

  describe('getCriticalInjuries', () => {
    it('should handle action', () => {
      const result = reducer(initialState, getCriticalInjuries())
      const expectedResult = initialState.mergeDeep(fromJS(uiElementLoading))
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getCriticalInjuriesSuccess', () => {
    it('should handle action', () => {
      const result = reducer(
        initialState,
        getCriticalInjuriesSuccess(criticalInjuries),
      )
      const expectedResult = initialState.mergeDeep(fromJS(uiElement))
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getCriticalInjuriesError', () => {
    it('should handle action', () => {
      const result = reducer(
        initialState,
        getCriticalInjuriesError(genericError),
      )
      const expectedResult = initialState.mergeDeep(fromJS(uiElementError))
      expect(result).toEqual(expectedResult)
    })
  })
})
