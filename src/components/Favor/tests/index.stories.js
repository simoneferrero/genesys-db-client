import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { favor1, favor2 } from 'mocks/favors'

import Favor from '../index'

const defaultProps = {
  handleSubmit: action('handleSubmit'),
  favor: favor1,
  onFavorChange: action('onFavorChange'),
  setAdding: action('setAdding'),
}

const renderComponent = (props = {}) => <Favor {...defaultProps} {...props} />

storiesOf('Components/Favor', module)
  .add('default', () => renderComponent())
  .add('completed', () => {
    const props = {
      favor: favor2,
    }
    return renderComponent(props)
  })
  .add('adding', () => {
    const props = {
      adding: true,
      favor: {
        type: 'small',
        faction: 'jinteki',
        description: '',
        owed: true,
      },
    }
    return renderComponent(props)
  })
  .add('editing', () => {
    const props = {
      editing: true,
    }
    return renderComponent(props)
  })
  .add('editing completed', () => {
    const props = {
      editing: true,
      favor: favor2,
    }
    return renderComponent(props)
  })
