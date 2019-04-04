import { all, call } from 'redux-saga/effects'

import rootSaga from '../index.js'

import archetypesRootSaga from '../archetypes'
import careersRootSaga from '../careers'
import playersCharactersRootSaga from '../playersCharacters'

describe('rootSaga', () => {
  it('should export the correct root', () => {
    const generator = rootSaga({})

    const allDescriptor = generator.next().value
    const expectedAllDescriptor = all([
      call(archetypesRootSaga),
      call(careersRootSaga),
      call(playersCharactersRootSaga),
    ])
    expect(allDescriptor).toEqual(expectedAllDescriptor)
  })
})
