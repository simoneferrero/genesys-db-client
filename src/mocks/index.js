import { fromJS } from 'immutable'

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
  archetypes: {
    allIds: archetypesAllIds,
    byId: archetypesById,
  },
  careers: {
    allIds: careersAllIds,
    byId: careersById,
  },
  playersCharacters: {
    allIds: playersCharactersAllIds,
    byId: playersCharactersById,
  },
  router: playerCharacterRouter,
  ui,
})

export const emptyStore = fromJS({
  archetypes: {
    allIds: [],
    byId: {},
  },
  careers: {
    allIds: [],
    byId: {},
  },
  playersCharacters: {
    allIds: [],
    byId: {},
  },
  router: initialRouter,
  ui,
})
