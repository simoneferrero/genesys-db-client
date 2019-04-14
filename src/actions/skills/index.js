import { GET_SKILLS, GET_SKILLS_ERROR, GET_SKILLS_SUCCESS } from './constants'

export const getSkills = () => ({
  type: GET_SKILLS,
  payload: {},
})

export const getSkillsSuccess = (skills) => ({
  type: GET_SKILLS_SUCCESS,
  payload: {
    skills,
  },
})

export const getSkillsError = (error) => ({
  type: GET_SKILLS_ERROR,
  payload: {
    error,
  },
})
