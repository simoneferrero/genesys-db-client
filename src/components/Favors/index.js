import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { favorType } from 'types/favors'

import groupBy from 'lodash/groupBy'

import { MdAdd } from 'react-icons/md'

import Favor from 'components/Favor'

import {
  StyledButton,
  StyledContainer,
  StyledFavors,
  StyledSection,
  StyledSubHeader,
} from './styles'

export const Favors = ({
  className,
  editing,
  initialFavors,
  isSubmitting,
  onChange,
  onFavorSubmit,
  favors,
}) => {
  const [addingOwed, setAddingOwed] = useState(false)
  const [addingGiven, setAddingGiven] = useState(false)
  //
  // const augmentedOnFavorSubmit = (values, actions) => onFavorSubmit(values, {
  //   ...actions,
  //   setAddingOwed,
  //   setAddingGiven,
  // })
  // const favorToAdd = (owed) => ({})
  const groupedByFavors = Object.entries(
    groupBy(editing ? favors : initialFavors, ({ owed }) =>
      owed ? 'owed' : 'given',
    ),
  ).map(([status, favors]) => {
    const setAdding = status === 'owed' ? setAddingOwed : setAddingGiven
    const augmentedOnFavorSubmit = (values, actions) =>
      onFavorSubmit(values, {
        ...actions,
        setAdding,
      })
    const addedFavor = {
      type: 'small',
      faction: 'jinteki',
      description: '',
      owed: status === 'owed',
    }

    return (
      <StyledSection key={status}>
        <StyledSubHeader>
          <h3>{status}</h3>
          <StyledButton onClick={() => setAdding(true)}>
            <MdAdd />
          </StyledButton>
        </StyledSubHeader>
        <StyledContainer>
          {(status === 'owed' && addingOwed) ||
            (status === 'given' && addingGiven && (
              <Favor
                adding
                favor={addedFavor}
                handleSubmit={augmentedOnFavorSubmit}
                isPCSubmitting={isSubmitting}
              />
            ))}
          {favors.map((favor) => (
            <Favor
              editing={editing}
              favor={favor}
              isPCSubmitting={isSubmitting}
              key={favor.id}
              onFavorChange={onChange}
            />
          ))}
        </StyledContainer>
      </StyledSection>
    )
  })

  return (
    <StyledFavors className={className} data-testid="favors">
      {groupedByFavors}
    </StyledFavors>
  )
}

Favors.propTypes = {
  /** Custom styles */
  className: PropTypes.string,
  /** Whether to show the editing buttons */
  editing: PropTypes.bool,
  /** The initial values of favors */
  initialFavors: PropTypes.objectOf(favorType).isRequired,
  /** Whether the values are being submitted */
  isSubmitting: PropTypes.bool,
  /** Invoked upon changing favors values */
  onChange: PropTypes.func.isRequired,
  /** Invoked upon adding new favor */
  onFavorSubmit: PropTypes.func.isRequired,
  /** The player's character favor data */
  favors: PropTypes.objectOf(favorType).isRequired,
}

export default memo(Favors)
