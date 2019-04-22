import React, { Suspense } from 'react'
import PropTypes from 'prop-types'

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

import MenuItem from 'components/MenuItem'
import Sidebar from 'components/Sidebar'
import Spinner from 'components/Spinner'

import GlobalStyles from 'styles/globalStyles'

const App = ({ store }) => (
  <>
    <Helmet
      defaultTitle={HEAD_INFO.TITLE}
      titleTemplate={`${HEAD_INFO.TITLE} - %s`}
    >
      <meta content={HEAD_INFO.CONTENT} name="description" />
    </Helmet>
    <Provider store={configureStore(store)}>
      <GlobalStyles />
      <ConnectedRouter history={history}>
        <Sidebar>
          {routes
            .filter(({ showInMenu }) => showInMenu)
            .map((
              { menuItemComponent, routeComponent, showInMenu, ...route }, // eslint-disable-line no-unused-vars
            ) => (
              <MenuItem key={route.id} {...route}>
                {menuItemComponent}
              </MenuItem>
            ))}
        </Sidebar>
        <Suspense fallback={<Spinner />}>
          <Switch>
            {routes.map(({ routeComponent, id, to }) => (
              <Route component={routeComponent} exact key={id} path={to} />
            ))}
          </Switch>
        </Suspense>
      </ConnectedRouter>
    </Provider>
  </>
)

App.propTypes = {
  store: PropTypes.object,
}

export default App
