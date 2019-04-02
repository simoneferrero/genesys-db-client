import { fromJS } from 'immutable'

import {
  playerCharactersById,
  playerCharactersAllIds,
} from './playerCharacters'
import { ui } from 'mocks/ui'

export const apiPath = 'http://my-api.com'

export const store = fromJS({
  playerCharacters: {
    allIds: playerCharactersAllIds,
    byId: playerCharactersById,
  },
  ui,
})
