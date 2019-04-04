import React from 'react'
import { playerCharacterAugmentedData } from 'types/playersCharacters'

import AttributesBadge from 'vectors/AttributesBadge'
import CharacteristicsBadge from 'vectors/CharacteristicsBadge'

import { ATTRIBUTES, CHARACTERISTICS, INFO } from 'utils/definitions'

import { StyledPCSummary, StyledTextCell, StyledCell } from './styles'

/** Summary of the PC's most important info */
const PCSummary = ({
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
    <StyledTextCell type={INFO.PLAYER_NAME}>
      <h4>Player name:</h4>
      <span>{player_name}</span>
    </StyledTextCell>
    <StyledTextCell type={INFO.ARCHETYPE}>
      <h4>Archetype:</h4>
      <span>{archetypeName}</span>
    </StyledTextCell>
    <StyledTextCell type={INFO.PC_NAME}>
      <h4>Character name:</h4>
      <span>{name}</span>
    </StyledTextCell>
    <StyledTextCell type={INFO.CAREER}>
      <h4>Career:</h4>
      <span>{careerName}</span>
    </StyledTextCell>
    <StyledCell type={CHARACTERISTICS.BRAWN}>
      <CharacteristicsBadge height={60} type={CHARACTERISTICS.BRAWN} />
      <h2>{brawn}</h2>
    </StyledCell>
    <StyledCell type={CHARACTERISTICS.AGILITY}>
      <CharacteristicsBadge height={60} type={CHARACTERISTICS.AGILITY} />
      <h2>{agility}</h2>
    </StyledCell>
    <StyledCell type={CHARACTERISTICS.INTELLECT}>
      <CharacteristicsBadge height={60} type={CHARACTERISTICS.INTELLECT} />
      <h2>{intellect}</h2>
    </StyledCell>
    <StyledCell type={CHARACTERISTICS.CUNNING}>
      <CharacteristicsBadge height={60} type={CHARACTERISTICS.CUNNING} />
      <h2>{cunning}</h2>
    </StyledCell>
    <StyledCell type={CHARACTERISTICS.WILLPOWER}>
      <CharacteristicsBadge height={60} type={CHARACTERISTICS.WILLPOWER} />
      <h2>{willpower}</h2>
    </StyledCell>
    <StyledCell type={CHARACTERISTICS.PRESENCE}>
      <CharacteristicsBadge height={60} type={CHARACTERISTICS.PRESENCE} />
      <h2>{presence}</h2>
    </StyledCell>
    <StyledCell type={ATTRIBUTES.SOAK}>
      <AttributesBadge height={50} type={ATTRIBUTES.SOAK} />
      <h2>
        <span>{soak}</span>
      </h2>
    </StyledCell>
    <StyledCell type={ATTRIBUTES.WOUNDS}>
      <AttributesBadge height={50} type={ATTRIBUTES.WOUNDS} />
      <h2>
        <span>{totalWounds}</span>
        <span>{currentWounds}</span>
      </h2>
    </StyledCell>
    <StyledCell type={ATTRIBUTES.STRAIN}>
      <AttributesBadge height={50} type={ATTRIBUTES.STRAIN} />
      <h2>
        <span>{totalStrain}</span>
        <span>{currentStrain}</span>
      </h2>
    </StyledCell>
    <StyledCell type={ATTRIBUTES.DEFENSE}>
      <AttributesBadge height={50} type={ATTRIBUTES.DEFENSE} />
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

export default PCSummary
