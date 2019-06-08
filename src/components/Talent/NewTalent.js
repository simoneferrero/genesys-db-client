import React from 'react'
import PropTypes from 'prop-types'
import { talentData, talentType } from 'types/talents'

import { Field } from 'formik'
import Checkbox from 'components/Checkbox'
import Select from 'components/Select'

const NewTalent = ({
  activations,
  isSubmitting,
  setFieldValue,
  values: { activation, description, ranked },
}) => {
  const NAME = 'name'
  const ACTIVATION = 'activation'
  const activationOptions = activations.map((activation) => ({
    label: activation,
    value: activation,
  }))
  const RANKED = 'ranked'
  const DESCRIPTION = 'description'

  return (
    <>
      <label htmlFor={NAME}>
        <h4>Name</h4>
        <Field
          data-testid={`new-talent-${NAME}`}
          disabled={isSubmitting}
          id={NAME}
          name={NAME}
          placeholder="Talent's name"
        />
      </label>
      <label htmlFor={ACTIVATION}>
        <h4>Activation</h4>
        <Select
          currentValue={activation}
          data-testid={`new-talent-${ACTIVATION}`}
          disabled={isSubmitting}
          id={ACTIVATION}
          name={ACTIVATION}
          onChange={setFieldValue}
          options={activationOptions}
        />
      </label>
      <div>
        <Checkbox
          checked={ranked}
          disabled={isSubmitting}
          id={`new-talent-${RANKED}`}
          name={RANKED}
          label="ranked"
          onChange={setFieldValue}
        />
      </div>
      <label htmlFor={DESCRIPTION}>
        <h4>Description</h4>
        <textarea
          data-testid={`new-talent-${DESCRIPTION}`}
          disabled={isSubmitting}
          id={DESCRIPTION}
          name={DESCRIPTION}
          onChange={({ target: { value } }) =>
            setFieldValue(DESCRIPTION, value)
          }
          placeholder="Add description"
          value={description}
        />
      </label>
    </>
  )
}

NewTalent.propTypes = {
  /** A list of activations values */
  activations: PropTypes.arrayOf(talentData.activation).isRequired,
  /** Whether form values are being submitted */
  isSubmitting: PropTypes.bool,
  /** Invoked when changing a field value */
  setFieldValue: PropTypes.func.isRequired,
  /** Weapon data */
  values: talentType.isRequired,
}

export default NewTalent
