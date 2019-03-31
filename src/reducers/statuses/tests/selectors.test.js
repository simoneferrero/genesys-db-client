import {
  statusesSelector,
  statusesAllIdsSelector,
  statusesByIdSelector,
} from '../selectors'

import { store } from 'mocks'

describe('statuses selectors', () => {
  describe('statusesSelector', () => {
    it('should return the statuses', () => {
      const result = statusesSelector(store)
      const expectedResult = store.get('statuses')
      expect(result).toEqual(expectedResult)
    })
  })

  describe('statusesByIdSelector', () => {
    it('should return the statuses by id', () => {
      const result = statusesByIdSelector(store)
      const expectedResult = store.getIn(['statuses', 'byId'])
      expect(result).toEqual(expectedResult)
    })
  })

  describe('statusesAllIdsSelector', () => {
    it('should return all the statuses ids', () => {
      const result = statusesAllIdsSelector(store)
      const expectedResult = store.getIn(['statuses', 'allIds'])
      expect(result).toEqual(expectedResult)
    })
  })
})
