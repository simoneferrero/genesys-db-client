import { talentsUiSelector } from '../selectors'

import { store } from 'mocks'

import uiRecord from 'reducers/ui/records'

describe('talents ui selectors', () => {
  describe('talentsUiSelector', () => {
    it('should return the talents ui', () => {
      const result = talentsUiSelector(store)
      const expectedResult = uiRecord()
      expect(result).toEqual(expectedResult)
    })
  })
})
