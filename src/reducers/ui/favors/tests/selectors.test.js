import { favorsUiSelector } from '../selectors'

import { store } from 'mocks'

import uiRecord from 'reducers/ui/records'

describe('favors ui selectors', () => {
  describe('favorsUiSelector', () => {
    it('should return the favors ui', () => {
      const result = favorsUiSelector(store)
      const expectedResult = uiRecord()
      expect(result).toEqual(expectedResult)
    })
  })
})
