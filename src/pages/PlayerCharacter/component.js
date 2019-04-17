import React, { memo, Suspense, useEffect } from 'react'
import PropTypes from 'prop-types'
import { playerCharacterType } from 'types/playersCharacters'
import { uiType } from 'types/ui'

import { Helmet } from 'react-helmet'

import Header from 'components/Header'
import PCSheet from 'components/PCSheet'
import Spinner from 'components/Spinner'

/** Summary of all players' characters. */
export const PlayerCharacter = ({
  editPlayerCharacter,
  favorsUi,
  getArchetypes,
  getCareers,
  getPlayerCharacter,
  getSkills,
  playerCharacter,
  playerCharacterId,
  playersCharactersUi,
}) => {
  useEffect(() => {
    getArchetypes()
    getCareers()
    getPlayerCharacter(playerCharacterId)
    getSkills()
  }, [])

  const handleSubmit = (values, actions) =>
    editPlayerCharacter(playerCharacterId, values, actions)

  const loading = playersCharactersUi.loading || favorsUi.loading

  return (
    <>
      <Helmet title={playerCharacter.name} />
      <div data-testid="player-character">
        {playerCharacter.name && <Header>{playerCharacter.name}</Header>}
        <Suspense fallback={<Spinner />}>
          <PCSheet
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
  /** Dispatched to edit the current player's character */
  editPlayerCharacter: PropTypes.func.isRequired,
  /** Favors loader and error information */
  favorsUi: uiType.isRequired,
  /** Dispatched to fetch a list of archetypes */
  getArchetypes: PropTypes.func.isRequired,
  /** Dispatched to fetch a list of careers */
  getCareers: PropTypes.func.isRequired,
  /** Dispatched to fetch a list of skills */
  getSkills: PropTypes.func.isRequired,
  /** Dispatched to fetch player character data */
  getPlayerCharacter: PropTypes.func.isRequired,
  /** Player character data */
  playerCharacter: playerCharacterType.isRequired,
  /** Current player character ID */
  playerCharacterId: PropTypes.string.isRequired,
  /** Players' characters loader and error information */
  playersCharactersUi: uiType.isRequired,
}

export default memo(PlayerCharacter)
