import {
  GET_WEAPONS,
  GET_WEAPONS_ERROR,
  GET_WEAPONS_SUCCESS,
  ADD_WEAPON,
  ADD_WEAPON_ERROR,
  ADD_WEAPON_SUCCESS,
} from '../constants'
import {
  getWeapons,
  getWeaponsError,
  getWeaponsSuccess,
  addWeapon,
  addWeaponError,
  addWeaponSuccess,
} from '../index'

import { weapons, newWeaponResponse } from 'mocks/weapons'
import { formikActions, genericError } from 'mocks/errors'

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
})
