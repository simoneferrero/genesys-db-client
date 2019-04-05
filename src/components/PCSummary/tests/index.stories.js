import React from 'react'

import { storiesOf } from '@storybook/react'

import { playerCharacter1Augmented } from 'mocks/playersCharacters'

import { PCSummary } from '../index'

const defaultProps = {
  ...playerCharacter1Augmented,
}

storiesOf('Components/PCSummary', module).add('default', () => (
  <PCSummary {...defaultProps} />
))
