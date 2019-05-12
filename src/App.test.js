import initStoryshots, {
  Stories2SnapsConverter,
  multiSnapshotWithOptions,
} from '@storybook/addon-storyshots'
import styleSheetSerializer from 'jest-styled-components/src/styleSheetSerializer'
import { addSerializer } from 'jest-specific-snapshot'

import { fromJS } from 'immutable'

import App from './App'

import routes from 'utils/routes'

import AuthenticationRecord from 'reducers/authentication/records'

import { store } from 'mocks'
import { authInfoGmResponse } from 'mocks/authentication'
import { playerCharacter1Id } from 'mocks/playersCharacters'
import { initialRouter } from 'mocks/router'

jest.mock('redux-saga', () => () => {})

// Create snapshots from stories
addSerializer(styleSheetSerializer)
initStoryshots({
  asyncJest: true,
  test: ({ context, done, story }) => {
    const converter = new Stories2SnapsConverter()
    const snapshotFileName = converter.getSnapshotFileName(context)
    const storyElement = story.render()
    const { container } = render(storyElement)

    if (snapshotFileName) {
      setTimeout(() => {
        expect(container.firstChild).toMatchSpecificSnapshot(snapshotFileName)
        done()
      }, 1)
    }
    multiSnapshotWithOptions({})
  },
})

const defaultProps = {
  store,
}
const renderComponent = (props = {}) =>
  render(<App {...defaultProps} {...props} />)

describe('<App />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render correctly with empty store', async () => {
    const props = {
      store: undefined,
    }
    const { getByTestId, queryByTestId } = renderComponent(props)

    const sidebar = queryByTestId('sidebar')
    expect(sidebar).not.toBeInTheDocument()

    const home = await waitForElement(() => getByTestId('home'))
    expect(home).toBeInTheDocument()
  })

  it('should render the correct elements', async () => {
    const props = {
      store: store.set('router', fromJS(initialRouter)),
    }
    const { getByTestId, queryByTestId } = renderComponent(props)

    await wait(() => {
      const sidebar = getByTestId('sidebar')
      expect(sidebar).toBeInTheDocument()

      routes.forEach(({ id, showInPlayerMenu }) => {
        if (showInPlayerMenu) {
          const menuItem = getByTestId(`menu-item-${id}`)
          expect(menuItem).toBeInTheDocument()
        } else {
          const menuItem = queryByTestId(`menu-item-${id}`)
          expect(menuItem).not.toBeInTheDocument()
        }
      })

      const home = getByTestId('home')
      expect(home).toBeInTheDocument()
    })
  })

  it('should change routes correctly for player', async () => {
    const { getByTestId } = renderComponent()

    // PlayerCharacter
    const playerCharacterMenuItem = getByTestId('menu-item-player-character')
    fireEvent.click(playerCharacterMenuItem)
    const playerCharacterRoute = await waitForElement(() =>
      getByTestId('player-character'),
    )
    expect(playerCharacterRoute).toBeInTheDocument()

    // Weapons
    const weaponsMenuItem = getByTestId('menu-item-weapons')
    fireEvent.click(weaponsMenuItem)
    const weaponsRoute = await waitForElement(() => getByTestId('weapons'))
    expect(weaponsRoute).toBeInTheDocument()

    // Critical injuries
    const criticalInjuriesMenuItem = getByTestId('menu-item-critical-injuries')
    fireEvent.click(criticalInjuriesMenuItem)
    const criticalInjuriesRoute = await waitForElement(() =>
      getByTestId('criticalInjuries'),
    )
    expect(criticalInjuriesRoute).toBeInTheDocument()
  })

  it('should change routes correctly for gm', async () => {
    const modifiedStore = store.set(
      'authentication',
      AuthenticationRecord(authInfoGmResponse),
    )
    const props = {
      store: modifiedStore,
    }
    const { getByTestId } = renderComponent(props)

    // PlayersCharacters
    const playersCharactersMenuItem = await waitForElement(() =>
      getByTestId('menu-item-players-characters'),
    )
    fireEvent.click(playersCharactersMenuItem)
    const playersCharactersRoute = await waitForElement(() =>
      getByTestId('players-characters'),
    )
    expect(playersCharactersRoute).toBeInTheDocument()

    // PlayerCharacter
    const playerCharacterLink = await waitForElement(() =>
      getByTestId(`pc-sheet-link-${playerCharacter1Id}`),
    )
    fireEvent.click(playerCharacterLink)
    const playerCharacterRoute = await waitForElement(() =>
      getByTestId(/player-character/i),
    )
    expect(playerCharacterRoute).toBeInTheDocument()

    // Weapons
    const weaponsMenuItem = getByTestId('menu-item-weapons')
    fireEvent.click(weaponsMenuItem)
    const weaponsRoute = await waitForElement(() => getByTestId('weapons'))
    expect(weaponsRoute).toBeInTheDocument()

    // Critical injuries
    const criticalInjuriesMenuItem = getByTestId('menu-item-critical-injuries')
    fireEvent.click(criticalInjuriesMenuItem)
    const criticalInjuriesRoute = await waitForElement(() =>
      getByTestId('criticalInjuries'),
    )
    expect(criticalInjuriesRoute).toBeInTheDocument()
  })
})
