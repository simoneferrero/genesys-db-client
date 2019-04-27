import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { playerCharacter1Response } from 'mocks/playersCharacters'

import Motivation from '../index'

const motivation = playerCharacter1Response.motivations.strength
const defaultProps = {
  motivation,
  setFieldValue: action('setFieldValue'),
  title: 'strength',
}

const renderComponent = (props = {}) => (
  <Motivation {...defaultProps} {...props} />
)

storiesOf('Components/Motivation', module)
  .add('default', () => renderComponent())
  .add('editing', () => {
    const props = {
      editing: true,
    }
    return renderComponent(props)
  })
