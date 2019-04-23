import React, { memo, Suspense, useEffect } from 'react'
import PropTypes from 'prop-types'
import { factionType } from 'types/factions'
import { playerCharacterType } from 'types/playersCharacters'
import { uiType } from 'types/ui'

import { Helmet } from 'react-helmet'

import Header from 'components/Header'
import PCSheet from 'components/PCSheet'
import Spinner from 'components/Spinner'

/** Summary of all players' characters. */
export const PlayerCharacter = ({
  addFavor,
  editPlayerCharacter,
  factions,
  factionsUi,
  favorsUi,
  getArchetypes,
  getAuthInfo,
  getCareers,
  getFactions,
  getPlayerCharacter,
  getSkills,
  playerCharacter,
  playerCharacterId,
  playersCharactersUi,
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
    getSkills()
  }, [getSkills])
  useEffect(() => {
    getFactions()
  }, [getFactions])

  // Form submission handlers
  const handleSubmit = (values, actions) =>
    editPlayerCharacter(playerCharacterId, values, actions)
  const handleAddFavor = (values, actions) =>
    addFavor(playerCharacterId, values, actions)

  const loading =
    playersCharactersUi.loading || favorsUi.loading || factionsUi.loading

  return (
    <>
      <Helmet title={playerCharacter.name} />
      <div data-testid="player-character">
        {playerCharacter.name && <Header>{playerCharacter.name}</Header>}
        <Suspense fallback={<Spinner />}>
          <PCSheet
            addFavor={handleAddFavor}
            factions={factions}
            handleSubmit={handleSubmit}
            playerCharacter={playerCharacter}
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
  /** Dispatched to edit the current player's character */
  editPlayerCharacter: PropTypes.func.isRequired,
  /** Factions data */
  factions: PropTypes.objectOf(factionType).isRequired,
  /** Factions loader and error information */
  factionsUi: uiType.isRequired,
  /** Favors loader and error information */
  favorsUi: uiType.isRequired,
  /** Dispatched to fetch a list of archetypes */
  getArchetypes: PropTypes.func.isRequired,
  /** Dispatched to get user data */
  getAuthInfo: PropTypes.func.isRequired,
  /** Dispatched to fetch a list of careers */
  getCareers: PropTypes.func.isRequired,
  /** Dispatched to fetch a list of factions */
  getFactions: PropTypes.func.isRequired,
  /** Dispatched to fetch a list of skills */
  getSkills: PropTypes.func.isRequired,
  /** Dispatched to fetch player character data */
  getPlayerCharacter: PropTypes.func.isRequired,
  /** Player character data */
  playerCharacter: playerCharacterType.isRequired,
  /** Current player character ID */
  playerCharacterId: PropTypes.string,
  /** Players' characters loader and error information */
  playersCharactersUi: uiType.isRequired,
}

export default memo(PlayerCharacter)
