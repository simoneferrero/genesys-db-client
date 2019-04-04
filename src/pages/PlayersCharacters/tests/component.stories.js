import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { archetypesById } from 'mocks/archetypes'
import { careersById } from 'mocks/careers'
import {
  playersCharactersAllIds,
  playersCharactersById,
} from 'mocks/playersCharacters'

import PlayersCharacters from '../component'

const defaultProps = {
  archetypesById,
  careersById,
  getArchetypes: action('getArchetypes'),
  getCareers: action('getCareers'),
  getPlayersCharacters: action('getPlayersCharacters'),
  playersCharactersAllIds,
  playersCharactersById,
}

storiesOf('Pages/PlayersCharacters', module).add('default', () => (
  <PlayersCharacters {...defaultProps} />
))
