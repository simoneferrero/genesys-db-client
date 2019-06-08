import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { talentType } from 'types/talents'

import Checkbox from 'components/Checkbox'
import { MdAdd, MdRemove } from 'react-icons/md'

import { StyledButton } from './styles'

const ExistingTalent = ({
  decreaseDisabled,
  editing,
  increaseDisabled,
  isCharacter,
  isSubmitting,
  setFieldValue,
  values: { activation, description, id, name, notes, rank, ranked },
}) => {
  const NOTES = 'notes'
  const symbols = {
    advantage: 'a',
    despair: 'd',
    failure: 'f',
    threat: 'h',
    success: 's',
    triumph: 't',
    boost: 'j',
    setback: 'j',
    ability: 'k',
    difficulty: 'k',
    proficiency: 'l',
    challenge: 'l',
  }

  const modifiedDescription = useMemo(
    () =>
      description.replace(
        /{([^{}]*)}/g,
        (match, submatch) =>
          `<span type=${submatch}>${symbols[submatch]}</span>`,
      ),
    [description, symbols],
  )
  return (
    <>
      <h4 data-testid={`talent-${id}-name`}>{name}</h4>
      <h4 data-testid={`talent-${id}-activation`}>{activation}</h4>
      {isCharacter && ranked ? (
        <h4 data-testid={`talent-${id}-rank`}>
          Rank:{' '}
          {editing && (
            <StyledButton
              data-testid={`decrease-${id}-rank`}
              disabled={isSubmitting || decreaseDisabled}
              onClick={() => setFieldValue(`talents.${id}.rank`, rank - 1)}
              type="button"
            >
              <MdRemove />
            </StyledButton>
          )}
          {rank}
          {editing && (
            <StyledButton
              data-testid={`increase-${id}-rank`}
              disabled={isSubmitting || increaseDisabled}
              onClick={() => setFieldValue(`talents.${id}.rank`, rank + 1)}
              type="button"
            >
              <MdAdd />
            </StyledButton>
          )}
        </h4>
      ) : (
        <Checkbox
          checked={ranked}
          disabled
          id={`talent-${id}-ranked`}
          name={`talents.${id}.ranked`}
          label="ranked"
        />
      )}
      <p
        dangerouslySetInnerHTML={{ __html: modifiedDescription }}
        data-testid={`talent-${id}-description`}
      />
      {editing ? (
        <label htmlFor={NOTES}>
          <textarea
            data-testid={`talent-${id}-${NOTES}`}
            disabled={isSubmitting}
            id={NOTES}
            name={NOTES}
            onChange={({ target: { value } }) =>
              setFieldValue(`talents.${id}.${NOTES}`, value)
            }
            placeholder="Add notes"
            value={notes}
          />
        </label>
      ) : (
        notes && <p data-testid={`talent-${id}-notes`}>{notes}</p>
      )}
    </>
  )
}

ExistingTalent.propTypes = {
  /** Whether decrease button should be disabled */
  decreaseDisabled: PropTypes.bool,
  /** Whether to allow editing the talent */
  editing: PropTypes.bool,
  /** Whether increase button should be disabled */
  increaseDisabled: PropTypes.bool,
  /** Whether to show character-related fields */
  isCharacter: PropTypes.bool,
  /** Whether the form is submitting */
  isSubmitting: PropTypes.bool,
  /** Changes the specified field value */
  setFieldValue: PropTypes.func,
  /** Talent data */
  values: talentType.isRequired,
}

export default ExistingTalent
