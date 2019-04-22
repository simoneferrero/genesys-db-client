import { List, Map } from 'immutable'

import ReducerRecord from 'reducers/records'

import reducer from '../index'
import initialState from '../initialState'

import { getArchetypesSuccess } from 'actions/archetypes'

import { archetypes, archetypesById, archetypesAllIds } from 'mocks/archetypes'

describe('archetypes reducer', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, {
      type: '',
      payload: {},
    })
    expect(result).toEqual(initialState)
  })

  describe('getArchetypesSuccess', () => {
    it('should handle the action correctly', () => {
      const result = reducer(initialState, getArchetypesSuccess(archetypes))
      const expectedResult = new ReducerRecord({
        allIds: List(archetypesAllIds),
        byId: Map(archetypesById),
      })

      expect(result).toEqual(expectedResult)
    })
  })
})
