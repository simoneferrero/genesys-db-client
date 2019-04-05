import { archetypesUiSelector } from '../selectors'

import { store } from 'mocks'

import uiRecord from 'reducers/ui/records'

describe('archetypes ui selectors', () => {
  describe('archetypesUiSelector', () => {
    it('should return the archetypes ui', () => {
      const result = archetypesUiSelector(store)
      const expectedResult = uiRecord()
      expect(result).toEqual(expectedResult)
    })
  })
})
