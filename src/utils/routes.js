import React from 'react'

import GenesysLogo from 'logos/GenesysLogo'

// Top level components
import Home from 'pages/Home'
import PlayerCharacters from 'pages/PlayerCharacters'

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
    id: 'player-characters',
    menuItemComponent: 'PCs',
    routeComponent: PlayerCharacters,
    to: '/player-characters',
  },
]

export default routes
