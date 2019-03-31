import { fromJS } from 'immutable'

import reducer from '../index'
import initialState from '../initialState'

import {
  getTubeStatuses,
  getTubeStatusesError,
  getTubeStatusesSuccess,
} from 'actions/getTubeStatuses'

import { statuses, statusesById, statusesAllIds } from 'mocks/statuses'

describe('statuses reducer', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, {
      type: '',
      payload: {},
    })
    expect(result).toEqual(initialState)
  })

  describe('getTubeStatuses', () => {
    it('should handle the action correctly', () => {
      const result = reducer(initialState, getTubeStatuses(statuses))
      expect(result).toEqual(initialState)
    })
  })

  describe('getTubeStatusesSuccess', () => {
    it('should handle the action correctly', () => {
      const result = reducer(initialState, getTubeStatusesSuccess(statuses))
      const expectedResult = fromJS({
        byId: statusesById,
        allIds: statusesAllIds,
      })

      expect(result).toEqual(expectedResult)
    })
  })

  describe('getTubeStatusesError', () => {
    it('should handle the action correctly', () => {
      const result = reducer(initialState, getTubeStatusesError(statuses))
      expect(result).toEqual(initialState)
    })
  })
})
