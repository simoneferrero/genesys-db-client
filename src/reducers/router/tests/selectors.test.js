import {
  adversaryIdSelector,
  playerCharacterIdSelector,
  routerSelector,
} from '../selectors'

import { fromJS } from 'immutable'

import { store } from 'mocks'
import { adversary1Id } from 'mocks/adversaries'
import { playerCharacter1Id } from 'mocks/playersCharacters'
import { adversaryRouter } from 'mocks/router'

describe('router selectors', () => {
  describe('routerSelector', () => {
    it('should return the router', () => {
      const result = routerSelector(store)
      const expectedResult = store.get('router')
      expect(result).toEqual(expectedResult)
    })
  })

  describe('playerCharacterIdSelector', () => {
    it('should return the current player character ID', () => {
      const result = playerCharacterIdSelector(store)
      const expectedResult = `${playerCharacter1Id}`
      expect(result).toEqual(expectedResult)
    })

    it('should return null if pathname is not defined', () => {
      const modifiedStore = store.setIn(['router', 'location'], fromJS({}))
      const result = playerCharacterIdSelector(modifiedStore)
      expect(result).toBeNull()
    })
  })

  describe('adversaryIdSelector', () => {
    const amendedStore = store.set('router', fromJS(adversaryRouter))

    it('should return the current player character ID', () => {
      const result = adversaryIdSelector(amendedStore)
      const expectedResult = `${adversary1Id}`
      expect(result).toEqual(expectedResult)
    })

    it('should return null if pathname is not defined', () => {
      const modifiedStore = amendedStore.setIn(
        ['router', 'location'],
        fromJS({}),
      )
      const result = adversaryIdSelector(modifiedStore)
      expect(result).toBeNull()
    })
  })
})
