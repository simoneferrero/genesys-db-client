import { all, call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import rootSaga, {
  getPlayersCharactersSaga,
  getPlayersCharactersWatcher,
} from '../index'
import { GET_PLAYERS_CHARACTERS } from 'actions/playersCharacters/constants'
import {
  getPlayersCharactersError,
  getPlayersCharactersSuccess,
} from 'actions/playersCharacters'

import { apiPath } from 'mocks'
import { playersCharacters } from 'mocks/playersCharacters'
import { genericError } from 'mocks/errors'

const action = {
  type: GET_PLAYERS_CHARACTERS,
  payload: {},
}

describe('playersCharacters sagas', () => {
  describe('getPlayersCharacters', () => {
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
          data: playersCharacters,
        }
        const putSuccessDescriptor = generator.next(response).value
        const expectedPutSuccessDescriptor = put(
          getPlayersCharactersSuccess(playersCharacters),
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

  describe('rootSaga', () => {
    it('should export the correct root', () => {
      const generator = rootSaga({})

      const allDescriptor = generator.next().value
      const expectedAllDescriptor = all([call(getPlayersCharactersWatcher)])
      expect(allDescriptor).toEqual(expectedAllDescriptor)
    })
  })
})
