import { fromJS } from 'immutable'

import { GET_CRITICAL_INJURIES_SUCCESS } from 'actions/criticalInjuries/constants'

import initialState from './initialState'
import CriticalInjuryRecord from './records'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CRITICAL_INJURIES_SUCCESS: {
      const { criticalInjuries } = payload
      const criticalInjuriesById = criticalInjuries.reduce(
        (result, criticalInjury) => ({
          ...result,
          [criticalInjury.id]: new CriticalInjuryRecord(criticalInjury),
        }),
        {},
      )
      const criticalInjuriesAllIds = criticalInjuries.map(({ id }) => id)
      return state
        .set('byId', fromJS(criticalInjuriesById))
        .set('allIds', fromJS(criticalInjuriesAllIds))
    }

    default: {
      return state
    }
  }
}
