import { fromJS } from 'immutable'

import {
  ADD_FAVOR,
  ADD_FAVOR_SUCCESS,
  ADD_FAVOR_ERROR,
} from 'actions/favors/constants'

import uiRecord from 'reducers/ui/records'

export const initialState = uiRecord()
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_FAVOR: {
      return uiRecord({
        loading: true,
      })
    }

    case ADD_FAVOR_SUCCESS: {
      return uiRecord()
    }

    case ADD_FAVOR_ERROR: {
      return uiRecord({
        error: fromJS(payload.error),
      })
    }

    default: {
      return state
    }
  }
}
