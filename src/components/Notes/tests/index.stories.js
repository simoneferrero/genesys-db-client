import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { playerCharacter1Response } from 'mocks/playersCharacters'

import Notes from '../index'

const defaultProps = {
  notes: playerCharacter1Response.notes,
  handleSubmit: action('handleSubmit'),
  setFieldValue: action('setFieldValue'),
}

const renderComponent = (props = {}) => <Notes {...defaultProps} {...props} />

storiesOf('Components/Notes', module)
  .add('default', () => renderComponent())
  .add('editing', () => renderComponent({ editing: true }))
