import React from 'react'
import PropTypes from 'prop-types'
import { factionType } from 'types/factions'
import { favorType } from 'types/favors'

import { Field } from 'formik'
import Select from 'components/Select'

const NewFavor = ({ factions, isSubmitting, setFieldValue, sizes, values }) => {
  const { faction_id, size } = values
  const SIZE = 'size'
  const sizeOptions = Object.values(sizes)
  const FACTION_ID = 'faction_id'
  const factionOptions = Object.values(factions).map(({ id, name }) => ({
    value: id,
    label: name,
  }))
  const DESCRIPTION = 'description'
  const descriptionPlaceholder = 'Add description...'

  return (
    <>
      <label htmlFor={SIZE}>
        <Select
          currentValue={size}
          data-testid={SIZE}
          disabled={isSubmitting}
          id={SIZE}
          name={SIZE}
          onChange={setFieldValue}
          options={sizeOptions}
        />
      </label>
      <label htmlFor={FACTION_ID}>
        <Select
          currentValue={faction_id}
          data-testid={FACTION_ID}
          disabled={isSubmitting}
          id={FACTION_ID}
          name={FACTION_ID}
          onChange={setFieldValue}
          options={factionOptions}
        />
      </label>
      <label htmlFor={DESCRIPTION}>
        <Field
          component="textarea"
          disabled={isSubmitting}
          placeholder={descriptionPlaceholder}
          name={DESCRIPTION}
          rows={4}
        />
      </label>
    </>
  )
}

NewFavor.propTypes = {
  /** List of available factions */
  factions: PropTypes.objectOf(factionType).isRequired,
  /** Whether form values are being submitted */
  isSubmitting: PropTypes.bool,
  /** Invoked when changing a field value */
  setFieldValue: PropTypes.func.isRequired,
  /** List of available sizes */
  sizes: PropTypes.objectOf(
    PropTypes.shape({
      label: PropTypes.oneOf(['Small favor', 'Normal favor', 'Big favor'])
        .isRequired,
      value: PropTypes.oneOf(['small', 'normal', 'big']).isRequired,
    }),
  ).isRequired,
  /** Favor data */
  values: favorType.isRequired,
}

export default NewFavor
