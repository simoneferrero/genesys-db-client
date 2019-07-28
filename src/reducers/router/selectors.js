import { createSelector } from 'reselect'

import UrlPattern from 'url-pattern'
import routes from 'utils/routes'

export const routerSelector = (state) => state.get('router')

export const playerCharacterIdSelector = createSelector(
  routerSelector,
  (router) => {
    const url = routes
      .find(({ id }) => id === 'player-character')
      .to.replace('/:id', '(/:id)')
    // Get player character ID from pathname
    const pattern = new UrlPattern(url)
    const pathname = router.getIn(['location', 'pathname'])
    const match = pattern.match(pathname)
    return match ? match.id : null
  },
)

export const adversaryIdSelector = createSelector(
  routerSelector,
  (router) => {
    const url = routes
      .find(({ id }) => id === 'adversary')
      .to.replace('/:id', '(/:id)')
    // Get adversary ID from pathname
    const pattern = new UrlPattern(url)
    const pathname = router.getIn(['location', 'pathname'])
    const match = pattern.match(pathname)
    return match ? match.id : null
  },
)
