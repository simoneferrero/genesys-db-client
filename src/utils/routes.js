import React from 'react'

import GenesysLogo from 'logos/GenesysLogo'

// Top level components
import Home from 'pages/Home'
import PlayerCharacters from 'pages/PlayerCharacters'

// TODO: rename children and component
const routes = [
  {
    children: <GenesysLogo width={100} />,
    component: Home,
    exact: true,
    id: 'home',
    showActive: false,
    to: '/',
  },
  {
    children: 'PLAYER CHARACTERS',
    component: PlayerCharacters,
    id: 'player-characters',
    to: '/player-characters',
  },
]

export default routes
