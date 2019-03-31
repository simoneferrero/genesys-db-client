import React from 'react'
import { render } from 'react-testing-library'

import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import configureStore from 'reducers/store'
import { store } from 'mocks'

const renderComponent = (
  ui,
  {
    route = '/',
    history = createBrowserHistory({ initialEntries: [route] }),
    initialState = store,
    ...options
  } = {},
) => ({
  ...render(
    <Provider store={configureStore(initialState, history)}>
      <Router history={history}>{ui}</Router>
    </Provider>,
    options,
  ),
})

export default renderComponent
