import { fromJS } from 'immutable'

import reducer, { initialState } from '../index'
import {
  // getPlayersCharacters
  getPlayersCharacters,
  getPlayersCharactersError,
  getPlayersCharactersSuccess,
  // getPlayerCharacter
  getPlayerCharacter,
  getPlayerCharacterError,
  getPlayerCharacterSuccess,
} from 'actions/playersCharacters'

import { playerCharacter1, playersCharacters } from 'mocks/playersCharacters'
import { genericError } from 'mocks/errors'
import { uiElement, uiElementError, uiElementLoading } from 'mocks/ui'

describe('playersCharacters ui reducer', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, {})
    expect(result).toEqual(initialState)
  })

  describe('getPlayersCharacters', () => {
    describe('getPlayersCharacters', () => {
      it('should handle action', () => {
        const result = reducer(initialState, getPlayersCharacters())
        const expectedResult = initialState.mergeDeep(fromJS(uiElementLoading))
        expect(result).toEqual(expectedResult)
      })
    })

    describe('getPlayersCharactersSuccess', () => {
      it('should handle action', () => {
        const result = reducer(
          initialState,
          getPlayersCharactersSuccess(playersCharacters),
        )
        const expectedResult = initialState.mergeDeep(fromJS(uiElement))
        expect(result).toEqual(expectedResult)
      })
    })

    describe('getPlayersCharactersError', () => {
      it('should handle action', () => {
        const result = reducer(
          initialState,
          getPlayersCharactersError(genericError),
        )
        const expectedResult = initialState.mergeDeep(fromJS(uiElementError))
        expect(result).toEqual(expectedResult)
      })
    })
  })

  describe('getPlayerCharacter', () => {
    const { id } = playerCharacter1
    describe('getPlayerCharacter', () => {
      it('should handle action', () => {
        const result = reducer(initialState, getPlayerCharacter(id))
        const expectedResult = initialState.mergeDeep(fromJS(uiElementLoading))
        expect(result).toEqual(expectedResult)
      })
    })

    describe('getPlayerCharacterSuccess', () => {
      it('should handle action', () => {
        const result = reducer(
          initialState,
          getPlayerCharacterSuccess(id, playerCharacter1),
        )
        const expectedResult = initialState.mergeDeep(fromJS(uiElement))
        expect(result).toEqual(expectedResult)
      })
    })

    describe('getPlayerCharacterError', () => {
      it('should handle action', () => {
        const result = reducer(
          initialState,
          getPlayerCharacterError(id, genericError),
        )
        const expectedResult = initialState.mergeDeep(fromJS(uiElementError))
        expect(result).toEqual(expectedResult)
      })
    })
  })
})
