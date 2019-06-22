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
  const onSoakChange = ({ target: { value } }) =>
    setFieldValue('attributes.soak', value)
  const onTotalWoundsChange = ({ target: { value } }) =>
    setFieldValue('attributes.wounds.total', value)
  const onCurrentWoundsChange = ({ target: { value } }) =>
    setFieldValue('attributes.wounds.current', value)
  const onTotalStrainChange = ({ target: { value } }) =>
    setFieldValue('attributes.strain.total', value)
  const onCurrentStrainChange = ({ target: { value } }) =>
    setFieldValue('attributes.strain.current', value)
  const onMeleeDefenseChange = ({ target: { value } }) =>
    setFieldValue('attributes.defense.melee', value)
  const onRangedDefenseChange = ({ target: { value } }) =>
    setFieldValue('attributes.defense.ranged', value)

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
          {editing && (
            <BadgeModifiers
              decrease={() => setFieldValue('characteristics.brawn', brawn - 1)}
              decreaseDisabled={isSubmitting || brawn <= 1}
              increase={() => setFieldValue('characteristics.brawn', brawn + 1)}
              increaseDisabled={isSubmitting || brawn >= 5}
              name="characteristics.brawn"
            />
          )}
        </div>
        <div>
          <img alt={AGILITY} src={Agility} />
          <h2>{agility}</h2>
          {editing && (
            <BadgeModifiers
              decrease={() =>
                setFieldValue('characteristics.agility', agility - 1)
              }
              decreaseDisabled={isSubmitting || agility <= 1}
              increase={() =>
                setFieldValue('characteristics.agility', agility + 1)
              }
              increaseDisabled={isSubmitting || agility >= 5}
              name="characteristics.agility"
            />
          )}
        </div>
        <div>
          <img alt={INTELLECT} src={Intellect} />
          <h2>{intellect}</h2>
          {editing && (
            <BadgeModifiers
              decrease={() =>
                setFieldValue('characteristics.intellect', intellect - 1)
              }
              decreaseDisabled={isSubmitting || intellect <= 1}
              increase={() =>
                setFieldValue('characteristics.intellect', intellect + 1)
              }
              increaseDisabled={isSubmitting || intellect >= 5}
              name="characteristics.intellect"
            />
          )}
        </div>
        <div>
          <img alt={CUNNING} src={Cunning} />
          <h2>{cunning}</h2>
          {editing && (
            <BadgeModifiers
              decrease={() =>
                setFieldValue('characteristics.cunning', cunning - 1)
              }
              decreaseDisabled={isSubmitting || cunning <= 1}
              increase={() =>
                setFieldValue('characteristics.cunning', cunning + 1)
              }
              increaseDisabled={isSubmitting || cunning >= 5}
              name="characteristics.cunning"
            />
          )}
        </div>
        <div>
          <img alt={WILLPOWER} src={Willpower} />
          <h2>{willpower}</h2>
          {editing && (
            <BadgeModifiers
              decrease={() =>
                setFieldValue('characteristics.willpower', willpower - 1)
              }
              decreaseDisabled={isSubmitting || willpower <= 1}
              increase={() =>
                setFieldValue('characteristics.willpower', willpower + 1)
              }
              increaseDisabled={isSubmitting || willpower >= 5}
              name="characteristics.willpower"
            />
          )}
        </div>
        <div>
          <img alt={PRESENCE} src={Presence} />
          <h2>{presence}</h2>
          {editing && (
            <BadgeModifiers
              decrease={() =>
                setFieldValue('characteristics.presence', presence - 1)
              }
              decreaseDisabled={isSubmitting || presence <= 1}
              increase={() =>
                setFieldValue('characteristics.presence', presence + 1)
              }
              increaseDisabled={isSubmitting || presence >= 5}
              name="characteristics.presence"
            />
          )}
        </div>
      </StyledCharacteristicsSection>
      <StyledAttributesSection>
        <div>
          <img alt={SOAK} src={Soak} />
          {editing ? (
            <input
              alt="Soak Value"
              disabled={isSubmitting}
              min={0}
              onChange={onSoakChange}
              type="number"
              value={soak}
            />
          ) : (
            <h2>{soak}</h2>
          )}
        </div>
        <div>
          <img alt={WOUNDS} src={Wounds} />
          {editing ? (
            <div>
              <input
                alt="Total Wounds"
                disabled={isSubmitting}
                min={0}
                onChange={onTotalWoundsChange}
                type="number"
                value={totalWounds}
              />
              <input
                alt="Current Wounds"
                disabled={isSubmitting}
                min={0}
                onChange={onCurrentWoundsChange}
                type="number"
                value={currentWounds}
              />
            </div>
          ) : (
            <h2>
              <span>{totalWounds}</span>
              <span>{currentWounds}</span>
            </h2>
          )}
        </div>
        <div>
          <img alt={STRAIN} src={Strain} />
          {editing ? (
            <div>
              <input
                alt="Total Strain"
                disabled={isSubmitting}
                min={0}
                onChange={onTotalStrainChange}
                type="number"
                value={totalStrain}
              />
              <input
                alt="Current Strain"
                disabled={isSubmitting}
                min={0}
                onChange={onCurrentStrainChange}
                type="number"
                value={currentStrain}
              />
            </div>
          ) : (
            <h2>
              <span>{totalStrain}</span>
              <span>{currentStrain}</span>
            </h2>
          )}
        </div>
        <div>
          <img alt={DEFENSE} src={Defense} />
          {editing ? (
            <div>
              <input
                alt="Melee Defense"
                disabled={isSubmitting}
                min={0}
                onChange={onMeleeDefenseChange}
                type="number"
                value={melee}
              />
              <input
                alt="Ranged Defense"
                disabled={isSubmitting}
                min={0}
                onChange={onRangedDefenseChange}
                type="number"
                value={ranged}
              />
            </div>
          ) : (
            <h2>
              <span>{melee}</span>
              <span>{ranged}</span>
            </h2>
          )}
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
