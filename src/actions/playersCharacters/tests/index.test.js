import {
  // getPlayersCharacters
  GET_PLAYERS_CHARACTERS,
  GET_PLAYERS_CHARACTERS_ERROR,
  GET_PLAYERS_CHARACTERS_SUCCESS,
  // getPlayerCharacter
  GET_PLAYER_CHARACTER,
  GET_PLAYER_CHARACTER_ERROR,
  GET_PLAYER_CHARACTER_SUCCESS,
} from '../constants'
import {
  // getPlayersCharacters
  getPlayersCharacters,
  getPlayersCharactersError,
  getPlayersCharactersSuccess,
  // getPlayerCharacter
  getPlayerCharacter,
  getPlayerCharacterError,
  getPlayerCharacterSuccess,
} from '../index'

import { playerCharacter1, playersCharacters } from 'mocks/playersCharacters'
import { genericError } from 'mocks/errors'

describe('playersCharacters actions', () => {
  describe('getPlayersCharacters', () => {
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

  describe('getPlayerCharacter', () => {
    const { id } = playerCharacter1
    describe('getPlayerCharacter', () => {
      it('should dispatch the correct action', () => {
        const result = getPlayerCharacter(id)
        const expectedResult = {
          type: GET_PLAYER_CHARACTER,
          payload: {
            id: id,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })

    describe('getPlayerCharacterSuccess', () => {
      it('should dispatch the correct action', () => {
        const result = getPlayerCharacterSuccess(id, playerCharacter1)
        const expectedResult = {
          type: GET_PLAYER_CHARACTER_SUCCESS,
          payload: {
            id,
            playerCharacter: playerCharacter1,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })

    describe('getPlayerCharacterError', () => {
      it('should dispatch the correct action', () => {
        const result = getPlayerCharacterError(id, genericError)
        const expectedResult = {
          type: GET_PLAYER_CHARACTER_ERROR,
          payload: {
            error: genericError,
            id,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })
  })
})
