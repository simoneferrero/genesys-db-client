import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

// import keyBy from 'lodash/keyBy'

import rootSaga, {
  // getAdversaries
  getAdversariesSaga,
  getAdversariesWatcher,
  // // getAdversary
  // getAdversarySaga,
  // getAdversaryWatcher,
  // // editAdversary
  // editAdversarySaga,
  // editAdversaryWatcher,
} from '../index'

import { logout } from 'actions/authentication'
import {
  // getAdversaries
  GET_ADVERSARIES,
  // // getAdversary
  // GET_ADVERSARY,
  // // editAdversary
  // EDIT_ADVERSARY,
} from 'actions/adversaries/constants'
import {
  // getAdversaries
  getAdversaries,
  getAdversariesError,
  getAdversariesSuccess,
  // // getAdversary
  // getAdversary,
  // getAdversaryError,
  // getAdversarySuccess,
  // // editAdversary
  // editAdversary,
  // editAdversaryError,
  // editAdversarySuccess,
} from 'actions/adversaries'

import { authenticationSelector } from 'reducers/authentication/selectors'
import AuthenticationRecord from 'reducers/authentication/records'

import { apiPath } from 'mocks'
import { authInfoResponse } from 'mocks/authentication'
// import { criticalInjury1, criticalInjury2 } from 'mocks/criticalInjuries'
import { genericError } from 'mocks/errors'
import {
  // adversary1Id,
  // adversary1Augmented,
  // adversary1Response,
  // adversary1Talents,
  adversariesResponse,
} from 'mocks/adversaries'
// import { weapon1, weapon2 } from 'mocks/weapons'

