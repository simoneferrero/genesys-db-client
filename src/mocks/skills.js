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

export const skills = [skill1, skill2]
export const skillsById = {
  [skill1.id]: new SkillRecord(skill1),
  [skill2.id]: new SkillRecord(skill2),
}
export const skillsAllIds = [skill1.id, skill2.id]
