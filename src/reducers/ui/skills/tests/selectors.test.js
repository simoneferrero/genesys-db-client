import { skillsUiSelector } from '../selectors'

import { store } from 'mocks'

import uiRecord from 'reducers/ui/records'

describe('skills ui selectors', () => {
  describe('skillsUiSelector', () => {
    it('should return the skills ui', () => {
      const result = skillsUiSelector(store)
      const expectedResult = uiRecord()
      expect(result).toEqual(expectedResult)
    })
  })
})
