import React from 'react'

import { fromJS } from 'immutable'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Formik } from 'formik'

import { skillsById } from 'mocks/skills'
import { weapon1 } from 'mocks/weapons'

import Weapon from '../index'

const defaultProps = {
  weapon: weapon1,
  setFieldValue: action('setFieldValue'),
  skills: fromJS(skillsById).toJS(),
}

const renderWithFormik = (formProps = {}) => (
  <Formik
    onSubmit={action('onSubmit')}
    render={({ values, ...props }) => (
      <Weapon skills={defaultProps.skills} weapon={values} isNew {...props} />
    )}
    {...formProps}
  />
)

const renderComponent = (props = {}) => <Weapon {...defaultProps} {...props} />

storiesOf('Components/Weapon', module)
  .add('default', () => renderComponent())
  .add('editing', () => {
    const props = {
      editing: true,
    }
    return renderComponent(props)
  })
  .add('deleting', () => {
    const props = {
      deleting: true,
      editing: true,
    }
    return renderComponent(props)
  })
  .add('new', () => {
    const props = {
      initialValues: {
        crit: 0,
        damage: 0,
        encumbrance: 0,
        hard_points: 0,
        name: '',
        price: 0,
        range: 'engaged',
        rarity: 0,
        restricted: false,
        skill_id: skillsById.athletics.id,
        special: '',
      },
    }
    return renderWithFormik(props)
  })
