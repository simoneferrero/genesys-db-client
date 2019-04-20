import React from 'react'

import { fromJS } from 'immutable'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import PCSheet from '../index'

import { factionsById } from 'mocks/factions'
import { playerCharacter1Augmented } from 'mocks/playersCharacters'

const defaultProps = {
  addFavor: action('addFavor'),
  factions: fromJS(factionsById).toJS(),
  handleSubmit: action('handleSubmit'),
  playerCharacter: playerCharacter1Augmented.toJS(),
}

const renderComponent = (props = {}) => <PCSheet {...defaultProps} {...props} />

storiesOf('Components/PCSheet', module).add('default', () => renderComponent())
