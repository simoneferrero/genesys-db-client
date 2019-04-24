import {
  GET_WEAPONS,
  GET_WEAPONS_ERROR,
  GET_WEAPONS_SUCCESS,
  ADD_WEAPON,
  ADD_WEAPON_ERROR,
  ADD_WEAPON_SUCCESS,
} from './constants'

// Get weapons
export const getWeapons = () => ({
  type: GET_WEAPONS,
  payload: {},
})

export const getWeaponsSuccess = (weapons) => ({
  type: GET_WEAPONS_SUCCESS,
  payload: {
    weapons,
  },
})

export const getWeaponsError = (error) => ({
  type: GET_WEAPONS_ERROR,
  payload: {
    error,
  },
})

// Add weapon
export const addWeapon = (weapon, actions) => ({
  type: ADD_WEAPON,
  payload: {
    actions,
    weapon,
  },
})

export const addWeaponSuccess = (weapon) => ({
  type: ADD_WEAPON_SUCCESS,
  payload: {
    weapon,
  },
})

export const addWeaponError = (error) => ({
  type: ADD_WEAPON_ERROR,
  payload: {
    error,
  },
})
