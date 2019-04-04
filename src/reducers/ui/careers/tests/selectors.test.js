import { careersUiSelector } from '../selectors'

import { store } from 'mocks'

import uiRecord from 'reducers/ui/records'

describe('careers ui selectors', () => {
  describe('careersUiSelector', () => {
    it('should return the careers ui', () => {
      const result = careersUiSelector(store)
      const expectedResult = uiRecord()
      expect(result).toEqual(expectedResult)
    })
  })
})
