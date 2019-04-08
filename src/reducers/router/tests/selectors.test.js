import { playerCharacterIdSelector, routerSelector } from '../selectors'

import { store } from 'mocks'
import { playerCharacter1 } from 'mocks/playersCharacters'

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
      const expectedResult = `${playerCharacter1.id}`
      expect(result).toEqual(expectedResult)
    })
  })
})
