import { all, call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

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

import { apiPath, formikActions } from 'mocks'
import {
  playerCharacter1Id,
  // TODO: use full player character mock
  playerCharacterSummary1Augmented,
  playerCharacterSummary1Response,
  playersCharactersResponse,
} from 'mocks/playersCharacters'
import { genericError } from 'mocks/errors'

describe('playersCharacters sagas', () => {
  describe('getPlayersCharacters', () => {
    const action = getPlayersCharacters()

    describe('getPlayersCharactersSaga', () => {
      let generator

      beforeEach(() => {
        generator = getPlayersCharactersSaga(action)
      })

      it('should dispatch the correct actions on success', () => {
        const opts = {
          method: 'GET',
          url: `${apiPath}/players-characters`,
        }
        const callAxiosDescriptor = generator.next().value
        const expectedCallAxiosDescriptor = call(axios, opts)
        expect(callAxiosDescriptor).toEqual(expectedCallAxiosDescriptor)

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
        generator.next().value
        const putErrorDescriptor = generator.throw(genericError).value
        const expectedPutErrorDescriptor = put(
          getPlayersCharactersError(genericError),
        )
        expect(putErrorDescriptor).toEqual(expectedPutErrorDescriptor)
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

      beforeEach(() => {
        generator = getPlayerCharacterSaga(action)
      })

      it('should dispatch the correct actions on success', () => {
        const opts = {
          method: 'GET',
          url: `${apiPath}/players-characters/${id}`,
        }
        const callAxiosDescriptor = generator.next().value
        const expectedCallAxiosDescriptor = call(axios, opts)
        expect(callAxiosDescriptor).toEqual(expectedCallAxiosDescriptor)

        const response = {
          data: { data: playerCharacterSummary1Response },
        }
        const putSuccessDescriptor = generator.next(response).value
        const expectedPutSuccessDescriptor = put(
          getPlayerCharacterSuccess(id, playerCharacterSummary1Response),
        )
        expect(putSuccessDescriptor).toEqual(expectedPutSuccessDescriptor)
      })

      it('should dispatch the correct actions on error', () => {
        generator.next().value
        const putErrorDescriptor = generator.throw(genericError).value
        const expectedPutErrorDescriptor = put(
          getPlayerCharacterError(id, genericError),
        )
        expect(putErrorDescriptor).toEqual(expectedPutErrorDescriptor)
      })

      afterEach(() => {
        const endGeneratorDescriptor = generator.next().value
        expect(endGeneratorDescriptor).toBeUndefined()
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
    const values = playerCharacterSummary1Augmented.toJS()
    const action = editPlayerCharacter(id, values, formikActions)

    describe('editPlayerCharacterSaga', () => {
      let generator

      beforeEach(() => {
        generator = editPlayerCharacterSaga(action)
      })

      it('should dispatch the correct actions on success', () => {
        const {
          attributes: {
            wounds: { current: wounds_current },
            strain: { current: strain_current },
          },
        } = values
        const data = JSON.stringify({
          wounds_current,
          strain_current,
        })
        const headers = { 'Content-Type': 'application/json' }

        const opts = {
          data,
          headers,
          method: 'PUT',
          url: `${apiPath}/players-characters/${id}`,
        }
        const callAxiosDescriptor = generator.next().value
        const expectedCallAxiosDescriptor = call(axios, opts)
        expect(callAxiosDescriptor).toEqual(expectedCallAxiosDescriptor)

        const response = {
          data: { data: playerCharacterSummary1Response },
        }
        const putSuccessDescriptor = generator.next(response).value
        const expectedPutSuccessDescriptor = put(
          editPlayerCharacterSuccess(id, playerCharacterSummary1Response),
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
      })

      it('should dispatch the correct actions on error', () => {
        generator.next().value
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
