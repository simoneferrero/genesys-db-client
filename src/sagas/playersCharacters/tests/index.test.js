import { all, call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import rootSaga, {
  // getPlayersCharacters
  getPlayersCharactersSaga,
  getPlayersCharactersWatcher,
  // getPlayerCharacter
  getPlayerCharacterSaga,
  getPlayerCharacterWatcher,
} from '../index'
import {
  // getPlayersCharacters
  GET_PLAYERS_CHARACTERS,
  // getPlayerCharacter
  GET_PLAYER_CHARACTER,
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
} from 'actions/playersCharacters'

import { apiPath } from 'mocks'
import {
  playerCharacter1Id,
  // TODO: use full player character mock
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
          data: playersCharactersResponse,
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
          data: playerCharacterSummary1Response,
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

  describe('rootSaga', () => {
    it('should export the correct root', () => {
      const generator = rootSaga({})

      const allDescriptor = generator.next().value
      const expectedAllDescriptor = all([
        call(getPlayersCharactersWatcher),
        call(getPlayerCharacterWatcher),
      ])
      expect(allDescriptor).toEqual(expectedAllDescriptor)
    })
  })
})
