import {
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  GET_AUTH_INFO,
  GET_AUTH_INFO_SUCCESS,
  GET_AUTH_INFO_ERROR,
} from './constants'

// Login
export const login = (details, actions) => ({
  type: LOGIN,
  payload: {
    actions,
    details,
  },
})

export const loginSuccess = (authInfo) => ({
  type: LOGIN_SUCCESS,
  payload: {
    authInfo,
  },
})

export const loginError = (error) => ({
  type: LOGIN_ERROR,
  payload: {
    error,
  },
})

// Logout
export const logout = () => ({
  type: LOGOUT,
  payload: {},
})

// Get auth info
export const getAuthInfo = () => ({
  type: GET_AUTH_INFO,
  payload: {},
})

export const getAuthInfoSuccess = (authInfo) => ({
  type: GET_AUTH_INFO_SUCCESS,
  payload: {
    authInfo,
  },
})

export const getAuthInfoError = (error) => ({
  type: GET_AUTH_INFO_ERROR,
  payload: {
    error,
  },
})
