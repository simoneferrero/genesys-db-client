import React from 'react'

import { fromJS } from 'immutable'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import PCSheet from '../index'

import { criticalInjuries, criticalInjury3 } from 'mocks/criticalInjuries'
import { factionsById } from 'mocks/factions'
import { playerCharacter1Augmented } from 'mocks/playersCharacters'
import { talentsById } from 'mocks/talents'
import { weaponsById } from 'mocks/weapons'

const defaultProps = {
  addFavor: action('addFavor'),
  addPlayerCharacterCriticalInjury: action('addPlayerCharacterCriticalInjury'),
  addPlayerCharacterTalent: action('addPlayerCharacterTalent'),
  addPlayerCharacterWeapon: action('addPlayerCharacterWeapon'),
  criticalInjuries: [...criticalInjuries, criticalInjury3],
  factions: fromJS(factionsById).toJS(),
  handleSubmit: action('handleSubmit'),
  playerCharacter: playerCharacter1Augmented.toJS(),
  talents: fromJS(talentsById).toJS(),
  weapons: fromJS(weaponsById).toJS(),
}

const renderComponent = (props = {}) => <PCSheet {...defaultProps} {...props} />

storiesOf('Components/PCSheet', module).add('default', () => renderComponent())
