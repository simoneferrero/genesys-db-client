import { all, call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import rootSaga, { getArchetypesSaga, getArchetypesWatcher } from '../index'
import { GET_ARCHETYPES } from 'actions/archetypes/constants'
import { getArchetypesError, getArchetypesSuccess } from 'actions/archetypes'

import { apiPath } from 'mocks'
import { archetypes } from 'mocks/archetypes'
import { genericError } from 'mocks/errors'

const action = {
  type: GET_ARCHETYPES,
  payload: {},
}

describe('archetypes sagas', () => {
  describe('getArchetypes', () => {
    describe('getArchetypesSaga', () => {
      let generator

      beforeEach(() => {
        generator = getArchetypesSaga(action)
      })

      it('should dispatch the correct actions on success', () => {
        const opts = {
          method: 'GET',
          url: `${apiPath}/archetypes`,
        }
        const callAxiosDescriptor = generator.next().value
        const expectedCallAxiosDescriptor = call(axios, opts)
        expect(callAxiosDescriptor).toEqual(expectedCallAxiosDescriptor)

        const response = {
          data: archetypes,
        }
        const putSuccessDescriptor = generator.next(response).value
        const expectedPutSuccessDescriptor = put(
          getArchetypesSuccess(archetypes),
        )
        expect(putSuccessDescriptor).toEqual(expectedPutSuccessDescriptor)
      })

      it('should dispatch the correct actions on error', () => {
        generator.next().value
        const putErrorDescriptor = generator.throw(genericError).value
        const expectedPutErrorDescriptor = put(getArchetypesError(genericError))
        expect(putErrorDescriptor).toEqual(expectedPutErrorDescriptor)
      })

      afterEach(() => {
        const endGeneratorDescriptor = generator.next().value
        expect(endGeneratorDescriptor).toBeUndefined()
      })
    })

    describe('getArchetypesWatcher', () => {
      it('should listen for the correct action', () => {
        const generator = getArchetypesWatcher(action)

        const takeLatestDescriptor = generator.next().value
        const expectedTakeLatestDescriptor = takeLatest(
          GET_ARCHETYPES,
          getArchetypesSaga,
        )
        expect(takeLatestDescriptor).toEqual(expectedTakeLatestDescriptor)
      })
    })
  })

  describe('rootSaga', () => {
    it('should export the correct root', () => {
      const generator = rootSaga({})

      const allDescriptor = generator.next().value
      const expectedAllDescriptor = all([call(getArchetypesWatcher)])
      expect(allDescriptor).toEqual(expectedAllDescriptor)
    })
  })
})
