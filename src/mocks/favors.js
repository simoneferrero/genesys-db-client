import { faction1, faction2, faction3 } from './factions'

export const favor1 = {
  id: 1,
  type: 'owed',
  size: 'big',
  faction_id: faction1.id,
  description:
    'Aditi owes a big favor to Tián Shun, a mid-level boss in the 14K outfit. Tián helped Aditi establish her life in the Base De Cayambe and set up a fake ID for her that registers her as human. In return, he occasionally asks her to review the “books” from his part of the organization, and once had her patch up one of his wounded enforcers. He has made it clear that he expects more such aid going forward.',
  status: 'incomplete',
}
export const favor2 = {
  id: 2,
  type: 'given',
  size: 'small',
  faction_id: faction2.id,
  description:
    "Aditi's Union membership means she can call on other members of the Union for occasional help (see Union Member talent).",
  status: 'complete',
}
export const newFavor = {
  type: 'owed',
  size: 'normal',
  faction_id: faction3.id,
  description: 'Favor 3 description',
  status: 'incomplete',
}
export const newFavorResponse = {
  id: 3,
  ...newFavor,
}
