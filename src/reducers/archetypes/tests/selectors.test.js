import {
  archetypesSelector,
  archetypesAllIdsSelector,
  archetypesByIdSelector,
} from '../selectors'

import { store } from 'mocks'

describe('archetypes selectors', () => {
  describe('archetypesSelector', () => {
    it('should return the archetypes', () => {
      const result = archetypesSelector(store)
      const expectedResult = store.get('archetypes')
      expect(result).toEqual(expectedResult)
    })
  })

  describe('archetypesByIdSelector', () => {
    it('should return the archetypes by id', () => {
      const result = archetypesByIdSelector(store)
      const expectedResult = store.getIn(['archetypes', 'byId'])
      expect(result).toEqual(expectedResult)
    })
  })

  describe('archetypesAllIdsSelector', () => {
    it('should return all the archetypes ids', () => {
      const result = archetypesAllIdsSelector(store)
      const expectedResult = store.getIn(['archetypes', 'allIds'])
      expect(result).toEqual(expectedResult)
    })
  })
})
