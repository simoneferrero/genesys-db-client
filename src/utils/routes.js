import React, { lazy } from 'react'

import GenesysLogo from 'vectors/GenesysLogo'

// Top level components
const CriticalInjuries = lazy(() => import('pages/CriticalInjuries'))
const Home = lazy(() => import('pages/Home'))
const PlayersCharacters = lazy(() => import('pages/PlayersCharacters'))
const PlayerCharacter = lazy(() => import('pages/PlayerCharacter'))
const Talents = lazy(() => import('pages/Talents'))
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
    id: 'adversaries', // TODO: test route
    menuItemComponent: 'NPCs',
    routeComponent: PlayersCharacters, // TODO: change with correct one
    showInGmMenu: true,
    to: '/adversaries',
  },
  {
    id: 'adversary', // TODO: test route
    menuItemComponent: 'Adversary',
    routeComponent: PlayersCharacters, // TODO: change with correct one
    to: '/adversaries/:id',
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
  {
    exact: true,
    id: 'critical-injuries',
    menuItemComponent: 'Critical Injuries',
    routeComponent: CriticalInjuries,
    showInGmMenu: true,
    showInPlayerMenu: true,
    to: '/critical-injuries',
  },
  {
    exact: true,
    id: 'talents',
    menuItemComponent: 'Talents',
    routeComponent: Talents,
    showInGmMenu: true,
    showInPlayerMenu: true,
    to: '/talents',
  },
]

export default routes
