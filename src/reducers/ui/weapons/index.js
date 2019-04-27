import { fromJS } from 'immutable'

import {
  GET_WEAPONS,
  GET_WEAPONS_SUCCESS,
  GET_WEAPONS_ERROR,
  ADD_PLAYER_CHARACTER_WEAPON,
  ADD_PLAYER_CHARACTER_WEAPON_SUCCESS,
  ADD_PLAYER_CHARACTER_WEAPON_ERROR,
} from 'actions/weapons/constants'

import uiRecord from 'reducers/ui/records'

export const initialState = uiRecord()
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PLAYER_CHARACTER_WEAPON:
    case GET_WEAPONS: {
      return uiRecord({
        loading: true,
      })
    }

    case ADD_PLAYER_CHARACTER_WEAPON_SUCCESS:
    case GET_WEAPONS_SUCCESS: {
      return uiRecord()
    }

    case ADD_PLAYER_CHARACTER_WEAPON_ERROR:
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
