import {
  factionsSelector,
  factionsAllIdsSelector,
  factionsByIdSelector,
} from '../selectors'

import { store } from 'mocks'

describe('factions selectors', () => {
  describe('factionsSelector', () => {
    it('should return the factions', () => {
      const result = factionsSelector(store)
      const expectedResult = store.get('factions')
      expect(result).toEqual(expectedResult)
    })
  })

  describe('factionsByIdSelector', () => {
    it('should return the factions by id', () => {
      const result = factionsByIdSelector(store)
      const expectedResult = store.getIn(['factions', 'byId'])
      expect(result).toEqual(expectedResult)
    })
  })

  describe('factionsAllIdsSelector', () => {
    it('should return all the factions ids', () => {
      const result = factionsAllIdsSelector(store)
      const expectedResult = store.getIn(['factions', 'allIds'])
      expect(result).toEqual(expectedResult)
    })
  })
})
