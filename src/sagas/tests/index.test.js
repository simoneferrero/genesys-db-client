import { all, call } from 'redux-saga/effects'

import rootSaga from '../index.js'

import adversariesRootSaga from '../adversaries'
import archetypesRootSaga from '../archetypes'
import authenticationRootSaga from '../authentication'
import careersRootSaga from '../careers'
import criticalInjuriesRootSaga from '../criticalInjuries'
import factionsRootSaga from '../factions'
import favorsRootSaga from '../favors'
import playersCharactersRootSaga from '../playersCharacters'
import skillsRootSaga from '../skills'
import talentsRootSaga from '../talents'
import weaponsRootSaga from '../weapons'

describe('rootSaga', () => {
  it('should export the correct root', () => {
    const generator = rootSaga({})

    const allDescriptor = generator.next().value
    const expectedAllDescriptor = all([
      call(adversariesRootSaga),
      call(archetypesRootSaga),
      call(authenticationRootSaga),
      call(careersRootSaga),
      call(criticalInjuriesRootSaga),
      call(factionsRootSaga),
      call(favorsRootSaga),
      call(playersCharactersRootSaga),
      call(skillsRootSaga),
      call(talentsRootSaga),
      call(weaponsRootSaga),
    ])
    expect(allDescriptor).toEqual(expectedAllDescriptor)
  })
})
