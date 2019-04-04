import {
  playersCharactersSelector,
  playersCharactersAllIdsSelector,
  playersCharactersByIdSelector,
} from '../selectors'

import { store } from 'mocks'

describe('playersCharacters selectors', () => {
  describe('playersCharactersSelector', () => {
    it('should return the playersCharacters', () => {
      const result = playersCharactersSelector(store)
      const expectedResult = store.get('playersCharacters')
      expect(result).toEqual(expectedResult)
    })
  })

  describe('playersCharactersByIdSelector', () => {
    it('should return the playersCharacters by id', () => {
      const result = playersCharactersByIdSelector(store)
      const expectedResult = store.getIn(['playersCharacters', 'byId'])
      expect(result).toEqual(expectedResult)
    })
  })

  describe('playersCharactersAllIdsSelector', () => {
    it('should return all the playersCharacters ids', () => {
      const result = playersCharactersAllIdsSelector(store)
      const expectedResult = store.getIn(['playersCharacters', 'allIds'])
      expect(result).toEqual(expectedResult)
    })
  })
})
