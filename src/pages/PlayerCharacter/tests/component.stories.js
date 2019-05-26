import React from 'react'

import { fromJS } from 'immutable'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { criticalInjuries, criticalInjury3 } from 'mocks/criticalInjuries'
import { factionsById } from 'mocks/factions'
import {
  playerCharacter1Id,
  playerCharacter1Augmented,
} from 'mocks/playersCharacters'
import { ui, uiElementLoading } from 'mocks/ui'
import { weaponsById } from 'mocks/weapons'

import { PlayerCharacter } from '../component'

const defaultProps = {
  addFavor: action('addFavor'),
  addPlayerCharacterCriticalInjury: action('addPlayerCharacterCriticalInjury'),
  addPlayerCharacterTalent: action('addPlayerCharacterTalent'),
  addPlayerCharacterWeapon: action('addPlayerCharacterWeapon'),
  criticalInjuries: [...criticalInjuries, criticalInjury3],
  editPlayerCharacter: action('editPlayerCharacter'),
  factions: fromJS(factionsById).toJS(),
  getArchetypes: action('getArchetypes'),
  getAuthInfo: action('getAuthInfo'),
  getCareers: action('getCareers'),
  getCriticalInjuries: action('getCriticalInjuries'),
  getFactions: action('getFactions'),
  getPlayerCharacter: action('getPlayerCharacter'),
  getSkills: action('getSkills'),
  getTalents: action('getTalents'),
  getWeapons: action('getWeapons'),
  playerCharacter: playerCharacter1Augmented.toJS(),
  playerCharacterId: `${playerCharacter1Id}`,
  ui: fromJS(ui).toJS(),
  weapons: fromJS(weaponsById).toJS(),
}

const renderComponent = (props = {}) => (
  <PlayerCharacter {...defaultProps} {...props} />
)

storiesOf('Pages/PlayerCharacter', module)
  .add('default', () => renderComponent())
  .add('loading', () => {
    const props = {
      ui: {
        ...ui,
        playersCharacters: uiElementLoading,
      },
    }
    return renderComponent(props)
  })
