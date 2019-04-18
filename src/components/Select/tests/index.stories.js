import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Select from '../index'

const options = [
  {
    label: 'Option one',
    value: 'optionOne',
  },
  {
    label: 'Option two',
    value: 'optionTwo',
  },
  {
    label: 'Option three',
    value: 'optionThree',
  },
]
const defaultProps = {
  name: 'test',
  onBlur: action('onBlur'),
  onChange: action('onChange'),
  options,
  value: options[0],
}

const renderComponent = (props = {}) => <Select {...defaultProps} {...props} />

storiesOf('Components/Select', module)
  .add('default', () => renderComponent())
  .add('disabled', () => renderComponent({ disabled: true }))
