import { List, Map } from 'immutable'

import ReducerRecord from 'reducers/records'

import reducer from '../index'
import initialState from '../initialState'

import { getSkillsSuccess } from 'actions/skills'

import { skills, skillsById, skillsAllIds } from 'mocks/skills'

describe('skills reducer', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, {
      type: '',
      payload: {},
    })
    expect(result).toEqual(initialState)
  })

  describe('getSkillsSuccess', () => {
    it('should handle the action correctly', () => {
      const result = reducer(initialState, getSkillsSuccess(skills))
      const expectedResult = new ReducerRecord({
        allIds: List(skillsAllIds),
        byId: Map(skillsById),
      })

      expect(result).toEqual(expectedResult)
    })
  })
})
