import { fromJS } from 'immutable'

import { GET_SKILLS_SUCCESS } from 'actions/skills/constants'

import initialState from './initialState'
import SkillRecord from './records'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_SKILLS_SUCCESS: {
      const { skills } = payload
      const skillsById = skills.reduce(
        (result, skill) => ({
          ...result,
          [skill.id]: new SkillRecord(skill),
        }),
        {},
      )
      const skillsAllIds = skills.map(({ id }) => id)
      return state
        .set('byId', fromJS(skillsById))
        .set('allIds', fromJS(skillsAllIds))
    }

    default: {
      return state
    }
  }
}
