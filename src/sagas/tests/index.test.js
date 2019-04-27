import { all, call } from 'redux-saga/effects'

import rootSaga from '../index.js'

import archetypesRootSaga from '../archetypes'
import authenticationRootSaga from '../authentication'
import careersRootSaga from '../careers'
import factionsRootSaga from '../factions'
import favorsRootSaga from '../favors'
import playersCharactersRootSaga from '../playersCharacters'
import skillsRootSaga from '../skills'
import weaponsRootSaga from '../weapons'

describe('rootSaga', () => {
  it('should export the correct root', () => {
    const generator = rootSaga({})

    const allDescriptor = generator.next().value
    const expectedAllDescriptor = all([
      call(archetypesRootSaga),
      call(authenticationRootSaga),
      call(careersRootSaga),
      call(factionsRootSaga),
      call(favorsRootSaga),
      call(playersCharactersRootSaga),
      call(skillsRootSaga),
      call(weaponsRootSaga),
    ])
    expect(allDescriptor).toEqual(expectedAllDescriptor)
  })
})
