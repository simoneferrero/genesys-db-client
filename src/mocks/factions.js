import FactionRecord from 'reducers/factions/records'

export const faction1 = {
  id: 'orgcrime',
  name: 'Orgcrime',
  description: 'Orgcrime description',
}
export const faction2 = {
  id: 'napd',
  name: 'NAPD',
  description: 'NAPD description',
}
export const faction3 = {
  id: 'jinteki',
  name: 'Jinteki',
  description: 'Jinteki description',
}

export const factions = [faction1, faction2, faction3]
export const factionsById = {
  [faction1.id]: new FactionRecord(faction1),
  [faction2.id]: new FactionRecord(faction2),
  [faction3.id]: new FactionRecord(faction3),
}
export const factionsAllIds = [faction1.id, faction2.id, faction3.id]
