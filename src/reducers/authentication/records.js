import { Record } from 'immutable'

const AuthenticationRecord = Record({
  jwt: null,
  playerCharacterId: null,
  role: null,
  username: null,
})

export default AuthenticationRecord
