import {
  skillsSelector,
  skillsAllIdsSelector,
  skillsByIdSelector,
} from '../selectors'

import { store } from 'mocks'

describe('skills selectors', () => {
  describe('skillsSelector', () => {
    it('should return the skills', () => {
      const result = skillsSelector(store)
      const expectedResult = store.get('skills')
      expect(result).toEqual(expectedResult)
    })
  })

  describe('skillsByIdSelector', () => {
    it('should return the skills by id', () => {
      const result = skillsByIdSelector(store)
      const expectedResult = store.getIn(['skills', 'byId'])
      expect(result).toEqual(expectedResult)
    })
  })

  describe('skillsAllIdsSelector', () => {
    it('should return all the skills ids', () => {
      const result = skillsAllIdsSelector(store)
      const expectedResult = store.getIn(['skills', 'allIds'])
      expect(result).toEqual(expectedResult)
    })
  })
})
