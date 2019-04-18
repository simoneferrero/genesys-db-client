import React from 'react'
import PropTypes from 'prop-types'
import { favorType } from 'types/favors'

import * as yup from 'yup'

import { Form, Field } from 'formik'
import Select from 'components/Select'
import FormButtons from 'components/FormButtons'

import { MdThumbDown, MdThumbUp } from 'react-icons/md'

import { StyledButton, StyledButtons, StyledForm } from './styles'

/* eslint-disable no-unused-vars  */
/* eslint-disable react/prop-types  */
const FilteredForm = ({ adding, completed, editing, ...otherProps }) => (
  <Form {...otherProps} />
)
/* eslint-enable */

const InnerForm = ({
  adding,
  editing,
  handleSubmit,
  initialValues,
  isPCSubmitting,
  isSubmitting,
  onFavorChange,
  setAdding,
  setFieldValue,
  values: { faction, completed, type },
}) => {
  const TYPE = 'type'
  const typeOptions = {
    small: {
      value: 'small',
      label: 'Small',
    },
    normal: {
      value: 'normal',
      label: 'Normal',
    },
    big: {
      value: 'big',
      label: 'Big',
    },
  }
  const FACTION = 'faction'
  // TODO: get from endpoint with additional data
  const factionOptions = {
    jinteki: {
      value: 'jinteki',
      label: 'Jinteki',
    },
    'haas-biodroid': {
      value: 'haas-biodroid',
      label: 'Haas-Biodroid',
    },
    'weyland-consortium': {
      value: 'weyland-consortium',
      label: 'Weyland Consortium',
    },
    nbn: {
      value: 'nbn',
      label: 'NBN',
    },
    orgcrime: {
      value: 'orgcrime',
      label: 'Orgcrime',
    },
    'street-gangs': {
      value: 'street-gangs',
      label: 'Street Gangs',
    },
    napd: {
      value: 'napd',
      label: 'NAPD',
    },
    government: {
      value: 'government',
      label: 'Government',
    },
    sea: {
      value: 'sea',
      label: 'SEA',
    },
    globalsec: {
      value: 'globalsec',
      label: 'Globalsec',
    },
    loonies: {
      value: 'loonies',
      label: 'Loonies',
    },
    'activist-terrorist': {
      value: 'activist-terrorist',
      label: 'Activist/Terrorist groups',
    },
    'human-first': {
      value: 'human-first',
      label: 'Human First',
    },
    'humanity-labor': {
      value: 'humanity-labor',
      label: 'Humanity Labor',
    },
    'opticon-foundation': {
      value: 'opticon-foundation',
      label: 'Opticon Foundation',
    },
    'simulant-abolitionist-movement': {
      value: 'simulant-abolitionist-movement',
      label: 'Simulant Abolitionist Movement',
    },
    'brigada-tricolor': {
      value: 'brigada-tricolor',
      label: 'La Brigada Tricolor',
    },
    other: {
      value: 'other',
      label: 'Other',
    },
  }
  const DESCRIPTION = 'description'
  const descriptionPlaceholder = 'Add description...'

  return (
    <StyledForm
      adding={adding}
      as={FilteredForm}
      completed={completed}
      data-testid={adding ? 'new-favor' : `favor-${initialValues.id}`}
      editing={editing}
      onSubmit={handleSubmit}
    >
      {adding ? (
        <>
          <label htmlFor={TYPE}>
            <Select
              currentValue={type}
              data-testid="type"
              id={TYPE}
              name={TYPE}
              onChange={setFieldValue}
              options={Object.values(typeOptions)}
            />
          </label>
          <label htmlFor={FACTION}>
            <Select
              currentValue={faction}
              data-testid="faction"
              id={FACTION}
              name={FACTION}
              onChange={setFieldValue}
              options={Object.values(factionOptions)}
            />
          </label>
          <label htmlFor={DESCRIPTION}>
            <Field
              component="textarea"
              placeholder={descriptionPlaceholder}
              name={DESCRIPTION}
              rows={4}
            />
          </label>
          <StyledButtons
            as={FormButtons}
            disabled={isSubmitting}
            setEditing={setAdding}
          />
        </>
      ) : (
        <>
          <h4 data-testid={`favor-${initialValues.id}-type`}>
            {typeOptions[initialValues.type].label}
          </h4>
          <h4 data-testid={`favor-${initialValues.id}-faction`}>
            {factionOptions[initialValues.faction].label}
          </h4>
          <div data-testid={`favor-${initialValues.id}-description`}>
            {initialValues.description}
          </div>
          {editing &&
            (initialValues.completed ? (
              <StyledButton
                data-testid="revert"
                disabled={isPCSubmitting}
                onClick={() =>
                  onFavorChange(`favors.${initialValues.id}.completed`, false)
                }
                type="button"
              >
                <MdThumbDown />
              </StyledButton>
            ) : (
              <StyledButton
                data-testid="complete"
                disabled={isPCSubmitting}
                onClick={() =>
                  onFavorChange(`favors.${initialValues.id}.completed`, true)
                }
                type="button"
              >
                <MdThumbUp />
              </StyledButton>
            ))}
        </>
      )}
    </StyledForm>
  )
}

InnerForm.validationSchema = yup.object({
  description: yup.string().required('required'),
  faction: yup.string().required('required'),
  type: yup.string().required('required'),
})

InnerForm.propTypes = {
  /** Whether to show the adding buttons */
  adding: PropTypes.bool,
  /** Whether to allow editing the favor */
  editing: PropTypes.bool,
  /** Errors within the form */
  errors: PropTypes.object.isRequired,
  /** Invoked on submit */
  handleSubmit: PropTypes.func.isRequired,
  /** Form values */
  initialValues: favorType.isRequired,
  /** Whether the player character form is submitting */
  isPCSubmitting: PropTypes.bool,
  /** Whether the form is submitting */
  isSubmitting: PropTypes.bool,
  /** Function invoked to change the favor data */
  onFavorChange: PropTypes.func.isRequired,
  /** Changes the mode between adding and static */
  setAdding: PropTypes.func.isRequired,
  /** Changes the specified field value */
  setFieldValue: PropTypes.func.isRequired,
  /** Touched fields */
  touched: PropTypes.object.isRequired,
  /** Form values */
  values: favorType.isRequired,
}

export default InnerForm
