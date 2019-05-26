import ReducerRecord from 'reducers/records'
import {
  allPlayersCharactersSelector,
  currentPlayerCharacterSelector,
  playersCharactersSelector,
  playersCharactersAllIdsSelector,
  playersCharactersByIdSelector,
} from '../selectors'
import PlayerCharacterRecord from '../records'

import { store } from 'mocks'
import {
  playerCharacter1Id,
  playerCharacterSummary1Augmented,
  playersCharactersAllIds,
  playersCharactersAugmented,
  playersCharactersById,
  playersCharactersByIdAugmented,
} from 'mocks/playersCharacters'
import ArchetypeRecord from 'reducers/archetypes/records'
import CareerRecord from 'reducers/careers/records'

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
      const expectedResult = playersCharactersByIdAugmented
      expect(result).toEqual(expectedResult)
    })

    it('should not break if other maps have not been fetched yet', () => {
      const modifiedStore = store
        .set('archetypes', new ReducerRecord())
        .set('careers', new ReducerRecord())
        .set('criticalInjuries', new ReducerRecord())
        .set('skills', new ReducerRecord())
        .set('talents', new ReducerRecord())
        .set('weapons', new ReducerRecord())
      const result = playersCharactersByIdSelector(modifiedStore)
      const expectedResult = playersCharactersById
      expect(result).toEqual(expectedResult)
    })
  })

  describe('playersCharactersAllIdsSelector', () => {
    it('should return all the playersCharacters ids', () => {
      const result = playersCharactersAllIdsSelector(store)
      const expectedResult = playersCharactersAllIds
      expect(result).toEqual(expectedResult)
    })
  })

  describe('allPlayersCharactersSelector', () => {
    it('should return all the playersCharacters with extra info', () => {
      const result = allPlayersCharactersSelector(store)
      const expectedResult = playersCharactersAugmented
      expect(result).toEqual(expectedResult)
    })
  })

  describe('currentPlayerCharacterSelector', () => {
    it('should return the current playerCharacter with extra info', () => {
      const result = currentPlayerCharacterSelector(store)
      const expectedResult = playerCharacterSummary1Augmented
      expect(result).toEqual(expectedResult)
    })

    it('should not break if character data has not been fetched yet', () => {
      const modifiedStore = store.set('playersCharacters', new ReducerRecord())
      const result = currentPlayerCharacterSelector(modifiedStore)
      const expectedResult = new PlayerCharacterRecord({
        archetype: new ArchetypeRecord(),
        career: new CareerRecord(),
        id: playerCharacter1Id,
        name: '',
        player_name: '',
      })
      expect(result).toEqual(expectedResult)
    })
  })
})
