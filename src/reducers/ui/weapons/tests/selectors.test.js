import { weaponsUiSelector } from '../selectors'

import { store } from 'mocks'

import uiRecord from 'reducers/ui/records'

describe('weapons ui selectors', () => {
  describe('weaponsUiSelector', () => {
    it('should return the weapons ui', () => {
      const result = weaponsUiSelector(store)
      const expectedResult = uiRecord()
      expect(result).toEqual(expectedResult)
    })
  })
})
