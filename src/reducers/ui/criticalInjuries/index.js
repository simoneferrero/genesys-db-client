import { fromJS } from 'immutable'

import {
  GET_CRITICAL_INJURIES,
  GET_CRITICAL_INJURIES_SUCCESS,
  GET_CRITICAL_INJURIES_ERROR,
} from 'actions/criticalInjuries/constants'

import uiRecord from 'reducers/ui/records'

export const initialState = uiRecord()
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CRITICAL_INJURIES: {
      return uiRecord({
        loading: true,
      })
    }

    case GET_CRITICAL_INJURIES_SUCCESS: {
      return uiRecord()
    }

    case GET_CRITICAL_INJURIES_ERROR: {
      return uiRecord({
        error: fromJS(payload.error),
      })
    }

    default: {
      return state
    }
  }
}
