import React, { lazy } from 'react'

import GenesysLogo from 'vectors/GenesysLogo'

// Top level components
const Home = lazy(() => import('pages/Home'))
const PlayersCharacters = lazy(() => import('pages/PlayersCharacters'))
const PlayerCharacter = lazy(() => import('pages/PlayerCharacter'))
const Weapons = lazy(() => import('pages/Weapons'))

const routes = [
  {
    exact: true,
    id: 'home',
    menuItemComponent: <GenesysLogo width={100} />,
    routeComponent: Home,
    showActive: false,
    showInGmMenu: true,
    showInPlayerMenu: true,
    to: '/',
  },
  {
    id: 'players-characters',
    menuItemComponent: 'PCs',
    routeComponent: PlayersCharacters,
    showInGmMenu: true,
    showInPlayerMenu: false,
    to: '/players-characters',
  },
  {
    id: 'player-character',
    menuItemComponent: 'PC Sheet',
    routeComponent: PlayerCharacter,
    showInPlayerMenu: true,
    to: '/players-characters/:id',
  },
  {
    exact: true,
    id: 'weapons',
    menuItemComponent: 'Weapons',
    routeComponent: Weapons,
    showInGmMenu: true,
    showInPlayerMenu: true,
    to: '/weapons',
  },
]

export default routes
