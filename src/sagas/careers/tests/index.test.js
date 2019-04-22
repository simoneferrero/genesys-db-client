import { all, call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import rootSaga, { getCareersSaga, getCareersWatcher } from '../index'
import { GET_CAREERS } from 'actions/careers/constants'
import { getCareersError, getCareersSuccess } from 'actions/careers'

import { apiPath } from 'mocks'
import { careers } from 'mocks/careers'
import { genericError } from 'mocks/errors'

const action = {
  type: GET_CAREERS,
  payload: {},
}

describe('careers sagas', () => {
  describe('getCareers', () => {
    describe('getCareersSaga', () => {
      let generator

      beforeEach(() => {
        generator = getCareersSaga(action)
      })

      it('should dispatch the correct actions on success', () => {
        const opts = {
          method: 'GET',
          url: `${apiPath}/careers`,
        }
        const callAxiosDescriptor = generator.next().value
        const expectedCallAxiosDescriptor = call(axios, opts)
        expect(callAxiosDescriptor).toEqual(expectedCallAxiosDescriptor)

        const response = {
          data: { data: careers },
        }
        const putSuccessDescriptor = generator.next(response).value
        const expectedPutSuccessDescriptor = put(getCareersSuccess(careers))
        expect(putSuccessDescriptor).toEqual(expectedPutSuccessDescriptor)
      })

      it('should dispatch the correct actions on error', () => {
        generator.next().value
        const putErrorDescriptor = generator.throw(genericError).value
        const expectedPutErrorDescriptor = put(getCareersError(genericError))
        expect(putErrorDescriptor).toEqual(expectedPutErrorDescriptor)
      })

      afterEach(() => {
        const endGeneratorDescriptor = generator.next().value
        expect(endGeneratorDescriptor).toBeUndefined()
      })
    })

    describe('getCareersWatcher', () => {
      it('should listen for the correct action', () => {
        const generator = getCareersWatcher(action)

        const takeLatestDescriptor = generator.next().value
        const expectedTakeLatestDescriptor = takeLatest(
          GET_CAREERS,
          getCareersSaga,
        )
        expect(takeLatestDescriptor).toEqual(expectedTakeLatestDescriptor)
      })
    })
  })

  describe('rootSaga', () => {
    it('should export the correct root', () => {
      const generator = rootSaga({})

      const allDescriptor = generator.next().value
      const expectedAllDescriptor = all([call(getCareersWatcher)])
      expect(allDescriptor).toEqual(expectedAllDescriptor)
    })
  })
})
