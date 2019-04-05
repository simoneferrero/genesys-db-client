import { fromJS } from 'immutable'

import { archetypesById, archetypesAllIds } from './archetypes'
import { careersById, careersAllIds } from './careers'
import {
  playersCharactersById,
  playersCharactersAllIds,
} from './playersCharacters'
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
  ui,
})
