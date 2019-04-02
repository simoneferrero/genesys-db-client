import { all, call } from 'redux-saga/effects'

import rootSaga from '../index.js'

import playerCharactersRootSaga from '../playerCharacters'

describe('rootSaga', () => {
  it('should export the correct root', () => {
    const generator = rootSaga({})

    const allDescriptor = generator.next().value
    const expectedAllDescriptor = all([call(playerCharactersRootSaga)])
    expect(allDescriptor).toEqual(expectedAllDescriptor)
  })
})
