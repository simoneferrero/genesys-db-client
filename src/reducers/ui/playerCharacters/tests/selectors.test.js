import { playerCharactersUiSelector } from '../selectors'

import { store } from 'mocks'

import uiRecord from 'reducers/ui/records'

describe('playerCharacters ui selectors', () => {
  describe('playerCharactersUiSelector', () => {
    it('should return the playerCharacters ui', () => {
      const result = playerCharactersUiSelector(store)
      const expectedResult = uiRecord()
      expect(result).toEqual(expectedResult)
    })
  })
})
