import {
  GET_PLAYER_CHARACTERS,
  GET_PLAYER_CHARACTERS_ERROR,
  GET_PLAYER_CHARACTERS_SUCCESS,
} from '../constants'
import {
  getPlayerCharacters,
  getPlayerCharactersError,
  getPlayerCharactersSuccess,
} from '../index'

import { playerCharacters } from 'mocks/playerCharacters'
import { genericError } from 'mocks/errors'

describe('getPlayerCharacters actions', () => {
  describe('getPlayerCharacters', () => {
    it('should dispatch the correct action', () => {
      const result = getPlayerCharacters()
      const expectedResult = {
        type: GET_PLAYER_CHARACTERS,
        payload: {},
      }
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getPlayerCharactersSuccess', () => {
    it('should dispatch the correct action', () => {
      const result = getPlayerCharactersSuccess(playerCharacters)
      const expectedResult = {
        type: GET_PLAYER_CHARACTERS_SUCCESS,
        payload: {
          playerCharacters,
        },
      }
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getPlayerCharactersError', () => {
    it('should dispatch the correct action', () => {
      const result = getPlayerCharactersError(genericError)
      const expectedResult = {
        type: GET_PLAYER_CHARACTERS_ERROR,
        payload: {
          error: genericError,
        },
      }
      expect(result).toEqual(expectedResult)
    })
  })
})
