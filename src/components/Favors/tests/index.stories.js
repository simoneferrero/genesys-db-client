import React from 'react'

import keyBy from 'lodash/keyBy'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { favor1, favor2, newFavorResponse } from 'mocks/favors'

import { Favors } from '../index'

const favors = keyBy([favor1, favor2, newFavorResponse], 'id')
const defaultProps = {
  initialFavors: favors,
  onChange: action('onChange'),
  onFavorSubmit: action('onFavorSubmit'),
  favors,
}

const renderComponent = (props = {}) => <Favors {...defaultProps} {...props} />

storiesOf('Components/Favors', module)
  .add('default', () => renderComponent())
  .add('editing', () => {
    const props = {
      editing: true,
    }
    return renderComponent(props)
  })
