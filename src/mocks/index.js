import { fromJS, List, Map } from 'immutable'

import ReducerRecord from 'reducers/records'
import AuthenticationRecord from 'reducers/authentication/records'

import { archetypesById, archetypesAllIds } from './archetypes'
import { authInfoResponse } from './authentication'
import { careersById, careersAllIds } from './careers'
import {
  criticalInjuriesById,
  criticalInjuriesAllIds,
} from './criticalInjuries'
import { factionsById, factionsAllIds } from './factions'
import {
  playersCharactersById,
  playersCharactersAllIds,
} from './playersCharacters'
import { initialRouter, playerCharacterRouter } from './router'
import { skillsById, skillsAllIds } from './skills'
import { talentsById, talentsAllIds } from './talents'
import { ui } from './ui'
import { weaponsById, weaponsAllIds } from './weapons'

export const apiPath = 'http://my-api.com'

export const store = fromJS({
  archetypes: new ReducerRecord({
    allIds: List(archetypesAllIds),
    byId: Map(archetypesById),
  }),
  authentication: new AuthenticationRecord(authInfoResponse),
  careers: new ReducerRecord({
    allIds: List(careersAllIds),
    byId: Map(careersById),
  }),
  criticalInjuries: new ReducerRecord({
    allIds: List(criticalInjuriesAllIds),
    byId: Map(criticalInjuriesById),
  }),
  factions: new ReducerRecord({
    allIds: List(factionsAllIds),
    byId: Map(factionsById),
  }),
  playersCharacters: new ReducerRecord({
    allIds: List(playersCharactersAllIds),
    byId: Map(playersCharactersById),
  }),
  router: playerCharacterRouter,
  skills: new ReducerRecord({
    allIds: List(skillsAllIds),
    byId: Map(skillsById),
  }),
  talents: new ReducerRecord({
    allIds: List(talentsAllIds),
    byId: Map(talentsById),
  }),
  ui,
  weapons: new ReducerRecord({
    allIds: List(weaponsAllIds),
    byId: Map(weaponsById),
  }),
})

export const emptyStore = fromJS({
  archetypes: new ReducerRecord(),
  authentication: new AuthenticationRecord(),
  careers: new ReducerRecord(),
  criticalInjuries: new ReducerRecord(),
  factions: new ReducerRecord(),
  playersCharacters: new ReducerRecord(),
  router: initialRouter,
  skills: new ReducerRecord(),
  talents: new ReducerRecord(),
  ui,
  weapons: new ReducerRecord(),
})

export const formikActions = {
  resetForm: () => {},
  setEditing: () => {},
  setErrors: () => {},
  setFieldTouched: () => {},
  setFieldValue: () => {},
  setIsNew: () => {},
  setSubmitting: () => {},
}
