import React from 'react'

import GenesysLogo from 'vectors/GenesysLogo'

// Top level components
import Home from 'pages/Home'
import PlayersCharacters from 'pages/PlayersCharacters'

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
