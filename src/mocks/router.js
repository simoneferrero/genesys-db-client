import routes from 'utils/routes'
import { playerCharacter1Id } from './playersCharacters'

export const initialRouter = {
  action: 'POP',
  location: {
    pathname: '/',
    search: '',
    hash: '',
    key: 'abcde1',
  },
}

export const playerCharacterRouter = {
  ...initialRouter,
  location: {
    ...initialRouter.location,
    pathname: routes
      .find(({ id }) => id === 'player-character')
      .to.replace(':id', playerCharacter1Id),
  },
}
