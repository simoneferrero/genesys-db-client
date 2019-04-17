export const favor1 = {
  id: 1,
  owed: true,
  type: 'big',
  faction: 'Orgcrime',
  description:
    'Aditi owes a big favor to Tián Shun, a mid-level boss in the 14K outfit. Tián helped Aditi establish her life in the Base De Cayambe and set up a fake ID for her that registers her as human. In return, he occasionally asks her to review the “books” from his part of the organization, and once had her patch up one of his wounded enforcers. He has made it clear that he expects more such aid going forward.',
  completed: false,
}
export const favor2 = {
  id: 2,
  owed: false,
  type: 'small',
  faction: 'NAPD',
  description:
    "Aditi's Union membership means she can call on other members of the Union for occasional help (see Union Member talent).",
  completed: true,
}
export const newFavor = {
  owed: true,
  type: 'normal',
  faction: 'Jinteki',
  description: 'Favor 3 description',
  completed: false,
}
export const newFavorResponse = {
  id: 3,
  ...newFavor,
}
