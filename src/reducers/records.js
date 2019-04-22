import { Map, List, Record } from 'immutable'

const ReducerRecord = Record({
  allIds: List(),
  byId: Map(),
})

export default ReducerRecord
