import WeaponRecord from 'reducers/weapons/records'

export const weapon1 = {
  id: 1,
  name: 'Stun Gun',
  skill: 'Melee',
  damage: 6,
  crit: 5,
  range: 'engaged',
  encumbrance: 1,
  hard_points: 1,
  price: 200,
  rarity: 3,
  special: 'Stun 4, Stun Damage',
  restricted: false,
}
export const weapon2 = {
  id: 2,
  name: 'Fists',
  skill: 'Brawl',
  damage: 2,
  crit: 5,
  range: 'engaged',
  encumbrance: 0,
  hard_points: 0,
  price: 0,
  rarity: 0,
  special: 'Disorient 1, Knockdown',
  restricted: false,
}
export const newWeaponResponse = {
  id: 3,
  name: 'Tantor M-101 Assault Rifle',
  skill: 'Ranged (Heavy)',
  damage: 8,
  crit: 3,
  range: 'long',
  encumbrance: 4,
  hard_points: 3,
  price: 1000,
  rarity: 7,
  special: 'Auto-fire',
  restricted: true,
}
export const newPlayerCharacterWeaponResponse = {
  id: 4,
  mods: null,
  name: newWeaponResponse.name,
  weapon_id: newWeaponResponse.id,
}

export const weaponsAllIds = [weapon1.id, weapon2.id]
export const weaponsById = {
  [weapon1.id]: new WeaponRecord(weapon1),
  [weapon2.id]: new WeaponRecord(weapon2),
}
export const weapons = [weapon1, weapon2]
