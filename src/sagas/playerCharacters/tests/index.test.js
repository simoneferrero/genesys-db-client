import { all, call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import rootSaga, {
  getPlayerCharactersSaga,
  getPlayerCharactersWatcher,
} from '../index'
import { GET_PLAYER_CHARACTERS } from 'actions/playerCharacters/constants'
import {
  getPlayerCharactersError,
  getPlayerCharactersSuccess,
} from 'actions/playerCharacters'

import { apiPath } from 'mocks'
import { playerCharacters } from 'mocks/playerCharacters'
import { genericError } from 'mocks/errors'

const action = {
  type: GET_PLAYER_CHARACTERS,
  payload: {},
}

describe('playerCharacters sagas', () => {
  describe('getPlayerCharacters', () => {
    describe('getPlayerCharactersSaga', () => {
      let generator

      beforeEach(() => {
        generator = getPlayerCharactersSaga(action)
      })

      it('should dispatch the correct actions on success', () => {
        const opts = {
          method: 'GET',
          url: `${apiPath}/player-characters`,
        }
        const callAxiosDescriptor = generator.next().value
        const expectedCallAxiosDescriptor = call(axios, opts)
        expect(callAxiosDescriptor).toEqual(expectedCallAxiosDescriptor)

        const response = {
          data: playerCharacters,
        }
        const putSuccessDescriptor = generator.next(response).value
        const expectedPutSuccessDescriptor = put(
          getPlayerCharactersSuccess(playerCharacters),
        )
        expect(putSuccessDescriptor).toEqual(expectedPutSuccessDescriptor)
      })

      it('should dispatch the correct actions on error', () => {
        generator.next().value
        const putErrorDescriptor = generator.throw(genericError).value
        const expectedPutErrorDescriptor = put(
          getPlayerCharactersError(genericError),
        )
        expect(putErrorDescriptor).toEqual(expectedPutErrorDescriptor)
      })

      afterEach(() => {
        const endGeneratorDescriptor = generator.next().value
        expect(endGeneratorDescriptor).toBeUndefined()
      })
    })

    describe('getPlayerCharactersWatcher', () => {
      it('should listen for the correct action', () => {
        const generator = getPlayerCharactersWatcher(action)

        const takeLatestDescriptor = generator.next().value
        const expectedTakeLatestDescriptor = takeLatest(
          GET_PLAYER_CHARACTERS,
          getPlayerCharactersSaga,
        )
        expect(takeLatestDescriptor).toEqual(expectedTakeLatestDescriptor)
      })
    })
  })

  describe('rootSaga', () => {
    it('should export the correct root', () => {
      const generator = rootSaga({})

      const allDescriptor = generator.next().value
      const expectedAllDescriptor = all([call(getPlayerCharactersWatcher)])
      expect(allDescriptor).toEqual(expectedAllDescriptor)
    })
  })
})
