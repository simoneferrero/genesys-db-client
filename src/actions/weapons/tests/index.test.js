import {
  GET_WEAPONS,
  GET_WEAPONS_ERROR,
  GET_WEAPONS_SUCCESS,
  ADD_WEAPON,
  ADD_WEAPON_ERROR,
  ADD_WEAPON_SUCCESS,
  ADD_PLAYER_CHARACTER_WEAPON,
  ADD_PLAYER_CHARACTER_WEAPON_ERROR,
  ADD_PLAYER_CHARACTER_WEAPON_SUCCESS,
} from '../constants'
import {
  getWeapons,
  getWeaponsError,
  getWeaponsSuccess,
  addWeapon,
  addWeaponError,
  addWeaponSuccess,
  addPlayerCharacterWeapon,
  addPlayerCharacterWeaponError,
  addPlayerCharacterWeaponSuccess,
} from '../index'

import { formikActions, genericError } from 'mocks/errors'
import { playerCharacter1Id } from 'mocks/playersCharacters'
import {
  weapons,
  newPlayerCharacterWeaponResponse,
  newWeaponResponse,
} from 'mocks/weapons'

describe('weapons actions', () => {
  describe('getWeapons', () => {
    describe('getWeapons', () => {
      it('should dispatch the correct action', () => {
        const result = getWeapons()
        const expectedResult = {
          type: GET_WEAPONS,
          payload: {},
        }
        expect(result).toEqual(expectedResult)
      })
    })

    describe('getWeaponsSuccess', () => {
      it('should dispatch the correct action', () => {
        const result = getWeaponsSuccess(weapons)
        const expectedResult = {
          type: GET_WEAPONS_SUCCESS,
          payload: {
            weapons,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })

    describe('getWeaponsError', () => {
      it('should dispatch the correct action', () => {
        const result = getWeaponsError(genericError)
        const expectedResult = {
          type: GET_WEAPONS_ERROR,
          payload: {
            error: genericError,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })
  })

  describe('addWeapon', () => {
    describe('addWeapon', () => {
      it('should dispatch the correct action', () => {
        const result = addWeapon(newWeaponResponse, formikActions)
        const expectedResult = {
          type: ADD_WEAPON,
          payload: {
            actions: formikActions,
            weapon: newWeaponResponse,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })

    describe('addWeaponSuccess', () => {
      it('should dispatch the correct action', () => {
        const result = addWeaponSuccess(newWeaponResponse)
        const expectedResult = {
          type: ADD_WEAPON_SUCCESS,
          payload: {
            weapon: newWeaponResponse,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })

    describe('addWeaponError', () => {
      it('should dispatch the correct action', () => {
        const result = addWeaponError(genericError)
        const expectedResult = {
          type: ADD_WEAPON_ERROR,
          payload: {
            error: genericError,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })
  })

  describe('addPlayerCharacterWeapon', () => {
    describe('addPlayerCharacterWeapon', () => {
      it('should dispatch the correct action', () => {
        const result = addPlayerCharacterWeapon(
          playerCharacter1Id,
          newWeaponResponse.id,
          formikActions,
        )
        const expectedResult = {
          type: ADD_PLAYER_CHARACTER_WEAPON,
          payload: {
            actions: formikActions,
            playerCharacterId: playerCharacter1Id,
            weaponId: newWeaponResponse.id,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })

    describe('addPlayerCharacterWeaponSuccess', () => {
      it('should dispatch the correct action', () => {
        const result = addPlayerCharacterWeaponSuccess(
          playerCharacter1Id,
          newPlayerCharacterWeaponResponse,
        )
        const expectedResult = {
          type: ADD_PLAYER_CHARACTER_WEAPON_SUCCESS,
          payload: {
            playerCharacterId: playerCharacter1Id,
            weapon: newPlayerCharacterWeaponResponse,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })

    describe('addPlayerCharacterWeaponError', () => {
      it('should dispatch the correct action', () => {
        const result = addPlayerCharacterWeaponError(
          playerCharacter1Id,
          genericError,
        )
        const expectedResult = {
          type: ADD_PLAYER_CHARACTER_WEAPON_ERROR,
          payload: {
            playerCharacterId: playerCharacter1Id,
            error: genericError,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })
  })
})
