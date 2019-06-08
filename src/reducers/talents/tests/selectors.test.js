import {
  talentsSelector,
  talentsAllIdsSelector,
  talentsByIdSelector,
} from '../selectors'

import { store } from 'mocks'

describe('talents selectors', () => {
  describe('talentsSelector', () => {
    it('should return the talents', () => {
      const result = talentsSelector(store)
      const expectedResult = store.get('talents')
      expect(result).toEqual(expectedResult)
    })
  })

  describe('talentsByIdSelector', () => {
    it('should return the talents by id', () => {
      const result = talentsByIdSelector(store)
      const expectedResult = store.getIn(['talents', 'byId'])
      expect(result).toEqual(expectedResult)
    })
  })

  describe('talentsAllIdsSelector', () => {
    it('should return all the talents ids', () => {
      const result = talentsAllIdsSelector(store)
      const expectedResult = store.getIn(['talents', 'allIds'])
      expect(result).toEqual(expectedResult)
    })
  })
})
