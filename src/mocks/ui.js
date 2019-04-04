import uiRecord from 'reducers/ui/records'

import { genericError } from 'mocks/errors'

export const ui = {
  archetypes: uiRecord(),
  careers: uiRecord(),
  playersCharacters: uiRecord(),
}

export const uiElement = {
  loading: false,
  error: null,
}

export const uiElementLoading = {
  loading: true,
  error: null,
}

export const uiElementError = {
  loading: false,
  error: genericError,
}
