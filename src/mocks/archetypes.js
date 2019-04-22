import ArchetypeRecord from 'reducers/archetypes/records'

export const archetype1 = {
  id: 'clone',
  name: 'Clone',
}
export const archetype2 = {
  id: 'g_mod',
  name: 'G-Mod',
}

export const archetypes = [archetype1, archetype2]
export const archetypesById = {
  [archetype1.id]: new ArchetypeRecord(archetype1),
  [archetype2.id]: new ArchetypeRecord(archetype2),
}
export const archetypesAllIds = [archetype1.id, archetype2.id]
