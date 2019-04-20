import { fromJS } from 'immutable'

import { GET_FACTIONS_SUCCESS } from 'actions/factions/constants'

import initialState from './initialState'
import FactionRecord from './records'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_FACTIONS_SUCCESS: {
      const { factions } = payload
      const factionsById = factions.reduce(
        (result, faction) => ({
          ...result,
          [faction.id]: new FactionRecord(faction),
        }),
        {},
      )
      const factionsAllIds = factions.map(({ id }) => id)
      return state
        .set('byId', fromJS(factionsById))
        .set('allIds', fromJS(factionsAllIds))
    }

    default: {
      return state
    }
  }
}
