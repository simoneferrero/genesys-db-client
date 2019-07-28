import { adversariesUiSelector } from '../selectors'

import { store } from 'mocks'

import uiRecord from 'reducers/ui/records'

describe('adversaries ui selectors', () => {
  describe('adversariesUiSelector', () => {
    it('should return the adversaries ui', () => {
      const result = adversariesUiSelector(store)
      const expectedResult = uiRecord()
      expect(result).toEqual(expectedResult)
    })
  })
})
