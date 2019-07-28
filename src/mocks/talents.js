import TalentRecord from 'reducers/talents/records'

export const talent1 = {
  activation: 'Active (Incidental)',
  description:
    'Before making a Medicine check, your character may use this talent to add {success} equal to their ranks in Combat Medicine to the results. After the check is resolved, the target suffers 2 strain for each rank your character has in Combat Medicine.',
  id: 'combat_medicine',
  name: 'Combat Medicine',
  ranked: true,
  tier: 2,
}
export const talent2 = {
  activation: 'Passive',
  description:
    'When your character selects this talent they choose one icebreaker or piece of ice that they own. If they choose an icebreaker, whenever they use that icebreaker to override ice, they add {advantage} to the results. If they choose a piece of ice, whenever someone else attempts to override it, they add {threat} to the results.',
  id: 'custom_code',
  name: 'Custom Code',
  ranked: false,
  tier: 1,
}
export const talent3 = {
  activation: 'Passive',
  description:
    "Each rank of Dedication increases one of your character's characteristics by one. This talent cannot increase a characteristic above 5. You cannot increase the same characteristic with Dedication twice.",
  id: 'dedication',
  name: 'Dedication',
  ranked: true,
  tier: 5,
}

export const newTalentResponse = {
  activation: 'Active (Incidental)',
  description:
    'Once per encounter, your character may use this talent to heal an amount of strain equal to their ranks in Second Wind.',
  id: 'second_wind',
  name: 'Second Wind',
  ranked: true,
  tier: 1,
}

export const characterTalent1 = {
  id: 1,
  notes: '',
  rank: 2,
  talent_id: talent1.id,
}

export const characterTalent2 = {
  id: 2,
  notes: 'Ice wall (ice)',
  talent_id: talent2.id,
}

export const newCharacterTalentResponse = {
  id: 3,
  notes: '',
  rank: 1,
  talent_id: talent3.id,
}

export const talentsAllIds = [talent1.id, talent2.id, talent3.id]
export const talentsById = {
  [talent1.id]: new TalentRecord(talent1),
  [talent2.id]: new TalentRecord(talent2),
  [talent3.id]: new TalentRecord(talent3),
}
export const talents = [talent1, talent2, talent3]
