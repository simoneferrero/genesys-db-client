import {
  GET_ARCHETYPES,
  GET_ARCHETYPES_ERROR,
  GET_ARCHETYPES_SUCCESS,
} from '../constants'
import {
  getArchetypes,
  getArchetypesError,
  getArchetypesSuccess,
} from '../index'

import { archetypes } from 'mocks/archetypes'
import { genericError } from 'mocks/errors'

describe('getArchetypes actions', () => {
  describe('getArchetypes', () => {
    it('should dispatch the correct action', () => {
      const result = getArchetypes()
      const expectedResult = {
        type: GET_ARCHETYPES,
        payload: {},
      }
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getArchetypesSuccess', () => {
    it('should dispatch the correct action', () => {
      const result = getArchetypesSuccess(archetypes)
      const expectedResult = {
        type: GET_ARCHETYPES_SUCCESS,
        payload: {
          archetypes,
        },
      }
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getArchetypesError', () => {
    it('should dispatch the correct action', () => {
      const result = getArchetypesError(genericError)
      const expectedResult = {
        type: GET_ARCHETYPES_ERROR,
        payload: {
          error: genericError,
        },
      }
      expect(result).toEqual(expectedResult)
    })
  })
})
