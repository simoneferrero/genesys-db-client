import { fromJS, List } from 'immutable'

import uniq from 'lodash/uniq'

import { ADD_FAVOR_SUCCESS } from 'actions/favors/constants'
import {
  GET_PLAYERS_CHARACTERS_SUCCESS,
  GET_PLAYER_CHARACTER_SUCCESS,
  EDIT_PLAYER_CHARACTER_SUCCESS,
} from 'actions/playersCharacters/constants'

import initialState from './initialState'
import PlayerCharacterRecord from './records'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PLAYERS_CHARACTERS_SUCCESS: {
      const { playersCharacters } = payload
      const playersCharactersById = playersCharacters.reduce(
        (result, playerCharacter) => ({
          ...result,
          [playerCharacter.id]: new PlayerCharacterRecord(
            fromJS(playerCharacter),
          ),
        }),
        {},
      )
      const playersCharactersAllIds = playersCharacters.map(({ id }) => `${id}`)
      return state
        .mergeDeepIn(['byId'], fromJS(playersCharactersById))
        .set('allIds', fromJS(playersCharactersAllIds))
    }

    case GET_PLAYER_CHARACTER_SUCCESS:
    case EDIT_PLAYER_CHARACTER_SUCCESS: {
      const {
        id,
        playerCharacter: { skills: rawSkills, ...playerCharacter },
      } = payload
      const allIds = state.get('allIds')
      const skills = List(rawSkills.map((skill) => fromJS(skill)))
      return state
        .setIn(
          ['byId', id],
          new PlayerCharacterRecord(fromJS({ ...playerCharacter, skills })),
        )
        .set('allIds', fromJS(uniq([...allIds, id])))
    }

    case ADD_FAVOR_SUCCESS: {
      const { favor, playerCharacterId } = payload
      return state.mergeIn(
        ['byId', playerCharacterId, 'favors'],
        fromJS([favor]),
      )
    }

    default: {
      return state
    }
  }
}
