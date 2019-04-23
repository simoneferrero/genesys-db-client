import initStoryshots, {
  Stories2SnapsConverter,
  multiSnapshotWithOptions,
} from '@storybook/addon-storyshots'
import styleSheetSerializer from 'jest-styled-components/src/styleSheetSerializer'
import { addSerializer } from 'jest-specific-snapshot'

import App from './App'

import routes from 'utils/routes'

import { store } from 'mocks'
import { playerCharacter1Id } from 'mocks/playersCharacters'

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

const renderComponent = (props = {}) => render(<App {...props} />)

describe('<App />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render the correct elements', async () => {
    const { getByTestId, queryByTestId } = renderComponent()

    await wait(() => {
      const sidebar = getByTestId(/sidebar/i)
      expect(sidebar).toBeInTheDocument()

      routes.forEach(({ id, showInMenu }) => {
        if (showInMenu) {
          const menuItem = getByTestId(`menu-item-${id}`)
          expect(menuItem).toBeInTheDocument()
        } else {
          const menuItem = queryByTestId(`menu-item-${id}`)
          expect(menuItem).not.toBeInTheDocument()
        }
      })

      const home = getByTestId(/home/i)
      expect(home).toBeInTheDocument()
    })
  })

  it('should change routes correctly', async () => {
    const props = {
      store,
    }
    const { getByTestId } = renderComponent(props)

    const playersCharactersMenuItem = getByTestId(
      /menu-item-players-characters/i,
    )
    fireEvent.click(playersCharactersMenuItem)

    const playersCharactersRoute = await waitForElement(() =>
      getByTestId(/players-characters/i),
    )
    expect(playersCharactersRoute).toBeInTheDocument()

    const playerCharacterLink = await waitForElement(() =>
      getByTestId(`pc-sheet-link-${playerCharacter1Id}`),
    )
    fireEvent.click(playerCharacterLink)

    const playerCharacterRoute = await waitForElement(() =>
      getByTestId(/player-character/i),
    )
    expect(playerCharacterRoute).toBeInTheDocument()
  })
})
