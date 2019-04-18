import { fromJS } from 'immutable'

import {
  GET_FACTIONS,
  GET_FACTIONS_SUCCESS,
  GET_FACTIONS_ERROR,
} from 'actions/factions/constants'

import uiRecord from 'reducers/ui/records'

export const initialState = uiRecord()
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_FACTIONS: {
      return uiRecord({
        loading: true,
      })
    }

    case GET_FACTIONS_SUCCESS: {
      return uiRecord()
    }

    case GET_FACTIONS_ERROR: {
      return uiRecord({
        error: fromJS(payload.error),
      })
    }

    default: {
      return state
    }
  }
}
