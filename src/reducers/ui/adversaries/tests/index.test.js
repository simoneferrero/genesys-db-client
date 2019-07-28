import { fromJS } from 'immutable'

import reducer, { initialState } from '../index'
import {
  // getAdversaries
  getAdversaries,
  getAdversariesError,
  getAdversariesSuccess,
  // // getAdversary
  // getAdversary,
  // getAdversaryError,
  // getAdversarySuccess,
} from 'actions/adversaries'

import {
  // adversary1Id,
  // adversarySummary1Response,
  adversariesResponse,
} from 'mocks/adversaries'
import { genericError } from 'mocks/errors'
import { uiElement, uiElementError, uiElementLoading } from 'mocks/ui'

describe('adversaries ui reducer', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, {})
    expect(result).toEqual(initialState)
  })

  describe('getAdversaries', () => {
    describe('getAdversaries', () => {
      it('should handle action', () => {
        const result = reducer(initialState, getAdversaries())
        const expectedResult = initialState.mergeDeep(fromJS(uiElementLoading))
        expect(result).toEqual(expectedResult)
      })
    })

    describe('getAdversariesSuccess', () => {
      it('should handle action', () => {
        const result = reducer(
          initialState,
          getAdversariesSuccess(adversariesResponse),
        )
        const expectedResult = initialState.mergeDeep(fromJS(uiElement))
        expect(result).toEqual(expectedResult)
      })
    })

    describe('getAdversariesError', () => {
      it('should handle action', () => {
        const result = reducer(initialState, getAdversariesError(genericError))
        const expectedResult = initialState.mergeDeep(fromJS(uiElementError))
        expect(result).toEqual(expectedResult)
      })
    })
  })

  // describe('getAdversary', () => {
  //   const id = `${adversary1Id}`
  //   describe('getAdversary', () => {
  //     it('should handle action', () => {
  //       const result = reducer(initialState, getAdversary(id))
  //       const expectedResult = initialState.mergeDeep(fromJS(uiElementLoading))
  //       expect(result).toEqual(expectedResult)
  //     })
  //   })
  //
  //   describe('getAdversarySuccess', () => {
  //     it('should handle action', () => {
  //       // TODO: use full character mock
  //       const result = reducer(
  //         initialState,
  //         getAdversarySuccess(id, adversarySummary1Response),
  //       )
  //       const expectedResult = initialState.mergeDeep(fromJS(uiElement))
  //       expect(result).toEqual(expectedResult)
  //     })
  //   })
  //
  //   describe('getAdversaryError', () => {
  //     it('should handle action', () => {
  //       const result = reducer(
  //         initialState,
  //         getAdversaryError(id, genericError),
  //       )
  //       const expectedResult = initialState.mergeDeep(fromJS(uiElementError))
  //       expect(result).toEqual(expectedResult)
  //     })
  //   })
  // })
})
