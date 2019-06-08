import { List, Map } from 'immutable'

import ReducerRecord from 'reducers/records'

import reducer from '../index'
import initialState from '../initialState'

import { getTalentsSuccess, addTalentSuccess } from 'actions/talents'

import { talent3, talents, talentsById, talentsAllIds } from 'mocks/talents'

describe('talents reducer', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, {
      type: '',
      payload: {},
    })
    expect(result).toEqual(initialState)
  })

  describe('getTalentsSuccess', () => {
    it('should handle the action correctly', () => {
      const result = reducer(initialState, getTalentsSuccess(talents))
      const expectedResult = new ReducerRecord({
        allIds: List(talentsAllIds),
        byId: Map(talentsById),
      })

      expect(result).toEqual(expectedResult)
    })
  })

  describe('addTalentSuccess', () => {
    it('should handle the action correctly', () => {
      const modifiedState = reducer(
        initialState,
        getTalentsSuccess([talents[0], talents[1]]),
      )
      const result = reducer(modifiedState, addTalentSuccess(talent3))
      const expectedResult = new ReducerRecord({
        allIds: List(talentsAllIds),
        byId: Map(talentsById),
      })

      expect(result).toEqual(expectedResult)
    })
  })
})
