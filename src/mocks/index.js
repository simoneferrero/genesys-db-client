import { fromJS, List, Map } from 'immutable'

import ReducerRecord from 'reducers/records'

import { archetypesById, archetypesAllIds } from './archetypes'
import { careersById, careersAllIds } from './careers'
import {
  playersCharactersById,
  playersCharactersAllIds,
} from './playersCharacters'
import { initialRouter, playerCharacterRouter } from './router'
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
  playersCharacters: new ReducerRecord({
    allIds: List(playersCharactersAllIds),
    byId: Map(playersCharactersById),
  }),
  router: playerCharacterRouter,
  ui,
})

export const emptyStore = fromJS({
  archetypes: new ReducerRecord(),
  careers: new ReducerRecord(),
  playersCharacters: new ReducerRecord(),
  router: initialRouter,
  ui,
})

export const formikActions = {
  setEditing: () => {},
  setErrors: () => {},
  setFieldTouched: () => {},
  setFieldValue: () => {},
  setSubmitting: () => {},
}
