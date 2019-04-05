import { fromJS } from 'immutable'

import { GET_CAREERS_SUCCESS } from 'actions/careers/constants'

import initialState from './initialState'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CAREERS_SUCCESS: {
      const { careers } = payload
      const careersById = careers.reduce(
        (result, career) => ({
          ...result,
          [career.id]: career,
        }),
        {},
      )
      const careersAllIds = careers.map(({ id }) => id)
      return state
        .set('byId', fromJS(careersById))
        .set('allIds', fromJS(careersAllIds))
    }

    default: {
      return state
    }
  }
}
