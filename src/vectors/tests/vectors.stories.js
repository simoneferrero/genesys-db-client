import React from 'react'

import { storiesOf } from '@storybook/react'

import GenesysLogo from '../GenesysLogo'
import DerivedStat, { TYPES } from '../DerivedStat'

storiesOf('Vectors/Logos', module).add('GenesysLogo', () => (
  <GenesysLogo width={300} />
))

Object.values(TYPES).forEach((type) => {
  storiesOf('Vectors/DerivedStat', module).add(type, () => (
    <DerivedStat type={type} width={300} />
  ))
})
