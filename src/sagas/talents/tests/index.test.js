import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import rootSaga, {
  getTalentsSaga,
  getTalentsWatcher,
  addTalentSaga,
  addTalentWatcher,
  addPlayerCharacterTalentSaga,
  addPlayerCharacterTalentWatcher,
} from '../index'
import {
  GET_TALENTS,
  ADD_TALENT,
  ADD_PLAYER_CHARACTER_TALENT,
} from 'actions/talents/constants'

import { logout } from 'actions/authentication'
import {
  getTalents,
  getTalentsError,
  getTalentsSuccess,
  addTalent,
  addTalentError,
  addTalentSuccess,
  addPlayerCharacterTalent,
  addPlayerCharacterTalentError,
  addPlayerCharacterTalentSuccess,
} from 'actions/talents'

import { authenticationSelector } from 'reducers/authentication/selectors'
import AuthenticationRecord from 'reducers/authentication/records'

import { apiPath, formikActions } from 'mocks'
import { authInfoResponse } from 'mocks/authentication'
import {
  talents,
  talent3,
  newPlayerCharacterTalentResponse,
} from 'mocks/talents'
import { genericError } from 'mocks/errors'
import { playerCharacter1Id } from 'mocks/playersCharacters'

describe('talents sagas', () => {
  describe('getTalents', () => {
    describe('getTalentsSaga', () => {
      let generator

      beforeEach(() => {
        generator = getTalentsSaga(getTalents)
      })

      it('should dispatch the correct actions on success', () => {
        const opts = {
          method: 'GET',
          url: `${apiPath}/talents`,
        }
        const callAxiosDescriptor = generator.next().value
        const expectedCallAxiosDescriptor = call(axios, opts)
        expect(callAxiosDescriptor).toEqual(expectedCallAxiosDescriptor)

        const response = {
          data: { data: talents },
        }
        const putSuccessDescriptor = generator.next(response).value
        const expectedPutSuccessDescriptor = put(getTalentsSuccess(talents))
        expect(putSuccessDescriptor).toEqual(expectedPutSuccessDescriptor)
      })

      it('should dispatch the correct actions on error', () => {
        generator.next().value
        const putErrorDescriptor = generator.throw(genericError).value
        const expectedPutErrorDescriptor = put(getTalentsError(genericError))
        expect(putErrorDescriptor).toEqual(expectedPutErrorDescriptor)
      })

      afterEach(() => {
        const endGeneratorDescriptor = generator.next().value
        expect(endGeneratorDescriptor).toBeUndefined()
      })
    })

    describe('getTalentsWatcher', () => {
      it('should listen for the correct action', () => {
        const generator = getTalentsWatcher(getTalents)

        const takeLatestDescriptor = generator.next().value
        const expectedTakeLatestDescriptor = takeLatest(
          GET_TALENTS,
          getTalentsSaga,
        )
        expect(takeLatestDescriptor).toEqual(expectedTakeLatestDescriptor)
      })
    })
  })

  describe('addTalent', () => {
    const newTalent = {
      ...talent3,
      id: undefined,
    }
    const action = addTalent(newTalent, formikActions)

    describe('addTalentSaga', () => {
      let generator

      beforeEach(() => {
        generator = addTalentSaga(action)

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
          data: JSON.stringify(newTalent),
          headers,
          method: 'POST',
          url: `${apiPath}/talents`,
        }

        const callAxiosDescriptor = generator.next(
          AuthenticationRecord(authInfoResponse),
        ).value
        const expectedCallAxiosDescriptor = call(axios, opts)
        expect(callAxiosDescriptor).toEqual(expectedCallAxiosDescriptor)
      })

      it('should dispatch the correct actions on success', () => {
        const response = {
          data: { data: talent3 },
        }
        const putSuccessDescriptor = generator.next(response).value
        const expectedPutSuccessDescriptor = put(addTalentSuccess(talent3))
        expect(putSuccessDescriptor).toEqual(expectedPutSuccessDescriptor)

        const callSetSubmittingDescriptor = generator.next().value
        const expectedCallSetSubmittingDescriptor = call(
          formikActions.setSubmitting,
          false,
        )
        expect(callSetSubmittingDescriptor).toEqual(
          expectedCallSetSubmittingDescriptor,
        )

        const callSetIsNewDescriptor = generator.next().value
        const expectedCallSetIsNewDescriptor = call(
          formikActions.setIsNew,
          false,
        )
        expect(callSetIsNewDescriptor).toEqual(expectedCallSetIsNewDescriptor)

        const callResetFormDescriptor = generator.next().value
        const expectedCallResetFormDescriptor = call(formikActions.resetForm)
        expect(callResetFormDescriptor).toEqual(expectedCallResetFormDescriptor)
      })

      it('should dispatch the correct actions on error', () => {
        const putErrorDescriptor = generator.throw(genericError).value
        const expectedPutErrorDescriptor = put(addTalentError(genericError))
        expect(putErrorDescriptor).toEqual(expectedPutErrorDescriptor)

        const callSetSubmittingDescriptor = generator.next().value
        const expectedCallSetSubmittingDescriptor = call(
          formikActions.setSubmitting,
          false,
        )
        expect(callSetSubmittingDescriptor).toEqual(
          expectedCallSetSubmittingDescriptor,
        )

        const callSetErrorsDescriptor = generator.next().value
        const expectedCallSetErrorsDescriptor = call(formikActions.setErrors, {
          mainError: 'There was an error',
        })
        expect(callSetErrorsDescriptor).toEqual(expectedCallSetErrorsDescriptor)
      })

      it('should dispatch the correct actions on error if undefined', () => {
        const putErrorDescriptor = generator.throw({}).value
        const expectedPutErrorDescriptor = put(addTalentError({}))
        expect(putErrorDescriptor).toEqual(expectedPutErrorDescriptor)

        const callSetSubmittingDescriptor = generator.next().value
        const expectedCallSetSubmittingDescriptor = call(
          formikActions.setSubmitting,
          false,
        )
        expect(callSetSubmittingDescriptor).toEqual(
          expectedCallSetSubmittingDescriptor,
        )

        const callSetErrorsDescriptor = generator.next().value
        const expectedCallSetErrorsDescriptor = call(formikActions.setErrors, {
          mainError: 'There was an error',
        })
        expect(callSetErrorsDescriptor).toEqual(expectedCallSetErrorsDescriptor)
      })

      it('should dispatch the correct actions on error if unauthorised', () => {
        const error = {
          response: {
            ...genericError.response,
            status: 401,
          },
        }

        const putErrorDescriptor = generator.throw(error).value
        const expectedPutErrorDescriptor = put(addTalentError(error))
        expect(putErrorDescriptor).toEqual(expectedPutErrorDescriptor)

        const callSetSubmittingDescriptor = generator.next().value
        const expectedCallSetSubmittingDescriptor = call(
          formikActions.setSubmitting,
          false,
        )
        expect(callSetSubmittingDescriptor).toEqual(
          expectedCallSetSubmittingDescriptor,
        )

        const callSetErrorsDescriptor = generator.next().value
        const expectedCallSetErrorsDescriptor = call(formikActions.setErrors, {
          mainError: 'There was an error',
        })
        expect(callSetErrorsDescriptor).toEqual(expectedCallSetErrorsDescriptor)

        const putLogoutDescriptor = generator.next().value
        const expectedPutLogoutDescriptor = put(logout())
        expect(putLogoutDescriptor).toEqual(expectedPutLogoutDescriptor)
      })

      afterEach(() => {
        const endGeneratorDescriptor = generator.next().value
        expect(endGeneratorDescriptor).toBeUndefined()
      })
    })

    describe('addTalentWatcher', () => {
      it('should listen for the correct action', () => {
        const generator = addTalentWatcher(action)

        const takeLatestDescriptor = generator.next().value
        const expectedTakeLatestDescriptor = takeLatest(
          ADD_TALENT,
          addTalentSaga,
        )
        expect(takeLatestDescriptor).toEqual(expectedTakeLatestDescriptor)
      })
    })
  })

  describe('addPlayerCharacterTalent', () => {
    const action = addPlayerCharacterTalent(
      playerCharacter1Id,
      talent3.id,
      formikActions,
    )

    describe('addPlayerCharacterTalentSaga', () => {
      let generator

      beforeEach(() => {
        generator = addPlayerCharacterTalentSaga(action)

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
          data: JSON.stringify({ talent_id: talent3.id }),
          headers,
          method: 'POST',
          url: `${apiPath}/players-characters/${playerCharacter1Id}/talent`,
        }

        const callAxiosDescriptor = generator.next(
          AuthenticationRecord(authInfoResponse),
        ).value
        const expectedCallAxiosDescriptor = call(axios, opts)
        expect(callAxiosDescriptor).toEqual(expectedCallAxiosDescriptor)
      })

      it('should dispatch the correct actions on success', () => {
        const response = {
          data: { data: newPlayerCharacterTalentResponse },
        }
        const putSuccessDescriptor = generator.next(response).value
        const expectedPutSuccessDescriptor = put(
          addPlayerCharacterTalentSuccess(
            playerCharacter1Id,
            newPlayerCharacterTalentResponse,
          ),
        )
        expect(putSuccessDescriptor).toEqual(expectedPutSuccessDescriptor)

        const callSetSubmittingDescriptor = generator.next().value
        const expectedCallSetSubmittingDescriptor = call(
          formikActions.setSubmitting,
          false,
        )
        expect(callSetSubmittingDescriptor).toEqual(
          expectedCallSetSubmittingDescriptor,
        )

        const callSetIsNewDescriptor = generator.next().value
        const expectedCallSetIsNewDescriptor = call(
          formikActions.setIsNew,
          false,
        )
        expect(callSetIsNewDescriptor).toEqual(expectedCallSetIsNewDescriptor)

        const callResetFormDescriptor = generator.next().value
        const expectedCallResetFormDescriptor = call(formikActions.resetForm)
        expect(callResetFormDescriptor).toEqual(expectedCallResetFormDescriptor)
      })

      it('should dispatch the correct actions on error', () => {
        const putErrorDescriptor = generator.throw(genericError).value
        const expectedPutErrorDescriptor = put(
          addPlayerCharacterTalentError(playerCharacter1Id, genericError),
        )
        expect(putErrorDescriptor).toEqual(expectedPutErrorDescriptor)

        const callSetSubmittingDescriptor = generator.next().value
        const expectedCallSetSubmittingDescriptor = call(
          formikActions.setSubmitting,
          false,
        )
        expect(callSetSubmittingDescriptor).toEqual(
          expectedCallSetSubmittingDescriptor,
        )

        const callSetErrorsDescriptor = generator.next().value
        const expectedCallSetErrorsDescriptor = call(formikActions.setErrors, {
          mainError: 'There was an error',
        })
        expect(callSetErrorsDescriptor).toEqual(expectedCallSetErrorsDescriptor)
      })

      it('should dispatch the correct actions on error if undefined', () => {
        const putErrorDescriptor = generator.throw({}).value
        const expectedPutErrorDescriptor = put(
          addPlayerCharacterTalentError(playerCharacter1Id, {}),
        )
        expect(putErrorDescriptor).toEqual(expectedPutErrorDescriptor)

        const callSetSubmittingDescriptor = generator.next().value
        const expectedCallSetSubmittingDescriptor = call(
          formikActions.setSubmitting,
          false,
        )
        expect(callSetSubmittingDescriptor).toEqual(
          expectedCallSetSubmittingDescriptor,
        )

        const callSetErrorsDescriptor = generator.next().value
        const expectedCallSetErrorsDescriptor = call(formikActions.setErrors, {
          mainError: 'There was an error',
        })
        expect(callSetErrorsDescriptor).toEqual(expectedCallSetErrorsDescriptor)
      })

      it('should dispatch the correct actions on error if unauthorised', () => {
        const error = {
          response: {
            ...genericError.response,
            status: 401,
          },
        }

        const putErrorDescriptor = generator.throw(error).value
        const expectedPutErrorDescriptor = put(
          addPlayerCharacterTalentError(playerCharacter1Id, error),
        )
        expect(putErrorDescriptor).toEqual(expectedPutErrorDescriptor)

        const callSetSubmittingDescriptor = generator.next().value
        const expectedCallSetSubmittingDescriptor = call(
          formikActions.setSubmitting,
          false,
        )
        expect(callSetSubmittingDescriptor).toEqual(
          expectedCallSetSubmittingDescriptor,
        )

        const callSetErrorsDescriptor = generator.next().value
        const expectedCallSetErrorsDescriptor = call(formikActions.setErrors, {
          mainError: 'There was an error',
        })
        expect(callSetErrorsDescriptor).toEqual(expectedCallSetErrorsDescriptor)

        const putLogoutDescriptor = generator.next().value
        const expectedPutLogoutDescriptor = put(logout())
        expect(putLogoutDescriptor).toEqual(expectedPutLogoutDescriptor)
      })

      afterEach(() => {
        const endGeneratorDescriptor = generator.next().value
        expect(endGeneratorDescriptor).toBeUndefined()
      })
    })

    describe('addPlayerCharacterTalentWatcher', () => {
      it('should listen for the correct action', () => {
        const generator = addPlayerCharacterTalentWatcher(action)

        const takeLatestDescriptor = generator.next().value
        const expectedTakeLatestDescriptor = takeLatest(
          ADD_PLAYER_CHARACTER_TALENT,
          addPlayerCharacterTalentSaga,
        )
        expect(takeLatestDescriptor).toEqual(expectedTakeLatestDescriptor)
      })
    })
  })

  describe('rootSaga', () => {
    it('should export the correct root', () => {
      const generator = rootSaga({})

      const allDescriptor = generator.next().value
      const expectedAllDescriptor = all([
        call(getTalentsWatcher),
        call(addTalentWatcher),
        call(addPlayerCharacterTalentWatcher),
      ])
      expect(allDescriptor).toEqual(expectedAllDescriptor)
    })
  })
})
