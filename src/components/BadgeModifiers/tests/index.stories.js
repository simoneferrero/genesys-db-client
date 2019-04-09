import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import BadgeModifiers from '../index'

import styled from 'styled-components/macro'

const Wrapper = styled.div`
  width: 70px;
  position: relative;
`

const defaultProps = {
  decrease: action('decrease'),
  increase: action('increase'),
  name: 'Test',
}

const renderComponent = (props = {}) => (
  <BadgeModifiers {...defaultProps} {...props} />
)

storiesOf('Components/BadgeModifiers', module)
  .addDecorator((storyFn) => <Wrapper>{storyFn()}</Wrapper>)
  .add('default', () => renderComponent())
  .add('disabled', () =>
    renderComponent({
      decreaseDisabled: true,
      increaseDisabled: true,
    }),
  )
