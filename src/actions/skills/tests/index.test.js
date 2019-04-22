import { GET_SKILLS, GET_SKILLS_ERROR, GET_SKILLS_SUCCESS } from '../constants'
import { getSkills, getSkillsError, getSkillsSuccess } from '../index'

import { skills } from 'mocks/skills'
import { genericError } from 'mocks/errors'

describe('getSkills actions', () => {
  describe('getSkills', () => {
    it('should dispatch the correct action', () => {
      const result = getSkills()
      const expectedResult = {
        type: GET_SKILLS,
        payload: {},
      }
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getSkillsSuccess', () => {
    it('should dispatch the correct action', () => {
      const result = getSkillsSuccess(skills)
      const expectedResult = {
        type: GET_SKILLS_SUCCESS,
        payload: {
          skills,
        },
      }
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getSkillsError', () => {
    it('should dispatch the correct action', () => {
      const result = getSkillsError(genericError)
      const expectedResult = {
        type: GET_SKILLS_ERROR,
        payload: {
          error: genericError,
        },
      }
      expect(result).toEqual(expectedResult)
    })
  })
})
