import { fromJS } from 'immutable'

import reducer, { initialState } from '../index'
import {
  getWeapons,
  getWeaponsError,
  getWeaponsSuccess,
  addPlayerCharacterWeapon,
  addPlayerCharacterWeaponError,
  addPlayerCharacterWeaponSuccess,
} from 'actions/weapons'

import { formikActions } from 'mocks'
import { genericError } from 'mocks/errors'
import { playerCharacter1Id } from 'mocks/errors'
import { uiElement, uiElementError, uiElementLoading } from 'mocks/ui'
import {
  weapons,
  newWeaponResponse,
  newPlayerCharacterWeaponResponse,
} from 'mocks/weapons'

describe('weapons ui reducer', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, {})
    expect(result).toEqual(initialState)
  })

  describe('getWeapons', () => {
    describe('getWeapons', () => {
      it('should handle action', () => {
        const result = reducer(initialState, getWeapons())
        const expectedResult = initialState.mergeDeep(fromJS(uiElementLoading))
        expect(result).toEqual(expectedResult)
      })
    })

    describe('getWeaponsSuccess', () => {
      it('should handle action', () => {
        const result = reducer(initialState, getWeaponsSuccess(weapons))
        const expectedResult = initialState.mergeDeep(fromJS(uiElement))
        expect(result).toEqual(expectedResult)
      })
    })

    describe('getWeaponsError', () => {
      it('should handle action', () => {
        const result = reducer(initialState, getWeaponsError(genericError))
        const expectedResult = initialState.mergeDeep(fromJS(uiElementError))
        expect(result).toEqual(expectedResult)
      })
    })
  })

  describe('addPlayerCharacterWeapon', () => {
    describe('addPlayerCharacterWeapon', () => {
      it('should handle action', () => {
        const result = reducer(
          initialState,
          addPlayerCharacterWeapon(
            playerCharacter1Id,
            newWeaponResponse.id,
            formikActions,
          ),
        )
        const expectedResult = initialState.mergeDeep(fromJS(uiElementLoading))
        expect(result).toEqual(expectedResult)
      })
    })

    describe('addPlayerCharacterWeaponSuccess', () => {
      it('should handle action', () => {
        const result = reducer(
          initialState,
          addPlayerCharacterWeaponSuccess(
            playerCharacter1Id,
            newPlayerCharacterWeaponResponse,
          ),
        )
        const expectedResult = initialState.mergeDeep(fromJS(uiElement))
        expect(result).toEqual(expectedResult)
      })
    })

    describe('addPlayerCharacterWeaponError', () => {
      it('should handle action', () => {
        const result = reducer(
          initialState,
          addPlayerCharacterWeaponError(playerCharacter1Id, genericError),
        )
        const expectedResult = initialState.mergeDeep(fromJS(uiElementError))
        expect(result).toEqual(expectedResult)
      })
    })
  })
})