describe('adversaries sagas', () => {
  describe('getAdversaries', () => {
    const action = getAdversaries()

    describe('getAdversariesSaga', () => {
      let generator

      beforeEach(() => {
        generator = getAdversariesSaga(action)

        const selectAuthenticationDescriptor = generator.next().value
        const expectedSelectAuthenticationDescriptor = select(
          authenticationSelector,
        )
        expect(selectAuthenticationDescriptor).toEqual(
          expectedSelectAuthenticationDescriptor,
        )

        const headers = {
          Authorization: `Bearer ${authInfoResponse.jwt}`,
          'Content-Type': 'application/json',
        }
        const opts = {
          headers,
          method: 'GET',
          url: `${apiPath}/adversaries`,
        }
        const callAxiosDescriptor = generator.next(
          AuthenticationRecord(authInfoResponse),
        ).value
        const expectedCallAxiosDescriptor = call(axios, opts)
        expect(callAxiosDescriptor).toEqual(expectedCallAxiosDescriptor)
      })

      it('should dispatch the correct actions on success', () => {
        const response = {
          data: { data: adversariesResponse },
        }
        const putSuccessDescriptor = generator.next(response).value
        const expectedPutSuccessDescriptor = put(
          getAdversariesSuccess(adversariesResponse),
        )
        expect(putSuccessDescriptor).toEqual(expectedPutSuccessDescriptor)
      })

      it('should dispatch the correct actions on error', () => {
        const putErrorDescriptor = generator.throw(genericError).value
        const expectedPutErrorDescriptor = put(
          getAdversariesError(genericError),
        )
        expect(putErrorDescriptor).toEqual(expectedPutErrorDescriptor)
      })

      it('should dispatch the correct actions on error if unauthorised', () => {
        const error = {
          response: {
            ...genericError.response,
            status: 401,
          },
        }

        const putErrorDescriptor = generator.throw(error).value
        const expectedPutErrorDescriptor = put(getAdversariesError(error))
        expect(putErrorDescriptor).toEqual(expectedPutErrorDescriptor)

        const putLogoutDescriptor = generator.next().value
        const expectedPutLogoutDescriptor = put(logout())
        expect(putLogoutDescriptor).toEqual(expectedPutLogoutDescriptor)
      })

      afterEach(() => {
        const endGeneratorDescriptor = generator.next().value
        expect(endGeneratorDescriptor).toBeUndefined()
      })
    })

    describe('getAdversariesWatcher', () => {
      it('should listen for the correct action', () => {
        const generator = getAdversariesWatcher(action)

        const takeLatestDescriptor = generator.next().value
        const expectedTakeLatestDescriptor = takeLatest(
          GET_ADVERSARIES,
          getAdversariesSaga,
        )
        expect(takeLatestDescriptor).toEqual(expectedTakeLatestDescriptor)
      })
    })
  })

  // describe('getAdversarySaga', () => {
  //   const id = `${adversary1Id}`
  //   const action = getAdversary(id)
  //
  //   describe('getAdversarySaga', () => {
  //     let generator
  //
  //     it('should return immediately if no adversary ID', () => {
  //       const action = getAdversary()
  //       generator = getAdversarySaga(action)
  //
  //       const endGeneratorDescriptor = generator.next().value
  //       expect(endGeneratorDescriptor).toBeUndefined()
  //     })
  //
  //     describe('with adversary ID', () => {
  //       beforeEach(() => {
  //         generator = getAdversarySaga(action)
  //
  //         const selectAuthenticationDescriptor = generator.next().value
  //         const expectedSelectAuthenticationDescriptor = select(
  //           authenticationSelector,
  //         )
  //         expect(selectAuthenticationDescriptor).toEqual(
  //           expectedSelectAuthenticationDescriptor,
  //         )
  //
  //         const headers = {
  //           Authorization: `Bearer ${authInfoResponse.jwt}`,
  //           'Content-Type': 'application/json',
  //         }
  //         const opts = {
  //           headers,
  //           method: 'GET',
  //           url: `${apiPath}/adversaries/${id}`,
  //         }
  //         const callAxiosDescriptor = generator.next(
  //           AuthenticationRecord(authInfoResponse),
  //         ).value
  //         const expectedCallAxiosDescriptor = call(axios, opts)
  //         expect(callAxiosDescriptor).toEqual(expectedCallAxiosDescriptor)
  //       })
  //
  //       it('should dispatch the correct actions on success', () => {
  //         const response = {
  //           data: { data: adversary1Response },
  //         }
  //         const putSuccessDescriptor = generator.next(response).value
  //         const expectedPutSuccessDescriptor = put(
  //           getAdversarySuccess(id, adversary1Response),
  //         )
  //         expect(putSuccessDescriptor).toEqual(expectedPutSuccessDescriptor)
  //       })
  //
  //       it('should dispatch the correct actions on error', () => {
  //         const putErrorDescriptor = generator.throw(genericError).value
  //         const expectedPutErrorDescriptor = put(
  //           getAdversaryError(id, genericError),
  //         )
  //         expect(putErrorDescriptor).toEqual(expectedPutErrorDescriptor)
  //       })
  //
  //       it('should dispatch the correct actions on error if unauthorised', () => {
  //         const error = {
  //           response: {
  //             ...genericError.response,
  //             status: 401,
  //           },
  //         }
  //
  //         const putErrorDescriptor = generator.throw(error).value
  //         const expectedPutErrorDescriptor = put(getAdversaryError(id, error))
  //         expect(putErrorDescriptor).toEqual(expectedPutErrorDescriptor)
  //
  //         const putLogoutDescriptor = generator.next().value
  //         const expectedPutLogoutDescriptor = put(logout())
  //         expect(putLogoutDescriptor).toEqual(expectedPutLogoutDescriptor)
  //       })
  //
  //       afterEach(() => {
  //         const endGeneratorDescriptor = generator.next().value
  //         expect(endGeneratorDescriptor).toBeUndefined()
  //       })
  //     })
  //   })
  //
  //   describe('getAdversaryWatcher', () => {
  //     it('should listen for the correct action', () => {
  //       const generator = getAdversaryWatcher(action)
  //
  //       const takeLatestDescriptor = generator.next().value
  //       const expectedTakeLatestDescriptor = takeLatest(
  //         GET_ADVERSARY,
  //         getAdversarySaga,
  //       )
  //       expect(takeLatestDescriptor).toEqual(expectedTakeLatestDescriptor)
  //     })
  //   })
  // })
  //
  // describe('editAdversarySaga', () => {
  //   const id = `${adversary1Id}`
  //   const { skills: rawSkills, ...adversary } = adversary1Augmented.toJS()
  //   const values = {
  //     ...adversary,
  //     deletedCriticalInjuries: {
  //       [criticalInjury1.id]: true,
  //       [criticalInjury2.id]: false,
  //     },
  //     deletedWeapons: {
  //       [weapon1.id]: true,
  //       [weapon2.id]: false,
  //     },
  //     skills: keyBy(rawSkills, 'id'),
  //     talents: adversary1Augmented.toJS().talents,
  //   }
  //   const action = editAdversary(id, values, formikActions)
  //
  //   describe('editAdversarySaga', () => {
  //     let generator
  //
  //     beforeEach(() => {
  //       generator = editAdversarySaga(action)
  //
  //       const selectAuthenticationDescriptor = generator.next().value
  //       const expectedSelectAuthenticationDescriptor = select(
  //         authenticationSelector,
  //       )
  //       expect(selectAuthenticationDescriptor).toEqual(
  //         expectedSelectAuthenticationDescriptor,
  //       )
  //
  //       const headers = {
  //         Authorization: `Bearer ${authInfoResponse.jwt}`,
  //         'Content-Type': 'application/json',
  //       }
  //
  //       const {
  //         attributes: {
  //           defense: { melee: defense_melee, ranged: defense_ranged },
  //           soak,
  //           strain: { current: strain_current, total: strain_total },
  //           wounds: { current: wounds_current, total: wounds_total },
  //         },
  //         characteristics,
  //         favors,
  //       } = values
  //       const data = JSON.stringify({
  //         characteristics,
  //         defense_melee,
  //         defense_ranged,
  //         deletedCriticalInjuries: [`${criticalInjury1.id}`],
  //         deletedWeapons: [`${weapon1.id}`],
  //         equipment: adversary1Response.equipment,
  //         favors,
  //         motivations: adversary1Response.motivations,
  //         notes: adversary1Response.notes,
  //         skills: rawSkills.map(({ career, id, rank }) => ({
  //           career,
  //           id,
  //           rank,
  //         })),
  //         soak,
  //         strain_current,
  //         strain_total,
  //         talents: Object.values(adversary1Talents).map(
  //           ({ id, notes, rank = null }) => ({ id, notes, rank }),
  //         ),
  //         weapons: adversary1Augmented
  //           .toJS()
  //           .weapons.map(({ id, mods }) => ({ id, mods })),
  //         wounds_current,
  //         wounds_total,
  //         xp: adversary.xp,
  //       })
  //
  //       const opts = {
  //         data,
  //         headers,
  //         method: 'PUT',
  //         url: `${apiPath}/adversaries/${id}`,
  //       }
  //       const callAxiosDescriptor = generator.next(
  //         AuthenticationRecord(authInfoResponse),
  //       ).value
  //       const expectedCallAxiosDescriptor = call(axios, opts)
  //       expect(callAxiosDescriptor).toEqual(expectedCallAxiosDescriptor)
  //     })
  //
  //     it('should dispatch the correct actions on success', () => {
  //       const response = {
  //         data: { data: adversary1Response },
  //       }
  //       const putSuccessDescriptor = generator.next(response).value
  //       const expectedPutSuccessDescriptor = put(
  //         editAdversarySuccess(id, adversary1Response),
  //       )
  //       expect(putSuccessDescriptor).toEqual(expectedPutSuccessDescriptor)
  //
  //       const callSetSubmittingDescriptor = generator.next().value
  //       const expectedCallSetSubmittingDescriptor = call(
  //         formikActions.setSubmitting,
  //         false,
  //       )
  //       expect(callSetSubmittingDescriptor).toEqual(
  //         expectedCallSetSubmittingDescriptor,
  //       )
  //
  //       const callSetEditingDescriptor = generator.next().value
  //       const expectedCallSetEditingDescriptor = call(
  //         formikActions.setEditing,
  //         false,
  //       )
  //       expect(callSetEditingDescriptor).toEqual(
  //         expectedCallSetEditingDescriptor,
  //       )
  //
  //       const callResetFormDescriptor = generator.next().value
  //       const expectedCallResetFormDescriptor = call(formikActions.resetForm)
  //       expect(callResetFormDescriptor).toEqual(expectedCallResetFormDescriptor)
  //     })
  //
  //     it('should dispatch the correct actions on error', () => {
  //       const putErrorDescriptor = generator.throw(genericError).value
  //       const expectedPutErrorDescriptor = put(
  //         editAdversaryError(id, genericError),
  //       )
  //       expect(putErrorDescriptor).toEqual(expectedPutErrorDescriptor)
  //
  //       const callSetSubmittingDescriptor = generator.next().value
  //       const expectedCallSetSubmittingDescriptor = call(
  //         formikActions.setSubmitting,
  //         false,
  //       )
  //       expect(callSetSubmittingDescriptor).toEqual(
  //         expectedCallSetSubmittingDescriptor,
  //       )
  //
  //       const callSetErrorsDescriptor = generator.next().value
  //       const expectedCallSetErrorsDescriptor = call(formikActions.setErrors, {
  //         mainError: 'There was an error',
  //       })
  //       expect(callSetErrorsDescriptor).toEqual(expectedCallSetErrorsDescriptor)
  //     })
  //
  //     it('should dispatch the correct actions on error if undefined', () => {
  //       const putErrorDescriptor = generator.throw({}).value
  //       const expectedPutErrorDescriptor = put(editAdversaryError(id, {}))
  //       expect(putErrorDescriptor).toEqual(expectedPutErrorDescriptor)
  //
  //       const callSetSubmittingDescriptor = generator.next().value
  //       const expectedCallSetSubmittingDescriptor = call(
  //         formikActions.setSubmitting,
  //         false,
  //       )
  //       expect(callSetSubmittingDescriptor).toEqual(
  //         expectedCallSetSubmittingDescriptor,
  //       )
  //
  //       const callSetErrorsDescriptor = generator.next().value
  //       const expectedCallSetErrorsDescriptor = call(formikActions.setErrors, {
  //         mainError: 'There was an error',
  //       })
  //       expect(callSetErrorsDescriptor).toEqual(expectedCallSetErrorsDescriptor)
  //     })
  //
  //     it('should dispatch the correct actions on error if unauthorised', () => {
  //       const error = {
  //         response: {
  //           ...genericError.response,
  //           status: 401,
  //         },
  //       }
  //
  //       const putErrorDescriptor = generator.throw(error).value
  //       const expectedPutErrorDescriptor = put(editAdversaryError(id, error))
  //       expect(putErrorDescriptor).toEqual(expectedPutErrorDescriptor)
  //
  //       const callSetSubmittingDescriptor = generator.next().value
  //       const expectedCallSetSubmittingDescriptor = call(
  //         formikActions.setSubmitting,
  //         false,
  //       )
  //       expect(callSetSubmittingDescriptor).toEqual(
  //         expectedCallSetSubmittingDescriptor,
  //       )
  //
  //       const callSetErrorsDescriptor = generator.next().value
  //       const expectedCallSetErrorsDescriptor = call(formikActions.setErrors, {
  //         mainError: 'There was an error',
  //       })
  //       expect(callSetErrorsDescriptor).toEqual(expectedCallSetErrorsDescriptor)
  //
  //       const putLogoutDescriptor = generator.next().value
  //       const expectedPutLogoutDescriptor = put(logout())
  //       expect(putLogoutDescriptor).toEqual(expectedPutLogoutDescriptor)
  //     })
  //
  //     afterEach(() => {
  //       const endGeneratorDescriptor = generator.next().value
  //       expect(endGeneratorDescriptor).toBeUndefined()
  //     })
  //   })
  //
  //   describe('editAdversaryWatcher', () => {
  //     it('should listen for the correct action', () => {
  //       const generator = editAdversaryWatcher(action)
  //
  //       const takeLatestDescriptor = generator.next().value
  //       const expectedTakeLatestDescriptor = takeLatest(
  //         EDIT_ADVERSARY,
  //         editAdversarySaga,
  //       )
  //       expect(takeLatestDescriptor).toEqual(expectedTakeLatestDescriptor)
  //     })
  //   })
  // })

  describe('rootSaga', () => {
    it('should export the correct root', () => {
      const generator = rootSaga({})

      const allDescriptor = generator.next().value
      const expectedAllDescriptor = all([
        call(getAdversariesWatcher),
        // call(getAdversaryWatcher),
        // call(editAdversaryWatcher),
      ])
      expect(allDescriptor).toEqual(expectedAllDescriptor)
    })
  })
})
