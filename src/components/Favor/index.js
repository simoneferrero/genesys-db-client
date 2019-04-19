import React from 'react'
import PropTypes from 'prop-types'
import { factionType } from 'types/factions'
import { favorType } from 'types/favors'

import NewFavor from './NewFavor'
import ExistingFavor from './ExistingFavor'

import { StyledFavor } from './styles'

/* eslint-disable no-unused-vars  */
/* eslint-disable react/prop-types  */
const FilteredFavor = ({ isNew, isComplete, editing, ...otherProps }) => (
  <div {...otherProps} />
)
/* eslint-enable */

const Favor = ({
  className,
  editing,
  factions,
  favor,
  isNew,
  isSubmitting,
  setFieldValue,
}) => {
  const sizes = {
    small: {
      value: 'small',
      label: 'Small favor',
    },
    normal: {
      value: 'normal',
      label: 'Normal favor',
    },
    big: {
      value: 'big',
      label: 'Big favor',
    },
  }

  return (
    <StyledFavor
      as={FilteredFavor}
      className={className}
      data-testid={isNew ? 'new-favor' : `favor-${favor.id}`}
      editing={editing}
      isComplete={favor.status === 'complete'}
      isNew={isNew}
    >
      {isNew ? (
        <NewFavor
          factions={factions}
          isSubmitting={isSubmitting}
          setFieldValue={setFieldValue}
          sizes={sizes}
          values={favor}
        />
      ) : (
        <ExistingFavor
          editing={editing}
          factions={factions}
          isSubmitting={isSubmitting}
          setFieldValue={setFieldValue}
          sizes={sizes}
          values={favor}
        />
      )}
    </StyledFavor>
  )
}

Favor.propTypes = {
  /** Custom styles */
  className: PropTypes.bool,
  /** Whether to allow editing the favor */
  editing: PropTypes.bool,
  /** List of available factions */
  factions: PropTypes.objectOf(factionType).isRequired,
  /** Favor data */
  favor: favorType.isRequired,
  /** Whether to show NewFavor or ExistingFavor */
  isNew: PropTypes.bool,
  /** Whether the form is submitting */
  isSubmitting: PropTypes.bool,
  /** Changes the specified field value */
  setFieldValue: PropTypes.func.isRequired,
}

export default Favor
