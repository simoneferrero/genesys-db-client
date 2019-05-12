import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import rootSaga, {
  getCriticalInjuriesSaga,
  getCriticalInjuriesWatcher,
  addPlayerCharacterCriticalInjurySaga,
  addPlayerCharacterCriticalInjuryWatcher,
} from '../index'
import {
  GET_CRITICAL_INJURIES,
  ADD_PLAYER_CHARACTER_CRITICAL_INJURY,
} from 'actions/criticalInjuries/constants'

import { logout } from 'actions/authentication'
import {
  getCriticalInjuries,
  getCriticalInjuriesError,
  getCriticalInjuriesSuccess,
  addPlayerCharacterCriticalInjury,
  addPlayerCharacterCriticalInjuryError,
  addPlayerCharacterCriticalInjurySuccess,
} from 'actions/criticalInjuries'

import { authenticationSelector } from 'reducers/authentication/selectors'
import AuthenticationRecord from 'reducers/authentication/records'

import { apiPath, formikActions } from 'mocks'
import { authInfoResponse } from 'mocks/authentication'
import {
  criticalInjuries,
  criticalInjury3,
  newPlayerCharacterCriticalInjuryResponse,
} from 'mocks/criticalInjuries'
import { genericError } from 'mocks/errors'
import { playerCharacter1Id } from 'mocks/playersCharacters'

describe('criticalInjuries sagas', () => {
  describe('getCriticalInjuries', () => {
    describe('getCriticalInjuriesSaga', () => {
      let generator

      beforeEach(() => {
        generator = getCriticalInjuriesSaga(getCriticalInjuries)
      })

      it('should dispatch the correct actions on success', () => {
        const opts = {
          method: 'GET',
          url: `${apiPath}/critical-injuries`,
        }
        const callAxiosDescriptor = generator.next().value
        const expectedCallAxiosDescriptor = call(axios, opts)
        expect(callAxiosDescriptor).toEqual(expectedCallAxiosDescriptor)

        const response = {
          data: { data: criticalInjuries },
        }
        const putSuccessDescriptor = generator.next(response).value
        const expectedPutSuccessDescriptor = put(
          getCriticalInjuriesSuccess(criticalInjuries),
        )
        expect(putSuccessDescriptor).toEqual(expectedPutSuccessDescriptor)
      })

      it('should dispatch the correct actions on error', () => {
        generator.next().value
        const putErrorDescriptor = generator.throw(genericError).value
        const expectedPutErrorDescriptor = put(
          getCriticalInjuriesError(genericError),
        )
        expect(putErrorDescriptor).toEqual(expectedPutErrorDescriptor)
      })

      afterEach(() => {
        const endGeneratorDescriptor = generator.next().value
        expect(endGeneratorDescriptor).toBeUndefined()
      })
    })

    describe('getCriticalInjuriesWatcher', () => {
      it('should listen for the correct action', () => {
        const generator = getCriticalInjuriesWatcher(getCriticalInjuries)

        const takeLatestDescriptor = generator.next().value
        const expectedTakeLatestDescriptor = takeLatest(
          GET_CRITICAL_INJURIES,
          getCriticalInjuriesSaga,
        )
        expect(takeLatestDescriptor).toEqual(expectedTakeLatestDescriptor)
      })
    })
  })

  describe('addPlayerCharacterCriticalInjury', () => {
    const action = addPlayerCharacterCriticalInjury(
      playerCharacter1Id,
      criticalInjury3.id,
      formikActions,
    )

    describe('addPlayerCharacterCriticalInjurySaga', () => {
      let generator

      beforeEach(() => {
        generator = addPlayerCharacterCriticalInjurySaga(action)

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
          data: JSON.stringify({ critical_injury_id: criticalInjury3.id }),
          headers,
          method: 'POST',
          url: `${apiPath}/players-characters/${playerCharacter1Id}/critical-injury`,
        }

        const callAxiosDescriptor = generator.next(
          AuthenticationRecord(authInfoResponse),
        ).value
        const expectedCallAxiosDescriptor = call(axios, opts)
        expect(callAxiosDescriptor).toEqual(expectedCallAxiosDescriptor)
      })

      it('should dispatch the correct actions on success', () => {
        const response = {
          data: { data: newPlayerCharacterCriticalInjuryResponse },
        }
        const putSuccessDescriptor = generator.next(response).value
        const expectedPutSuccessDescriptor = put(
          addPlayerCharacterCriticalInjurySuccess(
            playerCharacter1Id,
            newPlayerCharacterCriticalInjuryResponse,
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
          addPlayerCharacterCriticalInjuryError(
            playerCharacter1Id,
            genericError,
          ),
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
          addPlayerCharacterCriticalInjuryError(playerCharacter1Id, {}),
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
          addPlayerCharacterCriticalInjuryError(playerCharacter1Id, error),
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

    describe('addPlayerCharacterCriticalInjuryWatcher', () => {
      it('should listen for the correct action', () => {
        const generator = addPlayerCharacterCriticalInjuryWatcher(action)

        const takeLatestDescriptor = generator.next().value
        const expectedTakeLatestDescriptor = takeLatest(
          ADD_PLAYER_CHARACTER_CRITICAL_INJURY,
          addPlayerCharacterCriticalInjurySaga,
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
        call(getCriticalInjuriesWatcher),
        call(addPlayerCharacterCriticalInjuryWatcher),
      ])
      expect(allDescriptor).toEqual(expectedAllDescriptor)
    })
  })
})
