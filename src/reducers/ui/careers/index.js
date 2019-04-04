import { fromJS } from 'immutable'

import {
  GET_CAREERS,
  GET_CAREERS_SUCCESS,
  GET_CAREERS_ERROR,
} from 'actions/careers/constants'

import uiRecord from 'reducers/ui/records'

export const initialState = uiRecord()
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CAREERS: {
      return uiRecord({
        loading: true,
      })
    }

    case GET_CAREERS_SUCCESS: {
      return uiRecord()
    }

    case GET_CAREERS_ERROR: {
      return uiRecord({
        error: fromJS(payload.error),
      })
    }

    default: {
      return state
    }
  }
}
