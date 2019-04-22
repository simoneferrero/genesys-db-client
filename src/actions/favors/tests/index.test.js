import { ADD_FAVOR, ADD_FAVOR_ERROR, ADD_FAVOR_SUCCESS } from '../constants'
import { addFavor, addFavorError, addFavorSuccess } from '../index'

import { formikActions } from 'mocks'
import { genericError } from 'mocks/errors'
import { newFavor, newFavorResponse } from 'mocks/favors'
import { playerCharacter1Id } from 'mocks/playersCharacters'

describe('addFavor actions', () => {
  describe('addFavor', () => {
    it('should dispatch the correct action', () => {
      const result = addFavor(playerCharacter1Id, newFavor, formikActions)
      const expectedResult = {
        type: ADD_FAVOR,
        payload: {
          actions: formikActions,
          favor: newFavor,
          playerCharacterId: playerCharacter1Id,
        },
      }
      expect(result).toEqual(expectedResult)
    })
  })

  describe('addFavorSuccess', () => {
    it('should dispatch the correct action', () => {
      const result = addFavorSuccess(playerCharacter1Id, newFavorResponse)
      const expectedResult = {
        type: ADD_FAVOR_SUCCESS,
        payload: {
          favor: newFavorResponse,
          playerCharacterId: playerCharacter1Id,
        },
      }
      expect(result).toEqual(expectedResult)
    })
  })

  describe('addFavorError', () => {
    it('should dispatch the correct action', () => {
      const result = addFavorError(playerCharacter1Id, genericError)
      const expectedResult = {
        type: ADD_FAVOR_ERROR,
        payload: {
          error: genericError,
          playerCharacterId: playerCharacter1Id,
        },
      }
      expect(result).toEqual(expectedResult)
    })
  })
})
