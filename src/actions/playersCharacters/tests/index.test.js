import {
  // getPlayersCharacters
  GET_PLAYERS_CHARACTERS,
  GET_PLAYERS_CHARACTERS_ERROR,
  GET_PLAYERS_CHARACTERS_SUCCESS,
  // getPlayerCharacter
  GET_PLAYER_CHARACTER,
  GET_PLAYER_CHARACTER_ERROR,
  GET_PLAYER_CHARACTER_SUCCESS,
  // editPlayerCharacter
  EDIT_PLAYER_CHARACTER,
  EDIT_PLAYER_CHARACTER_ERROR,
  EDIT_PLAYER_CHARACTER_SUCCESS,
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
  // editPlayerCharacter
  editPlayerCharacter,
  editPlayerCharacterError,
  editPlayerCharacterSuccess,
} from '../index'

import { formikActions } from 'mocks'
import {
  playerCharacter1Id,
  playerCharacterSummary1Augmented,
  playerCharacterSummary1Response,
  playersCharactersResponse,
} from 'mocks/playersCharacters'
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
        const result = getPlayersCharactersSuccess(playersCharactersResponse)
        const expectedResult = {
          type: GET_PLAYERS_CHARACTERS_SUCCESS,
          payload: {
            playersCharacters: playersCharactersResponse,
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
    // TODO: change mocks to full player character
    describe('getPlayerCharacter', () => {
      it('should dispatch the correct action', () => {
        const result = getPlayerCharacter(playerCharacter1Id)
        const expectedResult = {
          type: GET_PLAYER_CHARACTER,
          payload: {
            id: playerCharacter1Id,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })

    describe('getPlayerCharacterSuccess', () => {
      it('should dispatch the correct action', () => {
        const result = getPlayerCharacterSuccess(
          playerCharacter1Id,
          playerCharacterSummary1Response,
        )
        const expectedResult = {
          type: GET_PLAYER_CHARACTER_SUCCESS,
          payload: {
            id: playerCharacter1Id,
            playerCharacter: playerCharacterSummary1Response,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })

    describe('getPlayerCharacterError', () => {
      it('should dispatch the correct action', () => {
        const result = getPlayerCharacterError(playerCharacter1Id, genericError)
        const expectedResult = {
          type: GET_PLAYER_CHARACTER_ERROR,
          payload: {
            error: genericError,
            id: playerCharacter1Id,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })
  })

  describe('editPlayerCharacter', () => {
    // TODO: change mocks to full player character
    describe('editPlayerCharacter', () => {
      it('should dispatch the correct action', () => {
        const values = playerCharacterSummary1Augmented.toJS()
        const result = editPlayerCharacter(
          playerCharacter1Id,
          values,
          formikActions,
        )
        const expectedResult = {
          type: EDIT_PLAYER_CHARACTER,
          payload: {
            actions: formikActions,
            id: playerCharacter1Id,
            values,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })

    describe('editPlayerCharacterSuccess', () => {
      it('should dispatch the correct action', () => {
        const result = editPlayerCharacterSuccess(
          playerCharacter1Id,
          playerCharacterSummary1Response,
        )
        const expectedResult = {
          type: EDIT_PLAYER_CHARACTER_SUCCESS,
          payload: {
            id: playerCharacter1Id,
            playerCharacter: playerCharacterSummary1Response,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })

    describe('editPlayerCharacterError', () => {
      it('should dispatch the correct action', () => {
        const result = editPlayerCharacterError(
          playerCharacter1Id,
          genericError,
        )
        const expectedResult = {
          type: EDIT_PLAYER_CHARACTER_ERROR,
          payload: {
            error: genericError,
            id: playerCharacter1Id,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })
  })
})
