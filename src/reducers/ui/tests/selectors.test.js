import { fromJS } from 'immutable'
import { uiSelector } from '../selectors'

import { store } from 'mocks'
import { ui } from 'mocks/ui'

describe('ui selectors', () => {
  describe('uiSelector', () => {
    it('should return the ui', () => {
      const result = uiSelector(store)
      const expectedResult = fromJS(ui)
      expect(result).toEqual(expectedResult)
    })
  })
})
