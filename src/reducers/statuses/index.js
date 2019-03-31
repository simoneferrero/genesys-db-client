import { fromJS } from 'immutable'

import {
  GET_TUBE_STATUSES,
  GET_TUBE_STATUSES_SUCCESS,
  GET_TUBE_STATUSES_ERROR,
} from 'actions/getTubeStatuses/constants'

import initialState from './initialState'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TUBE_STATUSES: {
      // This is used in more complex apps to show a loader
      return state
    }

    case GET_TUBE_STATUSES_SUCCESS: {
      const { statuses } = payload
      const statusesById = statuses.reduce(
        (result, currentStatus) => ({
          ...result,
          [currentStatus.id]: currentStatus,
        }),
        {},
      )
      const statusesAllIds = statuses.map(({ id }) => id)
      return state
        .set('byId', fromJS(statusesById))
        .set('allIds', fromJS(statusesAllIds))
    }

    case GET_TUBE_STATUSES_ERROR: {
      // This is used in more complex apps to show an error message
      return state
    }

    default: {
      return state
    }
  }
}
