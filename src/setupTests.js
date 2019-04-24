import React from 'react'
import { fireEvent, render, wait, waitForElement } from 'react-testing-library'

// Test localstorage
import 'jest-localstorage-mock'

// Expose CSS in snapshots
import 'jest-styled-components'

// Extend jest with jest-dom capabilities
import 'jest-dom/extend-expect'

// Clean up automatically after each test
import 'react-testing-library/cleanup-after-each'

import { apiPath } from 'mocks'

// Remove addon-info markup from snapshots
jest.mock('@storybook/addon-info', () => ({
  withInfo: (storyFn) => storyFn(),
  setDefaults: () => {},
}))

// Make React and react-testing-library available globally in tests
global.React = React
global.fireEvent = fireEvent
global.render = render
global.wait = wait
global.waitForElement = waitForElement

// Remove error from test
global.XMLHttpRequest = undefined

// Make environment variables available to Jest by adding them below
process.env.REACT_APP_API_PATH = apiPath
