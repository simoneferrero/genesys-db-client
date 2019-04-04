import { fromJS } from 'immutable'

import reducer from '../index'
import initialState from '../initialState'

import { getPlayersCharactersSuccess } from 'actions/playersCharacters'

import {
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
})
