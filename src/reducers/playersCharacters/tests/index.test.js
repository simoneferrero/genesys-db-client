import { fromJS } from 'immutable'

import reducer from '../index'
import initialState from '../initialState'

import {
  getPlayerCharacterSuccess,
  getPlayersCharactersSuccess,
} from 'actions/playersCharacters'

import {
  playerCharacter1,
  playersCharacters,
  playersCharactersById,
  playersCharactersAllIds,
} from 'mocks/playersCharacters'

describe('playersCharacters reducer', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, {
      type: '',
      payload: {},
    })
    expect(result).toEqual(initialState)
  })

  describe('getPlayersCharactersSuccess', () => {
    it('should handle the action correctly', () => {
      const result = reducer(
        initialState,
        getPlayersCharactersSuccess(playersCharacters),
      )
      const expectedResult = fromJS({
        byId: playersCharactersById,
        allIds: playersCharactersAllIds,
      })

      expect(result).toEqual(expectedResult)
    })
  })

  describe('getPlayerCharacterSuccess', () => {
    const { id } = playerCharacter1

    it('should handle the action correctly from empty store', () => {
      const result = reducer(
        initialState,
        getPlayerCharacterSuccess(id, playerCharacter1),
      )
      const expectedResult = fromJS({
        byId: {
          [id]: playerCharacter1,
        },
        allIds: [id],
      })

      expect(result).toEqual(expectedResult)
    })

    it('should handle the action correctly from full store', () => {
      const fullState = reducer(
        initialState,
        getPlayersCharactersSuccess(playersCharacters),
      )
      const modifiedPlayerCharacter1 = {
        ...playerCharacter1,
        name: 'Modified Name',
      }
      const result = reducer(
        fullState,
        getPlayerCharacterSuccess(id, modifiedPlayerCharacter1),
      )
      const expectedResult = fromJS({
        byId: {
          ...playersCharactersById,
          [id]: modifiedPlayerCharacter1,
        },
        allIds: playersCharactersAllIds,
      })

      expect(result).toEqual(expectedResult)
    })
  })
})
