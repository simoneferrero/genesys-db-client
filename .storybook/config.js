import React from 'react'
import { addDecorator, configure } from '@storybook/react'
import requireContext from 'require-context.macro'
import { withInfo } from '@storybook/addon-info'

// Add global styles to all stories
import GlobalStyles from 'styles/globalStyles'

addDecorator(withInfo)

const SuspenseWithStyleDecorator = (storyFn) => (
  <React.Suspense fallback="Loading...">
    <GlobalStyles />
    {storyFn()}
  </React.Suspense>
)
addDecorator(SuspenseWithStyleDecorator)

// Load all files in src folder which match `*.stories.js`
const req = requireContext('../src', true, /\.stories\.js$/)
const loadStories = () => req.keys().forEach((filename) => req(filename))

configure(loadStories, module)
