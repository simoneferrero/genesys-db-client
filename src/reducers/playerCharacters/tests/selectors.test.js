import {
  playerCharactersSelector,
  playerCharactersAllIdsSelector,
  playerCharactersByIdSelector,
} from '../selectors'

import { store } from 'mocks'

describe('playerCharacters selectors', () => {
  describe('playerCharactersSelector', () => {
    it('should return the playerCharacters', () => {
      const result = playerCharactersSelector(store)
      const expectedResult = store.get('playerCharacters')
      expect(result).toEqual(expectedResult)
    })
  })

  describe('playerCharactersByIdSelector', () => {
    it('should return the playerCharacters by id', () => {
      const result = playerCharactersByIdSelector(store)
      const expectedResult = store.getIn(['playerCharacters', 'byId'])
      expect(result).toEqual(expectedResult)
    })
  })

  describe('playerCharactersAllIdsSelector', () => {
    it('should return all the playerCharacters ids', () => {
      const result = playerCharactersAllIdsSelector(store)
      const expectedResult = store.getIn(['playerCharacters', 'allIds'])
      expect(result).toEqual(expectedResult)
    })
  })
})
