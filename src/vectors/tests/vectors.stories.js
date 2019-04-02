import React from 'react'

import { storiesOf } from '@storybook/react'

import GenesysLogo from '../GenesysLogo'
import AttributesBadge, { TYPES } from '../AttributesBadge'
import CharacteristicsBadge from '../CharacteristicsBadge'

import { CHARACTERISTICS } from 'utils/definitions'

storiesOf('Vectors/Logos', module).add('GenesysLogo', () => (
  <GenesysLogo width={300} />
))

Object.values(TYPES).forEach((type) => {
  storiesOf('Vectors/AttributesBadge', module).add(type, () => (
    <AttributesBadge type={type} width={300} />
  ))
})

Object.values(CHARACTERISTICS).forEach((type) => {
  storiesOf('Vectors/CharacteristicsBadge', module).add(type, () => (
    <CharacteristicsBadge type={type} width={300} />
  ))
})
