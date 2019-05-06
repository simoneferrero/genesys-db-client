import { all, call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import rootSaga, {
  getCriticalInjuriesSaga,
  getCriticalInjuriesWatcher,
} from '../index'
import { GET_CRITICAL_INJURIES } from 'actions/criticalInjuries/constants'
import {
  getCriticalInjuries,
  getCriticalInjuriesError,
  getCriticalInjuriesSuccess,
} from 'actions/criticalInjuries'

import { apiPath } from 'mocks'
import { criticalInjuries } from 'mocks/criticalInjuries'
import { genericError } from 'mocks/errors'

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

  describe('rootSaga', () => {
    it('should export the correct root', () => {
      const generator = rootSaga({})

      const allDescriptor = generator.next().value
      const expectedAllDescriptor = all([call(getCriticalInjuriesWatcher)])
      expect(allDescriptor).toEqual(expectedAllDescriptor)
    })
  })
})
