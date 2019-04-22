import { fromJS } from 'immutable'

import reducer, { initialState } from '../index'
import { getSkills, getSkillsError, getSkillsSuccess } from 'actions/skills'

import { skills } from 'mocks/skills'
import { genericError } from 'mocks/errors'
import { uiElement, uiElementError, uiElementLoading } from 'mocks/ui'

describe('skills ui reducer', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, {})
    expect(result).toEqual(initialState)
  })

  describe('getSkills', () => {
    it('should handle action', () => {
      const result = reducer(initialState, getSkills())
      const expectedResult = initialState.mergeDeep(fromJS(uiElementLoading))
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getSkillsSuccess', () => {
    it('should handle action', () => {
      const result = reducer(initialState, getSkillsSuccess(skills))
      const expectedResult = initialState.mergeDeep(fromJS(uiElement))
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getSkillsError', () => {
    it('should handle action', () => {
      const result = reducer(initialState, getSkillsError(genericError))
      const expectedResult = initialState.mergeDeep(fromJS(uiElementError))
      expect(result).toEqual(expectedResult)
    })
  })
})
