import { fromJS } from 'immutable'
import {
  allPlayersCharactersSelector,
  currentPlayerCharacterSelector,
  playersCharactersSelector,
  playersCharactersAllIdsSelector,
  playersCharactersByIdSelector,
} from '../selectors'

import { store } from 'mocks'
import {
  augmentedPlayersCharacters,
  augmentedPlayersCharactersById,
  incompletePlayersCharactersById,
  playerCharacter1Augmented,
} from 'mocks/playersCharacters'

const emptyStoreKey = fromJS({
  allIds: [],
  byId: {},
})

describe('playersCharacters selectors', () => {
  describe('playersCharactersSelector', () => {
    it('should return the playersCharacters', () => {
      const result = playersCharactersSelector(store)
      const expectedResult = store.get('playersCharacters')
      expect(result).toEqual(expectedResult)
    })
  })

  describe('playersCharactersByIdSelector', () => {
    it('should return the augmented playersCharacters by id', () => {
      const result = playersCharactersByIdSelector(store)
      const expectedResult = fromJS(augmentedPlayersCharactersById)
      expect(result).toEqual(expectedResult)
    })

    it('should not break if archetypes or careers have not been fetched yet', () => {
      const modifiedStore = store
        .set('archetypes', emptyStoreKey)
        .set('careers', emptyStoreKey)
      const result = playersCharactersByIdSelector(modifiedStore)
      const expectedResult = fromJS(incompletePlayersCharactersById)
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

  describe('allPlayersCharactersSelector', () => {
    it('should return all the playersCharacters with extra info', () => {
      const result = allPlayersCharactersSelector(store)
      const expectedResult = fromJS(augmentedPlayersCharacters)
      expect(result).toEqual(expectedResult)
    })
  })

  describe('currentPlayerCharacterSelector', () => {
    it('should return the current playerCharacter with extra info', () => {
      const result = currentPlayerCharacterSelector(store)
      const expectedResult = fromJS(playerCharacter1Augmented)
      expect(result).toEqual(expectedResult)
    })

    it('should not break if character data has not been fetched yet', () => {
      const modifiedStore = store.set('playersCharacters', emptyStoreKey)
      const result = currentPlayerCharacterSelector(modifiedStore)
      const expectedResult = {}
      expect(result).toEqual(expectedResult)
    })
  })
})
