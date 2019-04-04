import { fromJS } from 'immutable'

import reducer, { initialState } from '../index'
import { getCareers, getCareersError, getCareersSuccess } from 'actions/careers'

import { careers } from 'mocks/careers'
import { genericError } from 'mocks/errors'
import { uiElement, uiElementError, uiElementLoading } from 'mocks/ui'

describe('careers ui reducer', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, {})
    expect(result).toEqual(initialState)
  })

  describe('getCareers', () => {
    it('should handle action', () => {
      const result = reducer(initialState, getCareers())
      const expectedResult = initialState.mergeDeep(fromJS(uiElementLoading))
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getCareersSuccess', () => {
    it('should handle action', () => {
      const result = reducer(initialState, getCareersSuccess(careers))
      const expectedResult = initialState.mergeDeep(fromJS(uiElement))
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getCareersError', () => {
    it('should handle action', () => {
      const result = reducer(initialState, getCareersError(genericError))
      const expectedResult = initialState.mergeDeep(fromJS(uiElementError))
      expect(result).toEqual(expectedResult)
    })
  })
})
