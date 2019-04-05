import { fromJS } from 'immutable'

import reducer, { initialState } from '../index'
import {
  getArchetypes,
  getArchetypesError,
  getArchetypesSuccess,
} from 'actions/archetypes'

import { archetypes } from 'mocks/archetypes'
import { genericError } from 'mocks/errors'
import { uiElement, uiElementError, uiElementLoading } from 'mocks/ui'

describe('archetypes ui reducer', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, {})
    expect(result).toEqual(initialState)
  })

  describe('getArchetypes', () => {
    it('should handle action', () => {
      const result = reducer(initialState, getArchetypes())
      const expectedResult = initialState.mergeDeep(fromJS(uiElementLoading))
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getArchetypesSuccess', () => {
    it('should handle action', () => {
      const result = reducer(initialState, getArchetypesSuccess(archetypes))
      const expectedResult = initialState.mergeDeep(fromJS(uiElement))
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getArchetypesError', () => {
    it('should handle action', () => {
      const result = reducer(initialState, getArchetypesError(genericError))
      const expectedResult = initialState.mergeDeep(fromJS(uiElementError))
      expect(result).toEqual(expectedResult)
    })
  })
})
