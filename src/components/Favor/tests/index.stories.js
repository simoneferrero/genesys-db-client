import React from 'react'

import { fromJS } from 'immutable'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Formik } from 'formik'

import { factionsById } from 'mocks/factions'
import { favor1, favor2, newFavor } from 'mocks/favors'

import Favor from '../index'

const defaultProps = {
  factions: fromJS(factionsById).toJS(),
  favor: favor1,
  setFieldValue: action('setFieldValue'),
}

const renderWithFormik = (formProps = {}) => (
  <Formik
    onSubmit={action('onSubmit')}
    render={({ values, ...props }) => (
      <Favor factions={defaultProps.factions} favor={values} isNew {...props} />
    )}
    {...formProps}
  />
)

const renderComponent = (props = {}) => <Favor {...defaultProps} {...props} />

storiesOf('Components/Favor', module)
  .add('default', () => renderComponent())
  .add('completed', () => {
    const props = {
      favor: favor2,
    }
    return renderComponent(props)
  })
  .add('editing', () => {
    const props = {
      editing: true,
    }
    return renderComponent(props)
  })
  .add('editing completed', () => {
    const props = {
      editing: true,
      favor: favor2,
    }
    return renderComponent(props)
  })
  .add('new', () => {
    const props = {
      initialValues: {
        description: '',
        faction_id: defaultProps.factions[newFavor.faction_id].id,
        size: 'small',
        status: 'incomplete',
        type: 'owed',
      },
    }
    return renderWithFormik(props)
  })
