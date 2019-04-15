import { List, Map } from 'immutable'

import ReducerRecord from 'reducers/records'

import reducer from '../index'
import initialState from '../initialState'

import {
  getPlayerCharacterSuccess,
  getPlayersCharactersSuccess,
  editPlayerCharacterSuccess,
} from 'actions/playersCharacters'

import {
  playerCharacter1Id,
  playerCharacter1,
  playerCharacter1Response,
  playersCharactersResponse,
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
        getPlayersCharactersSuccess(playersCharactersResponse),
      )
      const expectedResult = new ReducerRecord({
        allIds: List(playersCharactersAllIds),
        byId: Map(playersCharactersById),
      })

      expect(result).toEqual(expectedResult)
    })
  })

  describe('getPlayerCharacterSuccess', () => {
    const id = `${playerCharacter1Id}`
    it('should handle the action correctly from empty store', () => {
      const result = reducer(
        initialState,
        getPlayerCharacterSuccess(id, playerCharacter1Response),
      )
      const expectedResult = new ReducerRecord({
        byId: Map({
          [id]: playerCharacter1,
        }),
        allIds: List([id]),
      })

      expect(result).toEqual(expectedResult)
    })

    it('should handle the action correctly from full store', () => {
      const fullState = reducer(
        initialState,
        getPlayersCharactersSuccess(playersCharactersResponse),
      )
      const modifiedName = 'Modified name'
      const modifiedPlayerCharacter1 = {
        ...playerCharacter1Response,
        name: modifiedName,
      }
      const result = reducer(
        fullState,
        getPlayerCharacterSuccess(id, modifiedPlayerCharacter1),
      )
      const modifiedById = {
        [id]: playerCharacter1.set('name', modifiedName),
      }
      const expectedResult = fullState.mergeIn(['byId'], modifiedById)

      expect(result).toEqual(expectedResult)
    })
  })

  describe('editPlayerCharacterSuccess', () => {
    const id = `${playerCharacter1Id}`
    it('should handle the action correctly', () => {
      const fullState = reducer(
        initialState,
        getPlayersCharactersSuccess(playersCharactersResponse),
      )
      const modifiedName = 'Modified name'
      const modifiedPlayerCharacter1 = {
        ...playerCharacter1Response,
        name: modifiedName,
      }
      const result = reducer(
        fullState,
        editPlayerCharacterSuccess(id, modifiedPlayerCharacter1),
      )
      const modifiedById = {
        [id]: playerCharacter1.set('name', modifiedName),
      }
      const expectedResult = fullState.mergeIn(['byId'], modifiedById)

      expect(result).toEqual(expectedResult)
    })
  })
})
