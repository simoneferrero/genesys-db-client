import {
  GET_AUTH_INFO_ERROR,
  GET_AUTH_INFO_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
} from 'actions/authentication/constants'

import initialState from './initialState'
import AuthenticationRecord from './records'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
    case GET_AUTH_INFO_SUCCESS: {
      const { authInfo } = payload
      return new AuthenticationRecord(authInfo)
    }

    case LOGOUT:
    case GET_AUTH_INFO_ERROR: {
      return new AuthenticationRecord()
    }

    default: {
      return state
    }
  }
}
