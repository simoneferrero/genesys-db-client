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

// Add player character weapon
export const addPlayerCharacterWeapon = (
  playerCharacterId,
  weaponId,
  actions,
) => ({
  type: ADD_PLAYER_CHARACTER_WEAPON,
  payload: {
    actions,
    playerCharacterId,
    weaponId,
  },
})

export const addPlayerCharacterWeaponSuccess = (playerCharacterId, weapon) => ({
  type: ADD_PLAYER_CHARACTER_WEAPON_SUCCESS,
  payload: {
    playerCharacterId,
    weapon,
  },
})

export const addPlayerCharacterWeaponError = (playerCharacterId, error) => ({
  type: ADD_PLAYER_CHARACTER_WEAPON_ERROR,
  payload: {
    error,
    playerCharacterId,
  },
})
