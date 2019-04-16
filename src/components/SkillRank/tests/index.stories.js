import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import SkillRank from '../index'

const defaultProps = {
  id: 'test',
  onChange: action('increase'),
  rank: 3,
}

const renderComponent = (props = {}) => (
  <SkillRank {...defaultProps} {...props} />
)

storiesOf('Components/SkillRank', module)
  .add('default', () => renderComponent())
  .add('editing', () =>
    renderComponent({ editing: true, decreaseDisabled: true }),
  )
