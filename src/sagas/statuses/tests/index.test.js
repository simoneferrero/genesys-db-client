import { all, call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import rootSaga, { getTubeStatusesSaga, getTubeStatusesWatcher } from '../index'
import { GET_TUBE_STATUSES } from 'actions/getTubeStatuses/constants'
import {
  getTubeStatusesError,
  getTubeStatusesSuccess,
} from 'actions/getTubeStatuses'

import { tflApiPath } from 'mocks'
import { statuses } from 'mocks/statuses'
import { getTubeStatusError } from 'mocks/errors'

const action = {
  type: GET_TUBE_STATUSES,
  payload: {},
}

describe('statuses sagas', () => {
  describe('getTubeStatuses', () => {
    describe('getTubeStatusesSaga', () => {
      let generator

      beforeEach(() => {
        generator = getTubeStatusesSaga(action)
      })

      it('should dispatch the correct actions on success', () => {
        const opts = {
          method: 'GET',
          url: `${tflApiPath}/Line/Mode/tube/Status`,
        }
        const callAxiosDescriptor = generator.next().value
        const expectedCallAxiosDescriptor = call(axios, opts)
        expect(callAxiosDescriptor).toEqual(expectedCallAxiosDescriptor)

        const response = {
          data: statuses,
        }
        const putSuccessDescriptor = generator.next(response).value
        const expectedPutSuccessDescriptor = put(
          getTubeStatusesSuccess(statuses),
        )
        expect(putSuccessDescriptor).toEqual(expectedPutSuccessDescriptor)
      })

      it('should dispatch the correct actions on error', () => {
        generator.next().value
        const putErrorDescriptor = generator.throw(getTubeStatusError).value
        const expectedPutErrorDescriptor = put(
          getTubeStatusesError(getTubeStatusError),
        )
        expect(putErrorDescriptor).toEqual(expectedPutErrorDescriptor)
      })

      afterEach(() => {
        const endGeneratorDescriptor = generator.next().value
        expect(endGeneratorDescriptor).toBeUndefined()
      })
    })

    describe('getTubeStatusesWatcher', () => {
      it('should listen for the correct action', () => {
        const generator = getTubeStatusesWatcher(action)

        const takeLatestDescriptor = generator.next().value
        const expectedTakeLatestDescriptor = takeLatest(
          GET_TUBE_STATUSES,
          getTubeStatusesSaga,
        )
        expect(takeLatestDescriptor).toEqual(expectedTakeLatestDescriptor)
      })
    })
  })

  describe('rootSaga', () => {
    it('should export the correct root', () => {
      const generator = rootSaga({})

      const allDescriptor = generator.next().value
      const expectedAllDescriptor = all([call(getTubeStatusesWatcher)])
      expect(allDescriptor).toEqual(expectedAllDescriptor)
    })
  })
})
