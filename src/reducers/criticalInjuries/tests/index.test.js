import { List, Map } from 'immutable'

import ReducerRecord from 'reducers/records'

import reducer from '../index'
import initialState from '../initialState'

import { getCriticalInjuriesSuccess } from 'actions/criticalInjuries'

import {
  criticalInjuries,
  criticalInjuriesById,
  criticalInjuriesAllIds,
} from 'mocks/criticalInjuries'

describe('criticalInjuries reducer', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, {
      type: '',
      payload: {},
    })
    expect(result).toEqual(initialState)
  })

  describe('getCriticalInjuriesSuccess', () => {
    it('should handle the action correctly', () => {
      const result = reducer(
        initialState,
        getCriticalInjuriesSuccess(criticalInjuries),
      )
      const expectedResult = new ReducerRecord({
        allIds: List(criticalInjuriesAllIds),
        byId: Map(criticalInjuriesById),
      })

      expect(result).toEqual(expectedResult)
    })
  })
})
