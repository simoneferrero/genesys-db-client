import { authenticationSelector } from '../selectors'

import { store } from 'mocks'

describe('authentication selectors', () => {
  describe('authenticationSelector', () => {
    it('should return the authentication', () => {
      const result = authenticationSelector(store)
      const expectedResult = store.get('authentication')
      expect(result).toEqual(expectedResult)
    })
  })
})
