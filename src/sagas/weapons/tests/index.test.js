import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import rootSaga, {
  getWeaponsSaga,
  getWeaponsWatcher,
  addWeaponSaga,
  addWeaponWatcher,
  addPlayerCharacterWeaponSaga,
  addPlayerCharacterWeaponWatcher,
} from '../index'
import {
  GET_WEAPONS,
  ADD_WEAPON,
  ADD_PLAYER_CHARACTER_WEAPON,
} from 'actions/weapons/constants'

import { logout } from 'actions/authentication'
import {
  getWeapons,
  getWeaponsError,
  getWeaponsSuccess,
  addWeapon,
  addWeaponError,
  addWeaponSuccess,
  addPlayerCharacterWeapon,
  addPlayerCharacterWeaponError,
  addPlayerCharacterWeaponSuccess,
} from 'actions/weapons'

import { authenticationSelector } from 'reducers/authentication/selectors'
import AuthenticationRecord from 'reducers/authentication/records'

import { apiPath, formikActions } from 'mocks'
import { authInfoResponse } from 'mocks/authentication'
import { genericError } from 'mocks/errors'
import { playerCharacter1Id } from 'mocks/playersCharacters'
import {
  weapons,
  newWeaponResponse,
  newPlayerCharacterWeaponResponse,
} from 'mocks/weapons'

describe('weapons sagas', () => {
  describe('getWeapons', () => {
    const action = getWeapons()

    describe('getWeaponsSaga', () => {
      let generator

      beforeEach(() => {
        generator = getWeaponsSaga(action)
      })

      it('should dispatch the correct actions on success', () => {
        const opts = {
          method: 'GET',
          url: `${apiPath}/weapons`,
        }
        const callAxiosDescriptor = generator.next().value
        const expectedCallAxiosDescriptor = call(axios, opts)
        expect(callAxiosDescriptor).toEqual(expectedCallAxiosDescriptor)

        const response = {
          data: { data: weapons },
        }
        const putSuccessDescriptor = generator.next(response).value
        const expectedPutSuccessDescriptor = put(getWeaponsSuccess(weapons))
        expect(putSuccessDescriptor).toEqual(expectedPutSuccessDescriptor)
      })

      it('should dispatch the correct actions on error', () => {
        generator.next().value
        const putErrorDescriptor = generator.throw(genericError).value
        const expectedPutErrorDescriptor = put(getWeaponsError(genericError))
        expect(putErrorDescriptor).toEqual(expectedPutErrorDescriptor)
      })

      afterEach(() => {
        const endGeneratorDescriptor = generator.next().value
        expect(endGeneratorDescriptor).toBeUndefined()
      })
    })

    describe('getWeaponsWatcher', () => {
      it('should listen for the correct action', () => {
        const generator = getWeaponsWatcher(action)

        const takeLatestDescriptor = generator.next().value
        const expectedTakeLatestDescriptor = takeLatest(
          GET_WEAPONS,
          getWeaponsSaga,
        )
        expect(takeLatestDescriptor).toEqual(expectedTakeLatestDescriptor)
      })
    })
  })

  describe('addWeapon', () => {
    const newWeapon = {
      ...newWeaponResponse,
      id: undefined,
    }
    const action = addWeapon(newWeapon, formikActions)

    describe('addWeaponSaga', () => {
      let generator

      beforeEach(() => {
        generator = addWeaponSaga(action)

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
          data: JSON.stringify(newWeapon),
          headers,
          method: 'POST',
          url: `${apiPath}/weapons`,
        }

        const callAxiosDescriptor = generator.next(
          AuthenticationRecord(authInfoResponse),
        ).value
        const expectedCallAxiosDescriptor = call(axios, opts)
        expect(callAxiosDescriptor).toEqual(expectedCallAxiosDescriptor)
      })

      it('should dispatch the correct actions on success', () => {
        const response = {
          data: { data: newWeaponResponse },
        }
        const putSuccessDescriptor = generator.next(response).value
        const expectedPutSuccessDescriptor = put(
          addWeaponSuccess(newWeaponResponse),
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
      })

      it('should dispatch the correct actions on error', () => {
        const putErrorDescriptor = generator.throw(genericError).value
        const expectedPutErrorDescriptor = put(addWeaponError(genericError))
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
        const expectedPutErrorDescriptor = put(addWeaponError({}))
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
        const expectedPutErrorDescriptor = put(addWeaponError(error))
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

    describe('addWeaponWatcher', () => {
      it('should listen for the correct action', () => {
        const generator = addWeaponWatcher(action)

        const takeLatestDescriptor = generator.next().value
        const expectedTakeLatestDescriptor = takeLatest(
          ADD_WEAPON,
          addWeaponSaga,
        )
        expect(takeLatestDescriptor).toEqual(expectedTakeLatestDescriptor)
      })
    })
  })

  describe('addPlayerCharacterWeapon', () => {
    const action = addPlayerCharacterWeapon(
      playerCharacter1Id,
      newWeaponResponse.id,
      formikActions,
    )

    describe('addPlayerCharacterWeaponSaga', () => {
      let generator

      beforeEach(() => {
        generator = addPlayerCharacterWeaponSaga(action)

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
          data: JSON.stringify({ weapon_id: newWeaponResponse.id }),
          headers,
          method: 'POST',
          url: `${apiPath}/players-characters/${playerCharacter1Id}/weapon`,
        }

        const callAxiosDescriptor = generator.next(
          AuthenticationRecord(authInfoResponse),
        ).value
        const expectedCallAxiosDescriptor = call(axios, opts)
        expect(callAxiosDescriptor).toEqual(expectedCallAxiosDescriptor)
      })

      it('should dispatch the correct actions on success', () => {
        const response = {
          data: { data: newPlayerCharacterWeaponResponse },
        }
        const putSuccessDescriptor = generator.next(response).value
        const expectedPutSuccessDescriptor = put(
          addPlayerCharacterWeaponSuccess(
            playerCharacter1Id,
            newPlayerCharacterWeaponResponse,
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
      })

      it('should dispatch the correct actions on error', () => {
        const putErrorDescriptor = generator.throw(genericError).value
        const expectedPutErrorDescriptor = put(
          addPlayerCharacterWeaponError(playerCharacter1Id, genericError),
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
          addPlayerCharacterWeaponError(playerCharacter1Id, {}),
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
          addPlayerCharacterWeaponError(playerCharacter1Id, error),
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

    describe('addPlayerCharacterWeaponWatcher', () => {
      it('should listen for the correct action', () => {
        const generator = addPlayerCharacterWeaponWatcher(action)

        const takeLatestDescriptor = generator.next().value
        const expectedTakeLatestDescriptor = takeLatest(
          ADD_PLAYER_CHARACTER_WEAPON,
          addPlayerCharacterWeaponSaga,
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
        call(getWeaponsWatcher),
        call(addWeaponWatcher),
        call(addPlayerCharacterWeaponWatcher),
      ])
      expect(allDescriptor).toEqual(expectedAllDescriptor)
    })
  })
})
