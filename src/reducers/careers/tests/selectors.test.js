import {
  careersSelector,
  careersAllIdsSelector,
  careersByIdSelector,
} from '../selectors'

import { store } from 'mocks'

describe('careers selectors', () => {
  describe('careersSelector', () => {
    it('should return the careers', () => {
      const result = careersSelector(store)
      const expectedResult = store.get('careers')
      expect(result).toEqual(expectedResult)
    })
  })

  describe('careersByIdSelector', () => {
    it('should return the careers by id', () => {
      const result = careersByIdSelector(store)
      const expectedResult = store.getIn(['careers', 'byId'])
      expect(result).toEqual(expectedResult)
    })
  })

  describe('careersAllIdsSelector', () => {
    it('should return all the careers ids', () => {
      const result = careersAllIdsSelector(store)
      const expectedResult = store.getIn(['careers', 'allIds'])
      expect(result).toEqual(expectedResult)
    })
  })
})
