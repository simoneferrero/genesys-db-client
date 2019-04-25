import { fromJS } from 'immutable'

import {
  GET_WEAPONS,
  GET_WEAPONS_SUCCESS,
  GET_WEAPONS_ERROR,
} from 'actions/weapons/constants'

import uiRecord from 'reducers/ui/records'

export const initialState = uiRecord()
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_WEAPONS: {
      return uiRecord({
        loading: true,
      })
    }

    case GET_WEAPONS_SUCCESS: {
      return uiRecord()
    }

    case GET_WEAPONS_ERROR: {
      return uiRecord({
        error: fromJS(payload.error),
      })
    }

    default: {
      return state
    }
  }
}
