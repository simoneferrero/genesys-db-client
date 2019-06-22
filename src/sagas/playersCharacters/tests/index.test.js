import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import keyBy from 'lodash/keyBy'

import rootSaga, {
  // getPlayersCharacters
  getPlayersCharactersSaga,
  getPlayersCharactersWatcher,
  // getPlayerCharacter
  getPlayerCharacterSaga,
  getPlayerCharacterWatcher,
  // editPlayerCharacter
  editPlayerCharacterSaga,
  editPlayerCharacterWatcher,
} from '../index'

import { logout } from 'actions/authentication'
import {
  // getPlayersCharacters
  GET_PLAYERS_CHARACTERS,
  // getPlayerCharacter
  GET_PLAYER_CHARACTER,
  // editPlayerCharacter
  EDIT_PLAYER_CHARACTER,
} from 'actions/playersCharacters/constants'
import {
  // getPlayersCharacters
  getPlayersCharacters,
  getPlayersCharactersError,
  getPlayersCharactersSuccess,
  // getPlayerCharacter
  getPlayerCharacter,
  getPlayerCharacterError,
  getPlayerCharacterSuccess,
  // editPlayerCharacter
  editPlayerCharacter,
  editPlayerCharacterError,
  editPlayerCharacterSuccess,
} from 'actions/playersCharacters'

import { authenticationSelector } from 'reducers/authentication/selectors'
import AuthenticationRecord from 'reducers/authentication/records'

import { apiPath, formikActions } from 'mocks'
import { authInfoResponse } from 'mocks/authentication'
import { criticalInjury1, criticalInjury2 } from 'mocks/criticalInjuries'
import { genericError } from 'mocks/errors'
import {
  playerCharacter1Id,
  playerCharacter1Augmented,
  playerCharacter1Response,
  playerCharacter1Talents,
  playersCharactersResponse,
} from 'mocks/playersCharacters'
import { weapon1, weapon2 } from 'mocks/weapons'

