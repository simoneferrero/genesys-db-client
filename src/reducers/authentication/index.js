import {
  GET_AUTH_INFO_ERROR,
  GET_AUTH_INFO_SUCCESS,
} from 'actions/authentication/constants'

import initialState from './initialState'
import AuthenticationRecord from './records'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_AUTH_INFO_SUCCESS: {
      const { authInfo } = payload
      return new AuthenticationRecord(authInfo)
    }

    case GET_AUTH_INFO_ERROR: {
      return new AuthenticationRecord()
    }

    default: {
      return state
    }
  }
}
