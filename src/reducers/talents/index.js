import { fromJS } from 'immutable'

import {
  GET_TALENTS_SUCCESS,
  ADD_TALENT_SUCCESS,
} from 'actions/talents/constants'

import initialState from './initialState'
import TalentRecord from './records'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TALENTS_SUCCESS: {
      const { talents } = payload
      const talentsById = talents.reduce(
        (result, talent) => ({
          ...result,
          [talent.id]: new TalentRecord(talent),
        }),
        {},
      )
      const talentsAllIds = talents.map(({ id }) => id)
      return state
        .set('byId', fromJS(talentsById))
        .set('allIds', fromJS(talentsAllIds))
    }

    case ADD_TALENT_SUCCESS: {
      const { talent } = payload
      return state
        .setIn(['byId', `${talent.id}`], new TalentRecord(talent))
        .mergeIn(['allIds'], fromJS([talent.id]))
    }

    default: {
      return state
    }
  }
}
