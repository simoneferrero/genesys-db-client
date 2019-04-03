// API
export const API_PATH = process.env.REACT_APP_API_PATH
export const API_SEGMENTS = {
  PLAYER_CHARACTERS: 'player-characters',
}

// REST
export const REST_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
}

// Head data
export const HEAD_INFO = {
  TITLE: 'GM Compendium',
  CONTENT: 'Application to manage Genesys - Shadow of the Beanstalk GM data',
  PLAYER_CHARACTERS_TITLE: 'PCs',
}

// Character data
export const ATTRIBUTES = {
  WOUNDS: 'wounds',
  STRAIN: 'strain',
  SOAK: 'soak',
  DEFENSE_MELEE: 'melee',
  DEFENSE_RANGED: 'ranged',
}
// TODO: create an array from values if order is necessary

export const CHARACTERISTICS = {
  BRAWN: 'brawn',
  AGILITY: 'agility',
  INTELLECT: 'intellect',
  CUNNING: 'cunning',
  WILLPOWER: 'willpower',
  PRESENCE: 'presence',
}
