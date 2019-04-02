import { fromJS } from 'immutable'

import { GET_PLAYER_CHARACTERS_SUCCESS } from 'actions/playerCharacters/constants'

import initialState from './initialState'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PLAYER_CHARACTERS_SUCCESS: {
      const { playerCharacters } = payload
      const playerCharactersById = playerCharacters.reduce(
        (result, playerCharacter) => ({
          ...result,
          [playerCharacter.id]: playerCharacter,
        }),
        {},
      )
      const playerCharactersAllIds = playerCharacters.map(({ id }) => id)
      return state
        .set('byId', fromJS(playerCharactersById))
        .set('allIds', fromJS(playerCharactersAllIds))
    }

    default: {
      return state
    }
  }
}
