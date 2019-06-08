import React, { memo, Suspense, useEffect } from 'react'
import PropTypes from 'prop-types'
import { criticalInjuryType } from 'types/criticalInjuries'
import { factionType } from 'types/factions'
import { playerCharacterType } from 'types/playersCharacters'
import { talentType } from 'types/talents'
import { uiType } from 'types/ui'
import { weaponType } from 'types/weapons'

import { Helmet } from 'react-helmet'

import Header from 'components/Header'
import PCSheet from 'components/PCSheet'
import Spinner from 'components/Spinner'

/** Summary of all players' characters. */
export const PlayerCharacter = ({
  addFavor,
  addPlayerCharacterCriticalInjury,
  addPlayerCharacterTalent,
  addPlayerCharacterWeapon,
  criticalInjuries,
  editPlayerCharacter,
  factions,
  getArchetypes,
  getAuthInfo,
  getCareers,
  getCriticalInjuries,
  getFactions,
  getPlayerCharacter,
  getSkills,
  getTalents,
  getWeapons,
  playerCharacter,
  playerCharacterId,
  talents,
  ui,
  weapons,
}) => {
  useEffect(() => {
    getAuthInfo()
  }, [getAuthInfo])
  useEffect(() => {
    getPlayerCharacter(playerCharacterId)
  }, [getPlayerCharacter, playerCharacterId])
  useEffect(() => {
    getArchetypes()
  }, [getArchetypes])
  useEffect(() => {
    getCareers()
  }, [getCareers])
  useEffect(() => {
    getCriticalInjuries()
  }, [getCriticalInjuries])
  useEffect(() => {
    getSkills()
  }, [getSkills])
  useEffect(() => {
    getFactions()
  }, [getFactions])
  useEffect(() => {
    getWeapons()
  }, [getWeapons])
  useEffect(() => {
    getTalents()
  }, [getTalents])

  // Form submission handlers
  const handleSubmit = (values, actions) =>
    editPlayerCharacter(playerCharacterId, values, actions)
  const handleAddFavor = (values, actions) =>
    addFavor(playerCharacterId, values, actions)
  const handleAddPlayerCharacterCriticalInjury = (values, actions) =>
    addPlayerCharacterCriticalInjury(playerCharacterId, `${values.id}`, actions)
  const handleAddPlayerCharacterTalent = (values, actions) =>
    addPlayerCharacterTalent(playerCharacterId, `${values.id}`, actions)
  const handleAddPlayerCharacterWeapon = (values, actions) =>
    addPlayerCharacterWeapon(playerCharacterId, `${values.id}`, actions)

  const loading =
    ui.archetypes.loading ||
    ui.careers.loading ||
    ui.criticalInjuries.loading ||
    ui.factions.loading ||
    ui.favors.loading ||
    ui.playersCharacters.loading ||
    ui.skills.loading ||
    ui.talents.loading ||
    ui.weapons.loading

  return (
    <>
      <Helmet title={playerCharacter.name} />
      <div data-testid="player-character">
        {playerCharacter.name && <Header>{playerCharacter.name}</Header>}
        <Suspense fallback={<Spinner />}>
          <PCSheet
            addFavor={handleAddFavor}
            addPlayerCharacterCriticalInjury={
              handleAddPlayerCharacterCriticalInjury
            }
            addPlayerCharacterTalent={handleAddPlayerCharacterTalent}
            addPlayerCharacterWeapon={handleAddPlayerCharacterWeapon}
            criticalInjuries={criticalInjuries}
            factions={factions}
            handleSubmit={handleSubmit}
            playerCharacter={playerCharacter}
            talents={talents}
            weapons={weapons}
          />
        </Suspense>
      </div>
      {loading && <Spinner />}
    </>
  )
}

PlayerCharacter.propTypes = {
  /** Dispatched to add a new favor */
  addFavor: PropTypes.func.isRequired,
  /** Dispatched to add a critical injury */
  addPlayerCharacterCriticalInjury: PropTypes.func.isRequired,
  /** Dispatched to add a talent */
  addPlayerCharacterTalent: PropTypes.func.isRequired,
  /** Dispatched to add a weapon */
  addPlayerCharacterWeapon: PropTypes.func.isRequired,
  /** Critical injuries data */
  criticalInjuries: PropTypes.arrayOf(criticalInjuryType).isRequired,
  /** Dispatched to edit the current player's character */
  editPlayerCharacter: PropTypes.func.isRequired,
  /** Factions data */
  factions: PropTypes.objectOf(factionType).isRequired,
  /** Dispatched to fetch a list of archetypes */
  getArchetypes: PropTypes.func.isRequired,
  /** Dispatched to get user data */
  getAuthInfo: PropTypes.func.isRequired,
  /** Dispatched to fetch a list of careers */
  getCareers: PropTypes.func.isRequired,
  /** Dispatched to fetch a list of critical injuries */
  getCriticalInjuries: PropTypes.func.isRequired,
  /** Dispatched to fetch a list of factions */
  getFactions: PropTypes.func.isRequired,
  /** Dispatched to fetch a list of skills */
  getSkills: PropTypes.func.isRequired,
  /** Dispatched to fetch a list of talents */
  getTalents: PropTypes.func.isRequired,
  /** Dispatched to fetch a list of weapons */
  getWeapons: PropTypes.func.isRequired,
  /** Dispatched to fetch player character data */
  getPlayerCharacter: PropTypes.func.isRequired,
  /** Player character data */
  playerCharacter: playerCharacterType.isRequired,
  /** Current player character ID */
  playerCharacterId: PropTypes.string,
  /** Talents' data */
  talents: PropTypes.objectOf(talentType).isRequired,
  /** App loader and error information */
  ui: PropTypes.objectOf(uiType).isRequired,
  /** Weapons' data */
  weapons: PropTypes.objectOf(weaponType).isRequired,
}

export default memo(PlayerCharacter)
