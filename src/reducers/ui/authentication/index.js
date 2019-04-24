import { fromJS } from 'immutable'

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from 'actions/authentication/constants'

import uiRecord from 'reducers/ui/records'

export const initialState = uiRecord()
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN: {
      return uiRecord({
        loading: true,
      })
    }

    case LOGIN_SUCCESS: {
      return uiRecord()
    }

    case LOGIN_ERROR: {
      return uiRecord({
        error: fromJS(payload.error),
      })
    }

    default: {
      return state
    }
  }
}
