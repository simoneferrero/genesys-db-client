import {
  GET_CAREERS,
  GET_CAREERS_ERROR,
  GET_CAREERS_SUCCESS,
} from '../constants'
import { getCareers, getCareersError, getCareersSuccess } from '../index'

import { careers } from 'mocks/careers'
import { genericError } from 'mocks/errors'

describe('getCareers actions', () => {
  describe('getCareers', () => {
    it('should dispatch the correct action', () => {
      const result = getCareers()
      const expectedResult = {
        type: GET_CAREERS,
        payload: {},
      }
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getCareersSuccess', () => {
    it('should dispatch the correct action', () => {
      const result = getCareersSuccess(careers)
      const expectedResult = {
        type: GET_CAREERS_SUCCESS,
        payload: {
          careers,
        },
      }
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getCareersError', () => {
    it('should dispatch the correct action', () => {
      const result = getCareersError(genericError)
      const expectedResult = {
        type: GET_CAREERS_ERROR,
        payload: {
          error: genericError,
        },
      }
      expect(result).toEqual(expectedResult)
    })
  })
})
