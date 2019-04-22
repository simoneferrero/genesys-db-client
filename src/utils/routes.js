import React, { lazy } from 'react'

import GenesysLogo from 'vectors/GenesysLogo'

// Top level components
const Home = lazy(() => import('pages/Home'))
const PlayersCharacters = lazy(() => import('pages/PlayersCharacters'))
const PlayerCharacter = lazy(() => import('pages/PlayerCharacter'))

const routes = [
  {
    exact: true,
    id: 'home',
    menuItemComponent: <GenesysLogo width={100} />,
    routeComponent: Home,
    showActive: false,
    showInMenu: true,
    to: '/',
  },
  {
    id: 'players-characters',
    menuItemComponent: 'PCs',
    routeComponent: PlayersCharacters,
    showInMenu: true,
    to: '/players-characters',
  },
  {
    id: 'player-character',
    menuItemComponent: 'PC Sheet',
    routeComponent: PlayerCharacter,
    to: '/players-characters/:id',
  },
]

export default routes
