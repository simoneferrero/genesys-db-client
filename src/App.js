import React from 'react'

// Redux setup
import { Provider } from 'react-redux'
import configureStore from 'reducers/store'

// Router setup
import { ConnectedRouter } from 'connected-react-router/immutable'
import history from 'utils/history'
import { Route, Switch } from 'react-router-dom'

// Top level components
import Header from 'components/Header'
import StatusCardsContainer from 'components/StatusCardsContainer'

import GlobalStyles from 'styles/globalStyles'

const App = () => (
  <Provider store={configureStore()}>
    <GlobalStyles />
    <ConnectedRouter history={history}>
      <Header />
      <Switch>
        <Route exact path="/" component={StatusCardsContainer} />
      </Switch>
    </ConnectedRouter>
  </Provider>
)

export default App
