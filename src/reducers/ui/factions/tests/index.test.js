import { fromJS } from 'immutable'

import reducer, { initialState } from '../index'
import {
  getFactions,
  getFactionsError,
  getFactionsSuccess,
} from 'actions/factions'

import { factions } from 'mocks/factions'
import { genericError } from 'mocks/errors'
import { uiElement, uiElementError, uiElementLoading } from 'mocks/ui'

describe('factions ui reducer', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, {})
    expect(result).toEqual(initialState)
  })

  describe('getFactions', () => {
    it('should handle action', () => {
      const result = reducer(initialState, getFactions())
      const expectedResult = initialState.mergeDeep(fromJS(uiElementLoading))
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getFactionsSuccess', () => {
    it('should handle action', () => {
      const result = reducer(initialState, getFactionsSuccess(factions))
      const expectedResult = initialState.mergeDeep(fromJS(uiElement))
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getFactionsError', () => {
    it('should handle action', () => {
      const result = reducer(initialState, getFactionsError(genericError))
      const expectedResult = initialState.mergeDeep(fromJS(uiElementError))
      expect(result).toEqual(expectedResult)
    })
  })
})
