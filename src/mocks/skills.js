import SkillRecord from 'reducers/skills/records'

export const skill1 = {
  id: 'athletics',
  name: 'Athletics',
  characteristic: 'brawn',
  type: 'general',
  description: 'TBD', // TODO: update with better description
}
export const skill2 = {
  id: 'brawl',
  name: 'Brawl',
  characteristic: 'brawn',
  type: 'combat',
  description: 'TBD', // TODO: update with better description
}
export const skill3 = {
  id: 'computers_hacking',
  name: 'Computers (Hacking)',
  characteristic: 'intellect',
  type: 'general',
  description: 'TBD', // TODO: update with better description
}
export const skill4 = {
  id: 'medicine',
  name: 'Medicine',
  characteristic: 'intellect',
  type: 'general',
  description: 'TBD', // TODO: update with better description
}
export const skill5 = {
  id: 'perception',
  name: 'Perception',
  characteristic: 'cunning',
  type: 'general',
  description: 'TBD', // TODO: update with better description
}
export const skill6 = {
  id: 'stealth',
  name: 'Stealth',
  characteristic: 'agility',
  type: 'general',
  description: 'TBD', // TODO: update with better description
}

export const skills = [skill1, skill2, skill3, skill4, skill5, skill6]
export const skillsById = {
  [skill1.id]: new SkillRecord(skill1),
  [skill2.id]: new SkillRecord(skill2),
  [skill3.id]: new SkillRecord(skill3),
  [skill4.id]: new SkillRecord(skill4),
  [skill5.id]: new SkillRecord(skill5),
  [skill6.id]: new SkillRecord(skill6),
}
export const skillsAllIds = [
  skill1.id,
  skill2.id,
  skill3.id,
  skill4.id,
  skill5.id,
  skill6.id,
]
