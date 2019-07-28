// import { fromJS, List, Map } from 'immutable'

import ReducerRecord from 'reducers/records'

import reducer from '../index'
import initialState from '../initialState'

// import { addPlayerCharacterCriticalInjurySuccess } from 'actions/criticalInjuries'
import {
  // getPlayerCharacterSuccess,
  getAdversariesSuccess,
  // editPlayerCharacterSuccess,
} from 'actions/adversaries'
// import { addPlayerCharacterTalentSuccess } from 'actions/talents'
// import { addPlayerCharacterWeaponSuccess } from 'actions/weapons'

// import { newPlayerCharacterCriticalInjuryResponse } from 'mocks/criticalInjuries'
import {
  // adversary1,
  // adversary1CriticalInjuries,
  // adversary1Favors,
  // adversary1Id,
  // adversary1Response,
  // adversary1Talents,
  // adversary1Weapons,
  adversariesAllIds,
  adversariesById,
  adversariesResponse,
} from 'mocks/adversaries'
// import { newCharacterTalentResponse } from 'mocks/talents'
// import { newPlayerCharacterWeaponResponse } from 'mocks/weapons'

describe('adversaries reducer', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, {
      type: '',
      payload: {},
    })
    expect(result).toEqual(initialState)
  })

  describe('getAdversariesSuccess', () => {
    it('should handle the action correctly', () => {
      const result = reducer(
        initialState,
        getAdversariesSuccess(adversariesResponse),
      )
      const expectedResult = new ReducerRecord({
        allIds: adversariesAllIds,
        byId: adversariesById,
      })

      expect(result).toEqual(expectedResult)
    })
  })

  // describe('getPlayerCharacterSuccess', () => {
  //   const id = `${adversary1Id}`
  //   it('should handle the action correctly from empty store', () => {
  //     const result = reducer(
  //       initialState,
  //       getPlayerCharacterSuccess(id, adversary1Response),
  //     )
  //     const expectedResult = new ReducerRecord({
  //       byId: Map({
  //         [id]: adversary1,
  //       }),
  //       allIds: List([id]),
  //     })
  //
  //     expect(result).toEqual(expectedResult)
  //   })
  //
  //   it('should handle the action correctly from full store', () => {
  //     const fullState = reducer(
  //       initialState,
  //       getAdversariesSuccess(adversariesResponse),
  //     )
  //     const modifiedName = 'Modified name'
  //     const modifiedPlayerCharacter1 = {
  //       ...adversary1Response,
  //       name: modifiedName,
  //     }
  //     const result = reducer(
  //       fullState,
  //       getPlayerCharacterSuccess(id, modifiedPlayerCharacter1),
  //     )
  //     const modifiedById = {
  //       [id]: adversary1.set('name', modifiedName),
  //     }
  //     const expectedResult = fullState.mergeIn(['byId'], modifiedById)
  //
  //     expect(result).toEqual(expectedResult)
  //   })
  // })
  //
  // describe('editPlayerCharacterSuccess', () => {
  //   const id = `${adversary1Id}`
  //   it('should handle the action correctly', () => {
  //     const fullState = reducer(
  //       initialState,
  //       getAdversariesSuccess(adversariesResponse),
  //     )
  //     const modifiedName = 'Modified name'
  //     const modifiedPlayerCharacter1 = {
  //       ...adversary1Response,
  //       name: modifiedName,
  //     }
  //     const result = reducer(
  //       fullState,
  //       editPlayerCharacterSuccess(id, modifiedPlayerCharacter1),
  //     )
  //     const modifiedById = {
  //       [id]: adversary1.set('name', modifiedName),
  //     }
  //     const expectedResult = fullState.mergeIn(['byId'], modifiedById)
  //
  //     expect(result).toEqual(expectedResult)
  //   })
  // })
  //
  // describe('addPlayerCharacterCriticalInjurySuccess', () => {
  //   const id = `${adversary1Id}`
  //
  //   it('should handle the action correctly', () => {
  //     const fullState = reducer(
  //       initialState,
  //       getPlayerCharacterSuccess(id, adversary1Response),
  //     )
  //     const result = reducer(
  //       fullState,
  //       addPlayerCharacterCriticalInjurySuccess(
  //         id,
  //         newPlayerCharacterCriticalInjuryResponse,
  //       ),
  //     )
  //     const expectedResult = fullState.setIn(
  //       ['byId', id, 'critical_injuries'],
  //       fromJS({
  //         ...adversary1CriticalInjuries,
  //         [`${
  //           newPlayerCharacterCriticalInjuryResponse.id
  //         }`]: newPlayerCharacterCriticalInjuryResponse,
  //       }),
  //     )
  //
  //     expect(result).toEqual(expectedResult)
  //   })
  // })
  //
  // describe('addPlayerCharacterTalentSuccess', () => {
  //   const id = `${adversary1Id}`
  //
  //   it('should handle the action correctly', () => {
  //     const fullState = reducer(
  //       initialState,
  //       getPlayerCharacterSuccess(id, adversary1Response),
  //     )
  //     const result = reducer(
  //       fullState,
  //       addPlayerCharacterTalentSuccess(id, newCharacterTalentResponse),
  //     )
  //     const expectedResult = fullState.setIn(
  //       ['byId', id, 'talents'],
  //       fromJS({
  //         ...adversary1Talents,
  //         [`${
  //           newCharacterTalentResponse.id
  //         }`]: newCharacterTalentResponse,
  //       }),
  //     )
  //
  //     expect(result).toEqual(expectedResult)
  //   })
  // })
  //
  // describe('addFavorSuccess', () => {
  //   const id = `${adversary1Id}`
  //
  //   it('should handle the action correctly', () => {
  //     const fullState = reducer(
  //       initialState,
  //       getPlayerCharacterSuccess(id, adversary1Response),
  //     )
  //     const result = reducer(fullState, addFavorSuccess(id, newFavorResponse))
  //     const expectedResult = fullState.setIn(
  //       ['byId', id, 'favors'],
  //       fromJS([...adversary1Favors, newFavorResponse]),
  //     )
  //
  //     expect(result).toEqual(expectedResult)
  //   })
  // })
  //
  // describe('addPlayerCharacterWeaponSuccess', () => {
  //   const id = `${adversary1Id}`
  //
  //   it('should handle the action correctly', () => {
  //     const fullState = reducer(
  //       initialState,
  //       getPlayerCharacterSuccess(id, adversary1Response),
  //     )
  //     const result = reducer(
  //       fullState,
  //       addPlayerCharacterWeaponSuccess(id, newPlayerCharacterWeaponResponse),
  //     )
  //     const expectedResult = fullState.setIn(
  //       ['byId', id, 'weapons'],
  //       fromJS([...adversary1Weapons, newPlayerCharacterWeaponResponse]),
  //     )
  //
  //     expect(result).toEqual(expectedResult)
  //   })
  // })
})
