import CareerRecord from 'reducers/careers/records'

export const career1 = {
  id: 'academic',
  name: 'Academic',
}
export const career2 = {
  id: 'bounty_hunter',
  name: 'Bounty Hunter',
}

export const careers = [career1, career2]
export const careersById = {
  [career1.id]: new CareerRecord(career1),
  [career2.id]: new CareerRecord(career2),
}
export const careersAllIds = [career1.id, career2.id]
