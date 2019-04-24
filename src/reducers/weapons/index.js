import { fromJS } from 'immutable'

import {
  GET_WEAPONS_SUCCESS,
  ADD_WEAPON_SUCCESS,
} from 'actions/weapons/constants'

import initialState from './initialState'
import WeaponRecord from './records'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_WEAPONS_SUCCESS: {
      const { weapons } = payload
      const weaponsById = weapons.reduce(
        (result, weapon) => ({
          ...result,
          [weapon.id]: new WeaponRecord(weapon),
        }),
        {},
      )
      const weaponsAllIds = weapons.map(({ id }) => id)
      return state
        .set('byId', fromJS(weaponsById))
        .set('allIds', fromJS(weaponsAllIds))
    }

    case ADD_WEAPON_SUCCESS: {
      const { weapon } = payload
      return state
        .setIn(['byId', `${weapon.id}`], new WeaponRecord(weapon))
        .mergeIn(['allIds'], fromJS([weapon.id]))
    }

    default: {
      return state
    }
  }
}
