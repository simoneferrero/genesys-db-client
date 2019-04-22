import { fromJS, List, Map } from 'immutable'

import ReducerRecord from 'reducers/records'

import { archetypesById, archetypesAllIds } from './archetypes'
import { careersById, careersAllIds } from './careers'
import { factionsById, factionsAllIds } from './factions'
import {
  playersCharactersById,
  playersCharactersAllIds,
} from './playersCharacters'
import { initialRouter, playerCharacterRouter } from './router'
import { skillsById, skillsAllIds } from './skills'
import { ui } from './ui'

export const apiPath = 'http://my-api.com'

export const store = fromJS({
  archetypes: new ReducerRecord({
    allIds: List(archetypesAllIds),
    byId: Map(archetypesById),
  }),
  careers: new ReducerRecord({
    allIds: List(careersAllIds),
    byId: Map(careersById),
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
  ui,
})

export const emptyStore = fromJS({
  archetypes: new ReducerRecord(),
  careers: new ReducerRecord(),
  factions: new ReducerRecord(),
  playersCharacters: new ReducerRecord(),
  router: initialRouter,
  skills: new ReducerRecord(),
  ui,
})

export const formikActions = {
  setEditing: () => {},
  setErrors: () => {},
  setFieldTouched: () => {},
  setFieldValue: () => {},
  setIsNew: () => {},
  setSubmitting: () => {},
}
