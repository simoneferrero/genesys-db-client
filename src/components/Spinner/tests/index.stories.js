import React from 'react'

import { storiesOf } from '@storybook/react'

import Spinner from '../index'

storiesOf('Components/Spinner', module)
  .add('cover', () => <Spinner />)
  .add('not cover', () => <Spinner cover={false} size={40} />)
