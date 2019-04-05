import React, { lazy } from 'react'

import GenesysLogo from 'vectors/GenesysLogo'

// Top level components
const Home = lazy(() => import('pages/Home'))
const PlayersCharacters = lazy(() => import('pages/PlayersCharacters'))

const routes = [
  {
    exact: true,
    id: 'home',
    menuItemComponent: <GenesysLogo width={100} />,
    routeComponent: Home,
    showActive: false,
    to: '/',
  },
  {
    id: 'players-characters',
    menuItemComponent: 'PCs',
    routeComponent: PlayersCharacters,
    to: '/players-characters',
  },
]

export default routes
