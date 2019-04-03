import React from 'react'

// Head setup
import { Helmet } from 'react-helmet'
import { HEAD_INFO } from 'utils/definitions'

// Redux setup
import { Provider } from 'react-redux'
import configureStore from 'reducers/store'

// Router setup
import { ConnectedRouter } from 'connected-react-router/immutable'
import history from 'utils/history'
import { Route, Switch } from 'react-router-dom'

// Routes
import routes from 'utils/routes'

import Sidebar from 'components/Sidebar'
import MenuItem from 'components/MenuItem'

import GlobalStyles from 'styles/globalStyles'

const App = () => (
  <>
    <Helmet
      defaultTitle={HEAD_INFO.TITLE}
      titleTemplate={`${HEAD_INFO.TITLE} - %s`}
    >
      <meta content={HEAD_INFO.CONTENT} name="description" />
    </Helmet>
    <Provider store={configureStore()}>
      <GlobalStyles />
      <ConnectedRouter history={history}>
        <Sidebar>
          {routes.map((
            { routeComponent, menuItemComponent, ...route }, // eslint-disable-line no-unused-vars
          ) => (
            <MenuItem key={route.id} {...route}>
              {menuItemComponent}
            </MenuItem>
          ))}
        </Sidebar>
        <Switch>
          {routes.map(({ routeComponent, id, to }) => (
            <Route component={routeComponent} exact key={id} path={to} />
          ))}
        </Switch>
      </ConnectedRouter>
    </Provider>
  </>
)

export default App
