import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { playerCharacter1Response } from 'mocks/playersCharacters'

import Motivations from '../index'

const defaultProps = {
  motivations: playerCharacter1Response.motivations,
  handleSubmit: action('handleSubmit'),
  setFieldValue: action('setFieldValue'),
}

const renderComponent = (props = {}) => (
  <Motivations {...defaultProps} {...props} />
)

storiesOf('Components/Motivations', module)
  .add('default', () => renderComponent())
  .add('editing', () => renderComponent({ editing: true }))
