import {
  GET_CRITICAL_INJURIES,
  GET_CRITICAL_INJURIES_ERROR,
  GET_CRITICAL_INJURIES_SUCCESS,
} from '../constants'
import {
  getCriticalInjuries,
  getCriticalInjuriesError,
  getCriticalInjuriesSuccess,
} from '../index'

import { criticalInjuries } from 'mocks/criticalInjuries'
import { genericError } from 'mocks/errors'

describe('getCriticalInjuries actions', () => {
  describe('getCriticalInjuries', () => {
    it('should dispatch the correct action', () => {
      const result = getCriticalInjuries()
      const expectedResult = {
        type: GET_CRITICAL_INJURIES,
        payload: {},
      }
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getCriticalInjuriesSuccess', () => {
    it('should dispatch the correct action', () => {
      const result = getCriticalInjuriesSuccess(criticalInjuries)
      const expectedResult = {
        type: GET_CRITICAL_INJURIES_SUCCESS,
        payload: {
          criticalInjuries,
        },
      }
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getCriticalInjuriesError', () => {
    it('should dispatch the correct action', () => {
      const result = getCriticalInjuriesError(genericError)
      const expectedResult = {
        type: GET_CRITICAL_INJURIES_ERROR,
        payload: {
          error: genericError,
        },
      }
      expect(result).toEqual(expectedResult)
    })
  })
})
