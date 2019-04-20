import { all, call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import rootSaga, { addFavorSaga, addFavorWatcher } from '../index'
import { ADD_FAVOR } from 'actions/favors/constants'
import { addFavorError, addFavorSuccess } from 'actions/favors'

import { apiPath, formikActions } from 'mocks'
import { genericError } from 'mocks/errors'
import { newFavor, newFavorResponse } from 'mocks/favors'
import { playerCharacter1Id } from 'mocks/playersCharacters'

const action = {
  type: ADD_FAVOR,
  payload: {
    actions: formikActions,
    favor: newFavor,
    playerCharacterId: playerCharacter1Id,
  },
}

describe('favors sagas', () => {
  describe('addFavor', () => {
    describe('addFavorSaga', () => {
      let generator

      beforeEach(() => {
        generator = addFavorSaga(action)
      })

      it('should dispatch the correct actions on success', () => {
        const headers = { 'Content-Type': 'application/json' }
        const opts = {
          data: JSON.stringify(newFavor),
          headers,
          method: 'POST',
          url: `${apiPath}/players-characters/${playerCharacter1Id}/favor`,
        }
        const callAxiosDescriptor = generator.next().value
        const expectedCallAxiosDescriptor = call(axios, opts)
        expect(callAxiosDescriptor).toEqual(expectedCallAxiosDescriptor)

        const response = {
          data: { data: newFavorResponse },
        }
        const putSuccessDescriptor = generator.next(response).value
        const expectedPutSuccessDescriptor = put(
          addFavorSuccess(newFavorResponse),
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

        const callSetIsNewDescriptor = generator.next().value
        const expectedCallSetIsNewDescriptor = call(
          formikActions.setIsNew,
          false,
        )
        expect(callSetIsNewDescriptor).toEqual(expectedCallSetIsNewDescriptor)
      })

      it('should dispatch the correct actions on error', () => {
        generator.next().value
        const putErrorDescriptor = generator.throw(genericError).value
        const expectedPutErrorDescriptor = put(addFavorError(genericError))
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

    describe('addFavorWatcher', () => {
      it('should listen for the correct action', () => {
        const generator = addFavorWatcher(action)

        const takeLatestDescriptor = generator.next().value
        const expectedTakeLatestDescriptor = takeLatest(ADD_FAVOR, addFavorSaga)
        expect(takeLatestDescriptor).toEqual(expectedTakeLatestDescriptor)
      })
    })
  })

  describe('rootSaga', () => {
    it('should export the correct root', () => {
      const generator = rootSaga({})

      const allDescriptor = generator.next().value
      const expectedAllDescriptor = all([call(addFavorWatcher)])
      expect(allDescriptor).toEqual(expectedAllDescriptor)
    })
  })
})
