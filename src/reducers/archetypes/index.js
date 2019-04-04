import { fromJS } from 'immutable'

import { GET_ARCHETYPES_SUCCESS } from 'actions/archetypes/constants'

import initialState from './initialState'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ARCHETYPES_SUCCESS: {
      const { archetypes } = payload
      const archetypesById = archetypes.reduce(
        (result, archetype) => ({
          ...result,
          [archetype.id]: archetype,
        }),
        {},
      )
      const archetypesAllIds = archetypes.map(({ id }) => id)
      return state
        .set('byId', fromJS(archetypesById))
        .set('allIds', fromJS(archetypesAllIds))
    }

    default: {
      return state
    }
  }
}
