import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Checkbox from '../index'

const defaultProps = {
  checked: true,
  id: 'test',
  label: 'Test',
  name: 'test.test',
  onChange: action('onChange'),
}

const renderComponent = (props = {}) => (
  <Checkbox {...defaultProps} {...props} />
)

storiesOf('Components/Checkbox', module)
  .add('checked', () => renderComponent())
  .add('unchecked', () => renderComponent({ checked: false }))
  .add('disabled', () =>
    renderComponent({
      disabled: true,
    }),
  )
