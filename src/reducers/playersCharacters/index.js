import { fromJS } from 'immutable'

import { GET_PLAYERS_CHARACTERS_SUCCESS } from 'actions/playersCharacters/constants'

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

    default: {
      return state
    }
  }
}
