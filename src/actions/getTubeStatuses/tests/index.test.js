import {
  GET_TUBE_STATUSES,
  GET_TUBE_STATUSES_ERROR,
  GET_TUBE_STATUSES_SUCCESS,
} from '../constants'
import {
  getTubeStatuses,
  getTubeStatusesError,
  getTubeStatusesSuccess,
} from '../index'

import { statuses } from 'mocks/statuses'
import { getTubeStatusError } from 'mocks/errors'

describe('getTubeStatuses actions', () => {
  describe('getTubeStatuses', () => {
    it('should dispatch the correct action', () => {
      const result = getTubeStatuses()
      const expectedResult = {
        type: GET_TUBE_STATUSES,
        payload: {},
      }
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getTubeStatusesSuccess', () => {
    it('should dispatch the correct action', () => {
      const result = getTubeStatusesSuccess(statuses)
      const expectedResult = {
        type: GET_TUBE_STATUSES_SUCCESS,
        payload: {
          statuses,
        },
      }
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getTubeStatusesError', () => {
    it('should dispatch the correct action', () => {
      const result = getTubeStatusesError(getTubeStatusError)
      const expectedResult = {
        type: GET_TUBE_STATUSES_ERROR,
        payload: {
          error: getTubeStatusError,
        },
      }
      expect(result).toEqual(expectedResult)
    })
  })
})
