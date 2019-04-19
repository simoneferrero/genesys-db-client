import React from 'react'

import { fromJS } from 'immutable'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { factionsById } from 'mocks/factions'
import { favor1, newFavorResponse } from 'mocks/favors'

import Favor from '../index'

const defaultProps = {
  factions: fromJS(factionsById).toJS(),
  favors: [favor1, newFavorResponse],
  handleSubmit: action('handleSubmit'),
  onFavorChange: action('onFavorChange'),
  type: 'owed',
}

const renderComponent = (props = {}) => <Favor {...defaultProps} {...props} />

storiesOf('Components/FavorsSection', module)
  .add('default', () => renderComponent())
  .add('editing', () => renderComponent({ editing: true }))
