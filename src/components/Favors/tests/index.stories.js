import React from 'react'

import { fromJS } from 'immutable'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { factionsById } from 'mocks/factions'
import { favor1, favor2, newFavorResponse } from 'mocks/favors'

import Favors from '../index'

const defaultProps = {
  factions: fromJS(factionsById).toJS(),
  favors: {
    [favor1.id]: favor1,
    [favor2.id]: favor2,
    [newFavorResponse.id]: newFavorResponse,
  },
  handleSubmit: action('handleSubmit'),
  setFieldValue: action('setFieldValue'),
}

const renderComponent = (props = {}) => <Favors {...defaultProps} {...props} />

storiesOf('Components/Favors', module)
  .add('default', () => renderComponent())
  .add('editing', () => renderComponent({ editing: true }))