describe('playersCharacters sagas', () => {
  describe('getPlayersCharacters', () => {
    const action = getPlayersCharacters()

    describe('getPlayersCharactersSaga', () => {
      let generator

      beforeEach(() => {
        generator = getPlayersCharactersSaga(action)

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
          url: `${apiPath}/players-characters`,
        }
        const callAxiosDescriptor = generator.next(
          AuthenticationRecord(authInfoResponse),
        ).value
        const expectedCallAxiosDescriptor = call(axios, opts)
        expect(callAxiosDescriptor).toEqual(expectedCallAxiosDescriptor)
      })

      it('should dispatch the correct actions on success', () => {
        const response = {
          data: { data: playersCharactersResponse },
        }
        const putSuccessDescriptor = generator.next(response).value
        const expectedPutSuccessDescriptor = put(
          getPlayersCharactersSuccess(playersCharactersResponse),
        )
        expect(putSuccessDescriptor).toEqual(expectedPutSuccessDescriptor)
      })

      it('should dispatch the correct actions on error', () => {
        const putErrorDescriptor = generator.throw(genericError).value
        const expectedPutErrorDescriptor = put(
          getPlayersCharactersError(genericError),
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
        const expectedPutErrorDescriptor = put(getPlayersCharactersError(error))
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

    describe('getPlayersCharactersWatcher', () => {
      it('should listen for the correct action', () => {
        const generator = getPlayersCharactersWatcher(action)

        const takeLatestDescriptor = generator.next().value
        const expectedTakeLatestDescriptor = takeLatest(
          GET_PLAYERS_CHARACTERS,
          getPlayersCharactersSaga,
        )
        expect(takeLatestDescriptor).toEqual(expectedTakeLatestDescriptor)
      })
    })
  })

  describe('getPlayerCharacterSaga', () => {
    const id = `${playerCharacter1Id}`
    const action = getPlayerCharacter(id)

    describe('getPlayerCharacterSaga', () => {
      let generator

      it('should return immediately if no playerCharacter ID', () => {
        const action = getPlayerCharacter()
        generator = getPlayerCharacterSaga(action)

        const endGeneratorDescriptor = generator.next().value
        expect(endGeneratorDescriptor).toBeUndefined()
      })

      describe('with playerCharacter ID', () => {
        beforeEach(() => {
          generator = getPlayerCharacterSaga(action)

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
            url: `${apiPath}/players-characters/${id}`,
          }
          const callAxiosDescriptor = generator.next(
            AuthenticationRecord(authInfoResponse),
          ).value
          const expectedCallAxiosDescriptor = call(axios, opts)
          expect(callAxiosDescriptor).toEqual(expectedCallAxiosDescriptor)
        })

        it('should dispatch the correct actions on success', () => {
          const response = {
            data: { data: playerCharacter1Response },
          }
          const putSuccessDescriptor = generator.next(response).value
          const expectedPutSuccessDescriptor = put(
            getPlayerCharacterSuccess(id, playerCharacter1Response),
          )
          expect(putSuccessDescriptor).toEqual(expectedPutSuccessDescriptor)
        })

        it('should dispatch the correct actions on error', () => {
          const putErrorDescriptor = generator.throw(genericError).value
          const expectedPutErrorDescriptor = put(
            getPlayerCharacterError(id, genericError),
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
          const expectedPutErrorDescriptor = put(
            getPlayerCharacterError(id, error),
          )
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
    })

    describe('getPlayerCharacterWatcher', () => {
      it('should listen for the correct action', () => {
        const generator = getPlayerCharacterWatcher(action)

        const takeLatestDescriptor = generator.next().value
        const expectedTakeLatestDescriptor = takeLatest(
          GET_PLAYER_CHARACTER,
          getPlayerCharacterSaga,
        )
        expect(takeLatestDescriptor).toEqual(expectedTakeLatestDescriptor)
      })
    })
  })

  describe('editPlayerCharacterSaga', () => {
    const id = `${playerCharacter1Id}`
    const {
      skills: rawSkills,
      ...playerCharacter
    } = playerCharacter1Augmented.toJS()
    const values = {
      ...playerCharacter,
      deletedCriticalInjuries: {
        [criticalInjury1.id]: true,
        [criticalInjury2.id]: false,
      },
      deletedWeapons: {
        [weapon1.id]: true,
        [weapon2.id]: false,
      },
      skills: keyBy(rawSkills, 'id'),
      talents: playerCharacter1Augmented.toJS().talents,
    }
    const action = editPlayerCharacter(id, values, formikActions)

    describe('editPlayerCharacterSaga', () => {
      let generator

      beforeEach(() => {
        generator = editPlayerCharacterSaga(action)

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

        const {
          attributes: {
            defense: { melee: defense_melee, ranged: defense_ranged },
            soak,
            strain: { current: strain_current, total: strain_total },
            wounds: { current: wounds_current, total: wounds_total },
          },
          characteristics,
          favors,
        } = values
        const data = JSON.stringify({
          characteristics,
          defense_melee,
          defense_ranged,
          deletedCriticalInjuries: [`${criticalInjury1.id}`],
          deletedWeapons: [`${weapon1.id}`],
          equipment: playerCharacter1Response.equipment,
          favors,
          motivations: playerCharacter1Response.motivations,
          notes: playerCharacter1Response.notes,
          skills: rawSkills
            .filter(({ rank }) => rank)
            .map(({ id, rank }) => ({ id, rank })),
          soak,
          strain_current,
          strain_total,
          talents: Object.values(playerCharacter1Talents).map(
            ({ id, notes, rank = null }) => ({ id, notes, rank }),
          ),
          weapons: playerCharacter1Augmented
            .toJS()
            .weapons.map(({ id, mods }) => ({ id, mods })),
          wounds_current,
          wounds_total,
          xp: playerCharacter.xp,
        })

        const opts = {
          data,
          headers,
          method: 'PUT',
          url: `${apiPath}/players-characters/${id}`,
        }
        const callAxiosDescriptor = generator.next(
          AuthenticationRecord(authInfoResponse),
        ).value
        const expectedCallAxiosDescriptor = call(axios, opts)
        expect(callAxiosDescriptor).toEqual(expectedCallAxiosDescriptor)
      })

      it('should dispatch the correct actions on success', () => {
        const response = {
          data: { data: playerCharacter1Response },
        }
        const putSuccessDescriptor = generator.next(response).value
        const expectedPutSuccessDescriptor = put(
          editPlayerCharacterSuccess(id, playerCharacter1Response),
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

        const callSetEditingDescriptor = generator.next().value
        const expectedCallSetEditingDescriptor = call(
          formikActions.setEditing,
          false,
        )
        expect(callSetEditingDescriptor).toEqual(
          expectedCallSetEditingDescriptor,
        )

        const callResetFormDescriptor = generator.next().value
        const expectedCallResetFormDescriptor = call(formikActions.resetForm)
        expect(callResetFormDescriptor).toEqual(expectedCallResetFormDescriptor)
      })

      it('should dispatch the correct actions on error', () => {
        const putErrorDescriptor = generator.throw(genericError).value
        const expectedPutErrorDescriptor = put(
          editPlayerCharacterError(id, genericError),
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
        const expectedPutErrorDescriptor = put(editPlayerCharacterError(id, {}))
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
          editPlayerCharacterError(id, error),
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

    describe('editPlayerCharacterWatcher', () => {
      it('should listen for the correct action', () => {
        const generator = editPlayerCharacterWatcher(action)

        const takeLatestDescriptor = generator.next().value
        const expectedTakeLatestDescriptor = takeLatest(
          EDIT_PLAYER_CHARACTER,
          editPlayerCharacterSaga,
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
        call(getPlayersCharactersWatcher),
        call(getPlayerCharacterWatcher),
        call(editPlayerCharacterWatcher),
      ])
      expect(allDescriptor).toEqual(expectedAllDescriptor)
    })
  })
})
