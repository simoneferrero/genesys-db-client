import { fromJS, List, Map } from 'immutable'

import ReducerRecord from 'reducers/records'

import reducer from '../index'
import initialState from '../initialState'

import { addPlayerCharacterCriticalInjurySuccess } from 'actions/criticalInjuries'
import { addFavorSuccess } from 'actions/favors'
import {
  getPlayerCharacterSuccess,
  getPlayersCharactersSuccess,
  editPlayerCharacterSuccess,
} from 'actions/playersCharacters'
import { addPlayerCharacterWeaponSuccess } from 'actions/weapons'

import { newPlayerCharacterCriticalInjuryResponse } from 'mocks/criticalInjuries'
import { newFavorResponse } from 'mocks/favors'
import {
  playerCharacter1,
  playerCharacter1CriticalInjuries,
  playerCharacter1Favors,
  playerCharacter1Id,
  playerCharacter1Response,
  playerCharacter1Weapons,
  playersCharactersAllIds,
  playersCharactersById,
  playersCharactersResponse,
} from 'mocks/playersCharacters'
import { newPlayerCharacterWeaponResponse } from 'mocks/weapons'

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
        allIds: playersCharactersAllIds,
        byId: playersCharactersById,
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

  describe('addPlayerCharacterCriticalInjurySuccess', () => {
    const id = `${playerCharacter1Id}`

    it('should handle the action correctly', () => {
      const fullState = reducer(
        initialState,
        getPlayerCharacterSuccess(id, playerCharacter1Response),
      )
      const result = reducer(
        fullState,
        addPlayerCharacterCriticalInjurySuccess(
          id,
          newPlayerCharacterCriticalInjuryResponse,
        ),
      )
      const expectedResult = fullState.setIn(
        ['byId', id, 'critical_injuries'],
        fromJS({
          ...playerCharacter1CriticalInjuries,
          [`${
            newPlayerCharacterCriticalInjuryResponse.id
          }`]: newPlayerCharacterCriticalInjuryResponse,
        }),
      )

      expect(result).toEqual(expectedResult)
    })
  })

  describe('addFavorSuccess', () => {
    const id = `${playerCharacter1Id}`

    it('should handle the action correctly', () => {
      const fullState = reducer(
        initialState,
        getPlayerCharacterSuccess(id, playerCharacter1Response),
      )
      const result = reducer(fullState, addFavorSuccess(id, newFavorResponse))
      const expectedResult = fullState.setIn(
        ['byId', id, 'favors'],
        fromJS([...playerCharacter1Favors, newFavorResponse]),
      )

      expect(result).toEqual(expectedResult)
    })
  })

  describe('addPlayerCharacterWeaponSuccess', () => {
    const id = `${playerCharacter1Id}`

    it('should handle the action correctly', () => {
      const fullState = reducer(
        initialState,
        getPlayerCharacterSuccess(id, playerCharacter1Response),
      )
      const result = reducer(
        fullState,
        addPlayerCharacterWeaponSuccess(id, newPlayerCharacterWeaponResponse),
      )
      const expectedResult = fullState.setIn(
        ['byId', id, 'weapons'],
        fromJS([...playerCharacter1Weapons, newPlayerCharacterWeaponResponse]),
      )

      expect(result).toEqual(expectedResult)
    })
  })
})
