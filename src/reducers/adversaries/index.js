import { fromJS } from 'immutable'

// import uniq from 'lodash/uniq'

// import { ADD_ADVERSARY_CRITICAL_INJURY_SUCCESS } from 'actions/criticalInjuries/constants'
import {
  GET_ADVERSARIES_SUCCESS,
  // GET_ADVERSARY_SUCCESS,
  // EDIT_ADVERSARY_SUCCESS,
} from 'actions/adversaries/constants'
// import { ADD_ADVERSARY_TALENT_SUCCESS } from 'actions/talents/constants'
// import { ADD_ADVERSARY_WEAPON_SUCCESS } from 'actions/weapons/constants'

import initialState from './initialState'
import AdversaryRecord from './records'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ADVERSARIES_SUCCESS: {
      const { adversaries } = payload
      const adversariesById = adversaries.reduce(
        (result, adversary) => ({
          ...result,
          [adversary.id]: new AdversaryRecord(fromJS(adversary)),
        }),
        {},
      )
      const adversariesAllIds = adversaries.map(({ id }) => `${id}`)
      return state
        .mergeDeepIn(['byId'], fromJS(adversariesById))
        .set('allIds', fromJS(adversariesAllIds))
    }

    // case GET_ADVERSARY_SUCCESS:
    // case EDIT_ADVERSARY_SUCCESS: {
    //   const {
    //     id,
    //     adversary: { skills: rawSkills, ...adversary },
    //   } = payload
    //   const allIds = state.get('allIds')
    //   const skills = List(rawSkills.map((skill) => fromJS(skill)))
    //   return state
    //     .setIn(
    //       ['byId', id],
    //       new AdversaryRecord(fromJS({ ...adversary, skills })),
    //     )
    //     .set('allIds', fromJS(uniq([...allIds, id])))
    // }
    //
    // case ADD_ADVERSARY_CRITICAL_INJURY_SUCCESS: {
    //   const { criticalInjury, adversaryId } = payload
    //
    //   return state.setIn(
    //     [
    //       'byId',
    //       adversaryId,
    //       'critical_injuries',
    //       `${criticalInjury.id}`,
    //     ],
    //     fromJS(criticalInjury),
    //   )
    // }
    //
    // case ADD_ADVERSARY_TALENT_SUCCESS: {
    //   const { talent, adversaryId } = payload
    //
    //   return state.setIn(
    //     ['byId', adversaryId, 'talents', `${talent.id}`],
    //     fromJS(talent),
    //   )
    // }
    //
    // case ADD_ADVERSARY_WEAPON_SUCCESS: {
    //   const { weapon, adversaryId } = payload
    //   return state.mergeIn(
    //     ['byId', adversaryId, 'weapons'],
    //     fromJS([weapon]),
    //   )
    // }

    default: {
      return state
    }
  }
}
