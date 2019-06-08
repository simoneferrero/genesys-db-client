import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Formik } from 'formik'

import { talent1, talent3 } from 'mocks/talents'

import Talent from '../index'

const defaultProps = {
  setFieldValue: action('setFieldValue'),
  talent: talent1,
}

const renderWithFormik = (formProps = {}) => (
  <Formik
    onSubmit={action('onSubmit')}
    render={({ values, ...props }) => (
      <Talent isNew talent={values} {...props} />
    )}
    {...formProps}
  />
)

const renderComponent = (props = {}) => <Talent {...defaultProps} {...props} />

storiesOf('Components/Talent', module)
  .add('default', () => renderComponent())
  .add('player', () => {
    const props = {
      isCharacter: true,
      talent: {
        ...talent3,
        notes: 'Brawl\nCunning',
        rank: 2,
      },
    }
    return renderComponent(props)
  })
  .add('editing', () => {
    const props = {
      decreaseDisabled: true,
      editing: true,
      isCharacter: true,
      talent: {
        ...talent3,
        notes: 'Brawl\nCunning',
        rank: 2,
      },
    }
    return renderComponent(props)
  })
  .add('new', () => {
    const props = {
      initialValues: {
        activation: 'Passive',
        description: '',
        name: '',
        ranked: true,
        tier: 1,
      },
    }
    return renderWithFormik(props)
  })
