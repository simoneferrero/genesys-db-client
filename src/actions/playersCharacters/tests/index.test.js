import {
  GET_PLAYERS_CHARACTERS,
  GET_PLAYERS_CHARACTERS_ERROR,
  GET_PLAYERS_CHARACTERS_SUCCESS,
} from '../constants'
import {
  getPlayersCharacters,
  getPlayersCharactersError,
  getPlayersCharactersSuccess,
} from '../index'

import { playersCharacters } from 'mocks/playersCharacters'
import { genericError } from 'mocks/errors'

describe('getPlayersCharacters actions', () => {
  describe('getPlayersCharacters', () => {
    it('should dispatch the correct action', () => {
      const result = getPlayersCharacters()
      const expectedResult = {
        type: GET_PLAYERS_CHARACTERS,
        payload: {},
      }
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getPlayersCharactersSuccess', () => {
    it('should dispatch the correct action', () => {
      const result = getPlayersCharactersSuccess(playersCharacters)
      const expectedResult = {
        type: GET_PLAYERS_CHARACTERS_SUCCESS,
        payload: {
          playersCharacters,
        },
      }
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getPlayersCharactersError', () => {
    it('should dispatch the correct action', () => {
      const result = getPlayersCharactersError(genericError)
      const expectedResult = {
        type: GET_PLAYERS_CHARACTERS_ERROR,
        payload: {
          error: genericError,
        },
      }
      expect(result).toEqual(expectedResult)
    })
  })
})
