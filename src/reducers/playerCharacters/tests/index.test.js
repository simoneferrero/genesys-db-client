import { fromJS } from 'immutable'

import reducer from '../index'
import initialState from '../initialState'

import { getPlayerCharactersSuccess } from 'actions/playerCharacters'

import {
  playerCharacters,
  playerCharactersById,
  playerCharactersAllIds,
} from 'mocks/playerCharacters'

describe('playerCharacters reducer', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, {
      type: '',
      payload: {},
    })
    expect(result).toEqual(initialState)
  })

  describe('getPlayerCharactersSuccess', () => {
    it('should handle the action correctly', () => {
      const result = reducer(
        initialState,
        getPlayerCharactersSuccess(playerCharacters),
      )
      const expectedResult = fromJS({
        byId: playerCharactersById,
        allIds: playerCharactersAllIds,
      })

      expect(result).toEqual(expectedResult)
    })
  })
})
