import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { authInfoType } from 'types/authentication'

// Routes
import routes from 'utils/routes'

import MenuItem from 'components/MenuItem'

import { MdClose, MdMenu } from 'react-icons/md'

import {
  StyledCover,
  StyledIcon,
  StyledLogoutButton,
  StyledWrapper,
} from './styles'

/** Retractable component to host the main app menu */
export const Sidebar = ({
  authInfo: { playerCharacterId, role },
  className,
  logout,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  if (!role) {
    return null
  }

  /* eslint-disable no-unused-vars */
  const gmRoutes = routes
    .filter(({ showInGmMenu }) => showInGmMenu)
    .map(
      ({
        menuItemComponent,
        routeComponent,
        showInGmMenu,
        showInPlayerMenu,
        ...route
      }) => (
        <MenuItem key={route.id} onClick={() => setIsOpen(false)} {...route}>
          {menuItemComponent}
        </MenuItem>
      ),
    )

  const playerCharacterRoutes = routes
    .filter(({ showInPlayerMenu }) => showInPlayerMenu)
    .map((
      {
        menuItemComponent,
        routeComponent,
        showInGmMenu,
        showInPlayerMenu,
        to,
        ...route
      }, // eslint-disable-line no-unused-vars
    ) => {
      const modifiedTo =
        route.id === 'player-character'
          ? to.replace(':id', playerCharacterId)
          : to

      return (
        <MenuItem
          key={route.id}
          onClick={() => setIsOpen(false)}
          to={modifiedTo}
          {...route}
        >
          {menuItemComponent}
        </MenuItem>
      )
    })
  /* eslint-enable no-unused-vars */

  const onLogoutClick = () => {
    setIsOpen(false)
    logout()
  }

  return (
    <StyledWrapper className={className} data-testid="sidebar" isOpen={isOpen}>
      <StyledIcon
        data-testid="icon"
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <MdClose data-testid="icon-close" />
        ) : (
          <MdMenu data-testid="icon-menu" />
        )}
      </StyledIcon>
      <StyledCover
        data-testid="cover"
        isOpen={isOpen}
        onClick={() => (isOpen ? setIsOpen(false) : null)}
      />
      {role === 'gm' ? gmRoutes : playerCharacterRoutes}
      <StyledLogoutButton onClick={onLogoutClick} type="button">
        Logout
      </StyledLogoutButton>
    </StyledWrapper>
  )
}

Sidebar.propTypes = {
  /** User data */
  authInfo: authInfoType.isRequired,
  /** Custom styles */
  className: PropTypes.string,
  /** Dispatched to log the user out */
  logout: PropTypes.func.isRequired,
}

export default memo(Sidebar)
