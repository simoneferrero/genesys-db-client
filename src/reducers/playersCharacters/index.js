import { fromJS } from 'immutable'

import uniq from 'lodash/uniq'

import {
  GET_PLAYER_CHARACTER_SUCCESS,
  GET_PLAYERS_CHARACTERS_SUCCESS,
} from 'actions/playersCharacters/constants'

import initialState from './initialState'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PLAYERS_CHARACTERS_SUCCESS: {
      const { playersCharacters } = payload
      const playersCharactersById = playersCharacters.reduce(
        (result, playerCharacter) => ({
          ...result,
          [playerCharacter.id]: playerCharacter,
        }),
        {},
      )
      const playersCharactersAllIds = playersCharacters.map(({ id }) => id)
      return state
        .set('byId', fromJS(playersCharactersById))
        .set('allIds', fromJS(playersCharactersAllIds))
    }

    case GET_PLAYER_CHARACTER_SUCCESS: {
      const { id, playerCharacter } = payload
      const allIds = state.get('allIds')
      return state
        .setIn(['byId', `${id}`], fromJS(playerCharacter))
        .set('allIds', fromJS(uniq([...allIds, id])))
    }

    default: {
      return state
    }
  }
}
