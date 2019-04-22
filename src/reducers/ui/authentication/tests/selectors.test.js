import { authenticationUiSelector } from '../selectors'

import { store } from 'mocks'

import uiRecord from 'reducers/ui/records'

describe('authentication ui selectors', () => {
  describe('authenticationUiSelector', () => {
    it('should return the authentication ui', () => {
      const result = authenticationUiSelector(store)
      const expectedResult = uiRecord()
      expect(result).toEqual(expectedResult)
    })
  })
})
