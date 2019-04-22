import React from 'react'

import { fromJS } from 'immutable'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { factionsById } from 'mocks/factions'
import {
  playerCharacter1Id,
  playerCharacter1Augmented,
} from 'mocks/playersCharacters'
import { uiElement, uiElementLoading } from 'mocks/ui'

import { PlayerCharacter } from '../component'

const defaultProps = {
  addFavor: action('addFavor'),
  editPlayerCharacter: action('editPlayerCharacter'),
  factions: fromJS(factionsById).toJS(),
  factionsUi: uiElement,
  favorsUi: uiElement,
  getArchetypes: action('getArchetypes'),
  getCareers: action('getCareers'),
  getFactions: action('getFactions'),
  getPlayerCharacter: action('getPlayerCharacter'),
  getSkills: action('getSkills'),
  playerCharacter: playerCharacter1Augmented.toJS(),
  playerCharacterId: `${playerCharacter1Id}`,
  playersCharactersUi: uiElement,
}

const renderComponent = (props = {}) => (
  <PlayerCharacter {...defaultProps} {...props} />
)

storiesOf('Pages/PlayerCharacter', module)
  .add('default', () => renderComponent())
  .add('loading', () => {
    const props = {
      playersCharactersUi: uiElementLoading,
    }
    return renderComponent(props)
  })
