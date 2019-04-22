import { factionsUiSelector } from '../selectors'

import { store } from 'mocks'

import uiRecord from 'reducers/ui/records'

describe('factions ui selectors', () => {
  describe('factionsUiSelector', () => {
    it('should return the factions ui', () => {
      const result = factionsUiSelector(store)
      const expectedResult = uiRecord()
      expect(result).toEqual(expectedResult)
    })
  })
})
