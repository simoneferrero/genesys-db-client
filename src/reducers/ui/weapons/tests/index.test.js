import { fromJS } from 'immutable'

import reducer, { initialState } from '../index'
import { getWeapons, getWeaponsError, getWeaponsSuccess } from 'actions/weapons'

import { weapons } from 'mocks/weapons'
import { genericError } from 'mocks/errors'
import { uiElement, uiElementError, uiElementLoading } from 'mocks/ui'

describe('weapons ui reducer', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, {})
    expect(result).toEqual(initialState)
  })

  describe('getWeapons', () => {
    it('should handle action', () => {
      const result = reducer(initialState, getWeapons())
      const expectedResult = initialState.mergeDeep(fromJS(uiElementLoading))
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getWeaponsSuccess', () => {
    it('should handle action', () => {
      const result = reducer(initialState, getWeaponsSuccess(weapons))
      const expectedResult = initialState.mergeDeep(fromJS(uiElement))
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getWeaponsError', () => {
    it('should handle action', () => {
      const result = reducer(initialState, getWeaponsError(genericError))
      const expectedResult = initialState.mergeDeep(fromJS(uiElementError))
      expect(result).toEqual(expectedResult)
    })
  })
})
