import React from 'react'

import { fromJS } from 'immutable'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import PCSheet from '../index'

import { factionsById } from 'mocks/factions'
import { playerCharacter1Augmented } from 'mocks/playersCharacters'
import { weaponsById } from 'mocks/weapons'

const defaultProps = {
  addFavor: action('addFavor'),
  addPlayerCharacterWeapon: action('addPlayerCharacterWeapon'),
  factions: fromJS(factionsById).toJS(),
  handleSubmit: action('handleSubmit'),
  playerCharacter: playerCharacter1Augmented.toJS(),
  weapons: fromJS(weaponsById).toJS(),
}

const renderComponent = (props = {}) => <PCSheet {...defaultProps} {...props} />

storiesOf('Components/PCSheet', module).add('default', () => renderComponent())
