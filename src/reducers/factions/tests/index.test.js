import { List, Map } from 'immutable'

import ReducerRecord from 'reducers/records'

import reducer from '../index'
import initialState from '../initialState'

import { getFactionsSuccess } from 'actions/factions'

import { factions, factionsById, factionsAllIds } from 'mocks/factions'

describe('factions reducer', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, {
      type: '',
      payload: {},
    })
    expect(result).toEqual(initialState)
  })

  describe('getFactionsSuccess', () => {
    it('should handle the action correctly', () => {
      const result = reducer(initialState, getFactionsSuccess(factions))
      const expectedResult = new ReducerRecord({
        allIds: List(factionsAllIds),
        byId: Map(factionsById),
      })

      expect(result).toEqual(expectedResult)
    })
  })
})
