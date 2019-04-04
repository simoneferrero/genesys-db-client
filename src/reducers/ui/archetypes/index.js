import { fromJS } from 'immutable'

import {
  GET_ARCHETYPES,
  GET_ARCHETYPES_SUCCESS,
  GET_ARCHETYPES_ERROR,
} from 'actions/archetypes/constants'

import uiRecord from 'reducers/ui/records'

export const initialState = uiRecord()
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ARCHETYPES: {
      return uiRecord({
        loading: true,
      })
    }

    case GET_ARCHETYPES_SUCCESS: {
      return uiRecord()
    }

    case GET_ARCHETYPES_ERROR: {
      return uiRecord({
        error: fromJS(payload.error),
      })
    }

    default: {
      return state
    }
  }
}
