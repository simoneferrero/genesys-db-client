import { fromJS } from 'immutable'

import {
  // getAdversaries
  GET_ADVERSARIES,
  GET_ADVERSARIES_SUCCESS,
  GET_ADVERSARIES_ERROR,
  // // getAdversary
  // GET_ADVERSARY,
  // GET_ADVERSARY_SUCCESS,
  // GET_ADVERSARY_ERROR,
} from 'actions/adversaries/constants'

import uiRecord from 'reducers/ui/records'

export const initialState = uiRecord()
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ADVERSARIES: {
      // case GET_ADVERSARY: {
      return uiRecord({
        loading: true,
      })
    }

    case GET_ADVERSARIES_SUCCESS: {
      // case GET_ADVERSARY_SUCCESS: {
      return uiRecord()
    }

    case GET_ADVERSARIES_ERROR: {
      // case GET_ADVERSARY_ERROR: {
      return uiRecord({
        error: fromJS(payload.error),
      })
    }

    default: {
      return state
    }
  }
}
