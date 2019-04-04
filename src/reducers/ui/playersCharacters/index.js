import { fromJS } from 'immutable'

import {
  GET_PLAYERS_CHARACTERS,
  GET_PLAYERS_CHARACTERS_SUCCESS,
  GET_PLAYERS_CHARACTERS_ERROR,
} from 'actions/playersCharacters/constants'

import uiRecord from 'reducers/ui/records'

export const initialState = uiRecord()
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PLAYERS_CHARACTERS: {
      return uiRecord({
        loading: true,
      })
    }

    case GET_PLAYERS_CHARACTERS_SUCCESS: {
      return uiRecord()
    }

    case GET_PLAYERS_CHARACTERS_ERROR: {
      return uiRecord({
        error: fromJS(payload.error),
      })
    }

    default: {
      return state
    }
  }
}
