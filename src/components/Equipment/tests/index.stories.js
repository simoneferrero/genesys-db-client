import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { playerCharacter1Response } from 'mocks/playersCharacters'

import Equipment from '../index'

const defaultProps = {
  equipment: playerCharacter1Response.equipment,
  handleSubmit: action('handleSubmit'),
  setFieldValue: action('setFieldValue'),
}

const renderComponent = (props = {}) => (
  <Equipment {...defaultProps} {...props} />
)

storiesOf('Components/Equipment', module)
  .add('default', () => renderComponent())
  .add('editing', () => renderComponent({ editing: true }))
