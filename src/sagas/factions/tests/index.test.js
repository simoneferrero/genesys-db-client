import { all, call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import rootSaga, { getFactionsSaga, getFactionsWatcher } from '../index'
import { GET_FACTIONS } from 'actions/factions/constants'
import { getFactionsError, getFactionsSuccess } from 'actions/factions'

import { apiPath } from 'mocks'
import { factions } from 'mocks/factions'
import { genericError } from 'mocks/errors'

const action = {
  type: GET_FACTIONS,
  payload: {},
}

describe('factions sagas', () => {
  describe('getFactions', () => {
    describe('getFactionsSaga', () => {
      let generator

      beforeEach(() => {
        generator = getFactionsSaga(action)
      })

      it('should dispatch the correct actions on success', () => {
        const opts = {
          method: 'GET',
          url: `${apiPath}/factions`,
        }
        const callAxiosDescriptor = generator.next().value
        const expectedCallAxiosDescriptor = call(axios, opts)
        expect(callAxiosDescriptor).toEqual(expectedCallAxiosDescriptor)

        const response = {
          data: { data: factions },
        }
        const putSuccessDescriptor = generator.next(response).value
        const expectedPutSuccessDescriptor = put(getFactionsSuccess(factions))
        expect(putSuccessDescriptor).toEqual(expectedPutSuccessDescriptor)
      })

      it('should dispatch the correct actions on error', () => {
        generator.next().value
        const putErrorDescriptor = generator.throw(genericError).value
        const expectedPutErrorDescriptor = put(getFactionsError(genericError))
        expect(putErrorDescriptor).toEqual(expectedPutErrorDescriptor)
      })

      afterEach(() => {
        const endGeneratorDescriptor = generator.next().value
        expect(endGeneratorDescriptor).toBeUndefined()
      })
    })

    describe('getFactionsWatcher', () => {
      it('should listen for the correct action', () => {
        const generator = getFactionsWatcher(action)

        const takeLatestDescriptor = generator.next().value
        const expectedTakeLatestDescriptor = takeLatest(
          GET_FACTIONS,
          getFactionsSaga,
        )
        expect(takeLatestDescriptor).toEqual(expectedTakeLatestDescriptor)
      })
    })
  })

  describe('rootSaga', () => {
    it('should export the correct root', () => {
      const generator = rootSaga({})

      const allDescriptor = generator.next().value
      const expectedAllDescriptor = all([call(getFactionsWatcher)])
      expect(allDescriptor).toEqual(expectedAllDescriptor)
    })
  })
})
