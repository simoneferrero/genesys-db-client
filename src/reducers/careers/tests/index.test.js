import { fromJS } from 'immutable'

import reducer from '../index'
import initialState from '../initialState'

import { getCareersSuccess } from 'actions/careers'

import { careers, careersById, careersAllIds } from 'mocks/careers'

describe('careers reducer', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, {
      type: '',
      payload: {},
    })
    expect(result).toEqual(initialState)
  })

  describe('getCareersSuccess', () => {
    it('should handle the action correctly', () => {
      const result = reducer(initialState, getCareersSuccess(careers))
      const expectedResult = fromJS({
        byId: careersById,
        allIds: careersAllIds,
      })

      expect(result).toEqual(expectedResult)
    })
  })
})
