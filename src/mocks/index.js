import { fromJS } from 'immutable'

import { statusesById, statusesAllIds } from './statuses'

export const tflApiPath = 'http://api.tfl.com'

export const store = fromJS({
  statuses: {
    allIds: statusesAllIds,
    byId: statusesById,
  },
})
