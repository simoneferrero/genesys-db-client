import { all, call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import rootSaga, { getSkillsSaga, getSkillsWatcher } from '../index'
import { GET_SKILLS } from 'actions/skills/constants'
import { getSkillsError, getSkillsSuccess } from 'actions/skills'

import { apiPath } from 'mocks'
import { skills } from 'mocks/skills'
import { genericError } from 'mocks/errors'

const action = {
  type: GET_SKILLS,
  payload: {},
}

describe('skills sagas', () => {
  describe('getSkills', () => {
    describe('getSkillsSaga', () => {
      let generator

      beforeEach(() => {
        generator = getSkillsSaga(action)
      })

      it('should dispatch the correct actions on success', () => {
        const opts = {
          method: 'GET',
          url: `${apiPath}/skills`,
        }
        const callAxiosDescriptor = generator.next().value
        const expectedCallAxiosDescriptor = call(axios, opts)
        expect(callAxiosDescriptor).toEqual(expectedCallAxiosDescriptor)

        const response = {
          data: { data: skills },
        }
        const putSuccessDescriptor = generator.next(response).value
        const expectedPutSuccessDescriptor = put(getSkillsSuccess(skills))
        expect(putSuccessDescriptor).toEqual(expectedPutSuccessDescriptor)
      })

      it('should dispatch the correct actions on error', () => {
        generator.next().value
        const putErrorDescriptor = generator.throw(genericError).value
        const expectedPutErrorDescriptor = put(getSkillsError(genericError))
        expect(putErrorDescriptor).toEqual(expectedPutErrorDescriptor)
      })

      afterEach(() => {
        const endGeneratorDescriptor = generator.next().value
        expect(endGeneratorDescriptor).toBeUndefined()
      })
    })

    describe('getSkillsWatcher', () => {
      it('should listen for the correct action', () => {
        const generator = getSkillsWatcher(action)

        const takeLatestDescriptor = generator.next().value
        const expectedTakeLatestDescriptor = takeLatest(
          GET_SKILLS,
          getSkillsSaga,
        )
        expect(takeLatestDescriptor).toEqual(expectedTakeLatestDescriptor)
      })
    })
  })

  describe('rootSaga', () => {
    it('should export the correct root', () => {
      const generator = rootSaga({})

      const allDescriptor = generator.next().value
      const expectedAllDescriptor = all([call(getSkillsWatcher)])
      expect(allDescriptor).toEqual(expectedAllDescriptor)
    })
  })
})
