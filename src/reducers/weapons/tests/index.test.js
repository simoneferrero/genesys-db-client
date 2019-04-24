import { List, Map } from 'immutable'

import ReducerRecord from 'reducers/records'

import reducer from '../index'
import initialState from '../initialState'
import WeaponRecord from '../records'

import { getWeaponsSuccess, addWeaponSuccess } from 'actions/weapons'

import {
  newWeaponResponse,
  weapons,
  weaponsById,
  weaponsAllIds,
} from 'mocks/weapons'

describe('weapons reducer', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, {
      type: '',
      payload: {},
    })
    expect(result).toEqual(initialState)
  })

  describe('getWeaponsSuccess', () => {
    it('should handle the action correctly', () => {
      const result = reducer(initialState, getWeaponsSuccess(weapons))
      const expectedResult = new ReducerRecord({
        allIds: List(weaponsAllIds),
        byId: Map(weaponsById),
      })

      expect(result).toEqual(expectedResult)
    })
  })

  describe('addWeaponSuccess', () => {
    it('should handle the action correctly', () => {
      const modifiedState = reducer(initialState, getWeaponsSuccess(weapons))
      const result = reducer(modifiedState, addWeaponSuccess(newWeaponResponse))
      const expectedResult = new ReducerRecord({
        allIds: List([...weaponsAllIds, newWeaponResponse.id]),
        byId: Map({
          ...weaponsById,
          [newWeaponResponse.id]: new WeaponRecord(newWeaponResponse),
        }),
      })

      expect(result).toEqual(expectedResult)
    })
  })
})
