import {
  GET_FACTIONS,
  GET_FACTIONS_ERROR,
  GET_FACTIONS_SUCCESS,
} from '../constants'
import { getFactions, getFactionsError, getFactionsSuccess } from '../index'

import { factions } from 'mocks/factions'
import { genericError } from 'mocks/errors'

describe('getFactions actions', () => {
  describe('getFactions', () => {
    it('should dispatch the correct action', () => {
      const result = getFactions()
      const expectedResult = {
        type: GET_FACTIONS,
        payload: {},
      }
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getFactionsSuccess', () => {
    it('should dispatch the correct action', () => {
      const result = getFactionsSuccess(factions)
      const expectedResult = {
        type: GET_FACTIONS_SUCCESS,
        payload: {
          factions,
        },
      }
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getFactionsError', () => {
    it('should dispatch the correct action', () => {
      const result = getFactionsError(genericError)
      const expectedResult = {
        type: GET_FACTIONS_ERROR,
        payload: {
          error: genericError,
        },
      }
      expect(result).toEqual(expectedResult)
    })
  })
})
