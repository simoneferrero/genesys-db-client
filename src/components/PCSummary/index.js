import React, { memo } from 'react'
import { playerCharacterAugmentedData } from 'types/playersCharacters'

import { ATTRIBUTES, CHARACTERISTICS, INFO } from 'utils/definitions'

// Badges
import Agility from 'images/Agility.png'
import Brawn from 'images/Brawn.png'
import Cunning from 'images/Cunning.png'
import Defense from 'images/Defense.png'
import Intellect from 'images/Intellect.png'
import Presence from 'images/Presence.png'
import Soak from 'images/Soak.png'
import Strain from 'images/Strain.png'
import Willpower from 'images/Willpower.png'
import Wounds from 'images/Wounds.png'

import { StyledCell, StyledPCSummary, StyledTextCell } from './styles'

const { ARCHETYPE, CAREER, PC_NAME, PLAYER_NAME } = INFO
const { DEFENSE, SOAK, STRAIN, WOUNDS } = ATTRIBUTES
const {
  AGILITY,
  BRAWN,
  CUNNING,
  INTELLECT,
  PRESENCE,
  WILLPOWER,
} = CHARACTERISTICS

/** Summary of the PC's most important info */
export const PCSummary = ({
  archetype: { name: archetypeName },
  attributes: {
    defense: { melee, ranged },
    soak,
    strain: { current: currentStrain, total: totalStrain },
    wounds: { current: currentWounds, total: totalWounds },
  },
  career: { name: careerName },
  characteristics: { agility, brawn, cunning, intellect, presence, willpower },
  id,
  name,
  player_name,
}) => (
  <StyledPCSummary data-testid={`pc-summary-${id}`}>
    <StyledTextCell type={PLAYER_NAME}>
      <h4>Player name:</h4>
      <span>{player_name}</span>
    </StyledTextCell>
    <StyledTextCell type={ARCHETYPE}>
      <h4>Archetype:</h4>
      <span>{archetypeName}</span>
    </StyledTextCell>
    <StyledTextCell type={PC_NAME}>
      <h4>Character name:</h4>
      <span>{name}</span>
    </StyledTextCell>
    <StyledTextCell type={CAREER}>
      <h4>Career:</h4>
      <span>{careerName}</span>
    </StyledTextCell>
    <StyledCell type={BRAWN}>
      <img alt={BRAWN} src={Brawn} />
      <h2>{brawn}</h2>
    </StyledCell>
    <StyledCell type={AGILITY}>
      <img alt={AGILITY} src={Agility} />
      <h2>{agility}</h2>
    </StyledCell>
    <StyledCell type={INTELLECT}>
      <img alt={INTELLECT} src={Intellect} />
      <h2>{intellect}</h2>
    </StyledCell>
    <StyledCell type={CUNNING}>
      <img alt={CUNNING} src={Cunning} />
      <h2>{cunning}</h2>
    </StyledCell>
    <StyledCell type={WILLPOWER}>
      <img alt={WILLPOWER} src={Willpower} />
      <h2>{willpower}</h2>
    </StyledCell>
    <StyledCell type={PRESENCE}>
      <img alt={PRESENCE} src={Presence} />
      <h2>{presence}</h2>
    </StyledCell>
    <StyledCell type={SOAK}>
      <img alt={SOAK} src={Soak} />
      <h2>
        <span>{soak}</span>
      </h2>
    </StyledCell>
    <StyledCell type={WOUNDS}>
      <img alt={WOUNDS} src={Wounds} />
      <h2>
        <span>{totalWounds}</span>
        <span>{currentWounds}</span>
      </h2>
    </StyledCell>
    <StyledCell type={STRAIN}>
      <img alt={STRAIN} src={Strain} />
      <h2>
        <span>{totalStrain}</span>
        <span>{currentStrain}</span>
      </h2>
    </StyledCell>
    <StyledCell type={DEFENSE}>
      <img alt={DEFENSE} src={Defense} />
      <h2>
        <span>{melee}</span>
        <span>{ranged}</span>
      </h2>
    </StyledCell>
  </StyledPCSummary>
)

PCSummary.propTypes = {
  ...playerCharacterAugmentedData,
}

PCSummary.defaultProps = {
  archetype: {
    name: '',
  },
  career: {
    name: '',
  },
}

export default memo(PCSummary)
