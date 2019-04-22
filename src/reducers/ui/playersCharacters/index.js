import { fromJS } from 'immutable'

import {
  // getPlayersCharacters
  GET_PLAYERS_CHARACTERS,
  GET_PLAYERS_CHARACTERS_SUCCESS,
  GET_PLAYERS_CHARACTERS_ERROR,
  // getPlayerCharacter
  GET_PLAYER_CHARACTER,
  GET_PLAYER_CHARACTER_SUCCESS,
  GET_PLAYER_CHARACTER_ERROR,
} from 'actions/playersCharacters/constants'

import uiRecord from 'reducers/ui/records'

export const initialState = uiRecord()
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PLAYERS_CHARACTERS:
    case GET_PLAYER_CHARACTER: {
      return uiRecord({
        loading: true,
      })
    }

    case GET_PLAYERS_CHARACTERS_SUCCESS:
    case GET_PLAYER_CHARACTER_SUCCESS: {
      return uiRecord()
    }

    case GET_PLAYERS_CHARACTERS_ERROR:
    case GET_PLAYER_CHARACTER_ERROR: {
      return uiRecord({
        error: fromJS(payload.error),
      })
    }

    default: {
      return state
    }
  }
}
