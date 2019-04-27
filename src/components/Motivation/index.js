import React from 'react'
import PropTypes from 'prop-types'
import { motivationType } from 'types/motivations'

import { StyledMotivation } from './styles'

const Motivation = ({
  className,
  editing,
  isSubmitting,
  motivation: { type, description },
  setFieldValue,
  title,
}) => {
  return (
    <StyledMotivation className={className} data-testid={`motivation-${title}`}>
      <div>
        <h3>{title}</h3>
        {editing ? (
          <label htmlFor={`${title}-type`}>
            <input
              disabled={isSubmitting}
              id={`${title}-type`}
              onChange={({ target: { value } }) =>
                setFieldValue(`motivations.${title}.type`, value)
              }
              placeholder={`Add a ${title} type`}
              value={type}
            />
          </label>
        ) : (
          <h4>{type}</h4>
        )}
      </div>
      {editing ? (
        <label htmlFor={`${title}-description`}>
          <textarea
            disabled={isSubmitting}
            id={`${title}-description`}
            onChange={({ target: { value } }) =>
              setFieldValue(`motivations.${title}.description`, value)
            }
            placeholder={`Add a ${title} description`}
            value={description}
          />
        </label>
      ) : (
        <p data-testid={`${title}-description`}>{description}</p>
      )}
    </StyledMotivation>
  )
}

Motivation.propTypes = {
  /** Custom styles */
  className: PropTypes.string,
  /** Whether to allow editing the favor */
  editing: PropTypes.bool,
  /** Motivation data */
  motivation: motivationType.isRequired,
  /** Whether the form is submitting */
  isSubmitting: PropTypes.bool,
  /** Changes the specified field value */
  setFieldValue: PropTypes.func.isRequired,
  /** The name of the motivation */
  title: PropTypes.string.isRequired,
}

export default Motivation
