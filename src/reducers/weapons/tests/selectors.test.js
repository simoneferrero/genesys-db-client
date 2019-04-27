import {
  weaponsSelector,
  weaponsAllIdsSelector,
  weaponsByIdSelector,
} from '../selectors'

import { store } from 'mocks'

describe('weapons selectors', () => {
  describe('weaponsSelector', () => {
    it('should return the weapons', () => {
      const result = weaponsSelector(store)
      const expectedResult = store.get('weapons')
      expect(result).toEqual(expectedResult)
    })
  })

  describe('weaponsByIdSelector', () => {
    it('should return the weapons by id', () => {
      const result = weaponsByIdSelector(store)
      const expectedResult = store.getIn(['weapons', 'byId'])
      expect(result).toEqual(expectedResult)
    })
  })

  describe('weaponsAllIdsSelector', () => {
    it('should return all the weapons ids', () => {
      const result = weaponsAllIdsSelector(store)
      const expectedResult = store.getIn(['weapons', 'allIds'])
      expect(result).toEqual(expectedResult)
    })
  })
})
