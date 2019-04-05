import { playersCharactersUiSelector } from '../selectors'

import { store } from 'mocks'

import uiRecord from 'reducers/ui/records'

describe('playersCharacters ui selectors', () => {
  describe('playersCharactersUiSelector', () => {
    it('should return the playersCharacters ui', () => {
      const result = playersCharactersUiSelector(store)
      const expectedResult = uiRecord()
      expect(result).toEqual(expectedResult)
    })
  })
})
