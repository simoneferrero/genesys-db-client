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
import { weaponsById } from 'mocks/weapons'

import { PlayerCharacter } from '../component'

const defaultProps = {
  addFavor: action('addFavor'),
  addPlayerCharacterWeapon: action('addPlayerCharacterWeapon'),
  editPlayerCharacter: action('editPlayerCharacter'),
  factions: fromJS(factionsById).toJS(),
  factionsUi: uiElement,
  favorsUi: uiElement,
  getArchetypes: action('getArchetypes'),
  getAuthInfo: action('getAuthInfo'),
  getCareers: action('getCareers'),
  getFactions: action('getFactions'),
  getPlayerCharacter: action('getPlayerCharacter'),
  getSkills: action('getSkills'),
  getWeapons: action('getWeapons'),
  playerCharacter: playerCharacter1Augmented.toJS(),
  playerCharacterId: `${playerCharacter1Id}`,
  playersCharactersUi: uiElement,
  weaponsUi: uiElement,
  weapons: fromJS(weaponsById).toJS(),
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
