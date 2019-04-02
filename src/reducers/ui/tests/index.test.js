import { fromJS } from 'immutable'

import uiReducer from '../index'

import { ui } from 'mocks/ui'

describe('ui reducer', () => {
  it('should return the store', () => {
    const result = uiReducer(undefined, {})
    const expectedResult = fromJS(ui)
    expect(result).toEqual(expectedResult)
  })
})
