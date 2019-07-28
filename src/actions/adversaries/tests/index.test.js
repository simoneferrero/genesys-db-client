import {
  // getAdversaries
  GET_ADVERSARIES,
  GET_ADVERSARIES_ERROR,
  GET_ADVERSARIES_SUCCESS,
} from '../constants'
import {
  // getAdversaries
  getAdversaries,
  getAdversariesError,
  getAdversariesSuccess,
} from '../index'

import { adversariesResponse } from 'mocks/adversaries'
import { genericError } from 'mocks/errors'

describe('adversaries actions', () => {
  describe('getAdversaries', () => {
    describe('getAdversaries', () => {
      it('should dispatch the correct action', () => {
        const result = getAdversaries()
        const expectedResult = {
          type: GET_ADVERSARIES,
          payload: {},
        }
        expect(result).toEqual(expectedResult)
      })
    })

    describe('getAdversariesSuccess', () => {
      it('should dispatch the correct action', () => {
        const result = getAdversariesSuccess(adversariesResponse)
        const expectedResult = {
          type: GET_ADVERSARIES_SUCCESS,
          payload: {
            adversaries: adversariesResponse,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })

    describe('getAdversariesError', () => {
      it('should dispatch the correct action', () => {
        const result = getAdversariesError(genericError)
        const expectedResult = {
          type: GET_ADVERSARIES_ERROR,
          payload: {
            error: genericError,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })
  })
})
