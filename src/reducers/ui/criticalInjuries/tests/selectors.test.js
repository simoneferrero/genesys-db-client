import { criticalInjuriesUiSelector } from '../selectors'

import { store } from 'mocks'

import uiRecord from 'reducers/ui/records'

describe('criticalInjuries ui selectors', () => {
  describe('criticalInjuriesUiSelector', () => {
    it('should return the criticalInjuries ui', () => {
      const result = criticalInjuriesUiSelector(store)
      const expectedResult = uiRecord()
      expect(result).toEqual(expectedResult)
    })
  })
})
