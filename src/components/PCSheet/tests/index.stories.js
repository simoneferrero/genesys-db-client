import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import PCSheet from '../index'

import { playerCharacterSummary1Augmented } from 'mocks/playersCharacters'

const defaultProps = {
  handleSubmit: action('handleSubmit'),
  playerCharacter: playerCharacterSummary1Augmented.toJS(),
}

const renderComponent = (props = {}) => <PCSheet {...defaultProps} {...props} />

storiesOf('Components/PCSheet', module).add('default', () => renderComponent())
