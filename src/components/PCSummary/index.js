import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { playerCharacterSummaryData } from 'types/playersCharacters'

import { ATTRIBUTES, CHARACTERISTICS } from 'utils/definitions'

import { NavLink } from 'react-router-dom'
import { MdLaunch } from 'react-icons/md'

import routes from 'utils/routes'

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

import BadgeModifiers from 'components/BadgeModifiers'

import {
  StyledLink,
  StyledAttributesSection,
  StyledCharacteristicsSection,
  StyledInfoSection,
  StyledPCSummary,
} from './styles'

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
  className,
  characteristics: { agility, brawn, cunning, intellect, presence, willpower },
  editing,
  hideLink,
  id,
  isSubmitting,
  name,
  player_name,
  setFieldValue,
}) => {
  const pathToRoute = routes
    .find(({ id: routeId }) => routeId === 'player-character')
    .to.replace(':id', id)

  return (
    <StyledPCSummary className={className} data-testid={`pc-summary-${id}`}>
      <StyledInfoSection>
        <div>
          <h4>Player name:</h4>
          <span>{player_name}</span>
        </div>
        <div>
          <h4>Character name:</h4>
          <span>{name}</span>
        </div>
        <div>
          <h4>Archetype:</h4>
          <span>{archetypeName}</span>
        </div>
        <div>
          <h4>Career:</h4>
          <span>{careerName}</span>
        </div>
      </StyledInfoSection>
      <StyledCharacteristicsSection>
        <div>
          <img alt={BRAWN} src={Brawn} />
          <h2>{brawn}</h2>
        </div>
        <div>
          <img alt={AGILITY} src={Agility} />
          <h2>{agility}</h2>
        </div>
        <div>
          <img alt={INTELLECT} src={Intellect} />
          <h2>{intellect}</h2>
        </div>
        <div>
          <img alt={CUNNING} src={Cunning} />
          <h2>{cunning}</h2>
        </div>
        <div>
          <img alt={WILLPOWER} src={Willpower} />
          <h2>{willpower}</h2>
        </div>
        <div>
          <img alt={PRESENCE} src={Presence} />
          <h2>{presence}</h2>
        </div>
      </StyledCharacteristicsSection>
      <StyledAttributesSection>
        <div>
          <img alt={SOAK} src={Soak} />
          <h2>
            <span>{soak}</span>
          </h2>
        </div>
        <div>
          <img alt={WOUNDS} src={Wounds} />
          <h2>
            <span>{totalWounds}</span>
            <span>{currentWounds}</span>
          </h2>
          {editing && (
            <BadgeModifiers
              decrease={() =>
                setFieldValue('attributes.wounds.current', currentWounds - 1)
              }
              decreaseDisabled={isSubmitting || currentWounds <= 0}
              increase={() =>
                setFieldValue('attributes.wounds.current', currentWounds + 1)
              }
              increaseDisabled={isSubmitting || currentWounds >= totalWounds}
              name="attributes.wounds.current"
            />
          )}
        </div>
        <div>
          <img alt={STRAIN} src={Strain} />
          <h2>
            <span>{totalStrain}</span>
            <span>{currentStrain}</span>
          </h2>
          {editing && (
            <BadgeModifiers
              decrease={() =>
                setFieldValue('attributes.strain.current', currentStrain - 1)
              }
              decreaseDisabled={isSubmitting || currentStrain <= 0}
              increase={() =>
                setFieldValue('attributes.strain.current', currentStrain + 1)
              }
              increaseDisabled={isSubmitting || currentStrain >= totalStrain}
              name="attributes.strain.current"
            />
          )}
        </div>
        <div>
          <img alt={DEFENSE} src={Defense} />
          <h2>
            <span>{melee}</span>
            <span>{ranged}</span>
          </h2>
        </div>
      </StyledAttributesSection>
      {!hideLink && (
        <StyledLink
          as={NavLink}
          data-testid={`pc-sheet-link-${id}`}
          to={pathToRoute}
        >
          <MdLaunch />
        </StyledLink>
      )}
    </StyledPCSummary>
  )
}

PCSummary.propTypes = {
  /** Custom styles */
  className: PropTypes.string,
  /** Whether to show field modifiers */
  editing: PropTypes.bool,
  /** Hides the NavLink to the full character sheet */
  hideLink: PropTypes.bool,
  /** Whether the form is submitting */
  isSubmitting: PropTypes.bool,
  /** Invoked when one of the fields changes */
  setFieldValue: PropTypes.func,
  ...playerCharacterSummaryData,
}

PCSummary.defaultProps = {
  setFieldValue: () => {},
}

export default memo(PCSummary)
