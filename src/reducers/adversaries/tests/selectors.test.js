import { fromJS } from 'immutable'

import ReducerRecord from 'reducers/records'
import {
  allAdversariesSelector,
  currentAdversarySelector,
  adversariesSelector,
  adversariesAllIdsSelector,
  adversariesByIdSelector,
} from '../selectors'
import AdversaryRecord from '../records'

import { store } from 'mocks'
import {
  adversary1Id,
  adversarySummary1,
  adversariesAllIds,
  adversariesAugmented,
  adversariesById,
} from 'mocks/adversaries'
import { adversaryRouter } from 'mocks/router'

const amendedStore = store.set('router', fromJS(adversaryRouter))

describe('adversaries selectors', () => {
  describe('adversariesSelector', () => {
    it('should return the adversaries', () => {
      const result = adversariesSelector(amendedStore)
      const expectedResult = amendedStore.get('adversaries')
      expect(result).toEqual(expectedResult)
    })
  })

  describe('adversariesByIdSelector', () => {
    it('should return the augmented adversaries by id', () => {
      const result = adversariesByIdSelector(amendedStore)
      const expectedResult = adversariesById
      expect(result).toEqual(expectedResult)
    })

    it('should not break if other maps have not been fetched yet', () => {
      const modifiedStore = amendedStore
        .set('criticalInjuries', new ReducerRecord())
        .set('skills', new ReducerRecord())
        .set('talents', new ReducerRecord())
        .set('weapons', new ReducerRecord())
      const result = adversariesByIdSelector(modifiedStore)
      const expectedResult = adversariesById
      expect(result).toEqual(expectedResult)
    })
  })

  describe('adversariesAllIdsSelector', () => {
    it('should return all the adversaries ids', () => {
      const result = adversariesAllIdsSelector(amendedStore)
      const expectedResult = adversariesAllIds
      expect(result).toEqual(expectedResult)
    })
  })

  describe('allAdversariesSelector', () => {
    it('should return all the adversaries with extra info', () => {
      const result = allAdversariesSelector(amendedStore)
      const expectedResult = adversariesAugmented
      expect(result).toEqual(expectedResult)
    })
  })

  describe('currentAdversarySelector', () => {
    it('should return the current adversary with extra info', () => {
      const result = currentAdversarySelector(amendedStore)
      const expectedResult = adversarySummary1
      expect(result).toEqual(expectedResult)
    })

    it('should not break if character data has not been fetched yet', () => {
      const modifiedStore = amendedStore.set('adversaries', new ReducerRecord())
      const result = currentAdversarySelector(modifiedStore)
      const expectedResult = new AdversaryRecord({
        id: adversary1Id,
        name: '',
      })
      expect(result).toEqual(expectedResult)
    })
  })
})
