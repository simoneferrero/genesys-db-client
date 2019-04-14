import { fromJS } from 'immutable'

import {
  GET_SKILLS,
  GET_SKILLS_SUCCESS,
  GET_SKILLS_ERROR,
} from 'actions/skills/constants'

import uiRecord from 'reducers/ui/records'

export const initialState = uiRecord()
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_SKILLS: {
      return uiRecord({
        loading: true,
      })
    }

    case GET_SKILLS_SUCCESS: {
      return uiRecord()
    }

    case GET_SKILLS_ERROR: {
      return uiRecord({
        error: fromJS(payload.error),
      })
    }

    default: {
      return state
    }
  }
}
