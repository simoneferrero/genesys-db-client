import {
  criticalInjuriesSelector,
  criticalInjuriesAllIdsSelector,
  criticalInjuriesByIdSelector,
  criticalInjuriesOrderedSelector,
} from '../selectors'

import { store } from 'mocks'
import { criticalInjuriesOrdered } from 'mocks/criticalInjuries'

describe('criticalInjuries selectors', () => {
  describe('criticalInjuriesSelector', () => {
    it('should return the criticalInjuries', () => {
      const result = criticalInjuriesSelector(store)
      const expectedResult = store.get('criticalInjuries')
      expect(result).toEqual(expectedResult)
    })
  })

  describe('criticalInjuriesByIdSelector', () => {
    it('should return the criticalInjuries by id', () => {
      const result = criticalInjuriesByIdSelector(store)
      const expectedResult = store.getIn(['criticalInjuries', 'byId'])
      expect(result).toEqual(expectedResult)
    })
  })

  describe('criticalInjuriesAllIdsSelector', () => {
    it('should return all the criticalInjuries ids', () => {
      const result = criticalInjuriesAllIdsSelector(store)
      const expectedResult = store.getIn(['criticalInjuries', 'allIds'])
      expect(result).toEqual(expectedResult)
    })
  })

  describe('criticalInjuriesOrderedSelector', () => {
    it('should return all the ordered criticalInjuries', () => {
      const result = criticalInjuriesOrderedSelector(store)
      expect(result).toEqual(criticalInjuriesOrdered)
    })
  })
})
