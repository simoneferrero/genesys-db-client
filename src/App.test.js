import initStoryshots, {
  Stories2SnapsConverter,
  multiSnapshotWithOptions,
} from '@storybook/addon-storyshots'
import styleSheetSerializer from 'jest-styled-components/src/styleSheetSerializer'
import { addSerializer } from 'jest-specific-snapshot'

import App from './App'

import routes from 'utils/routes'

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

const renderComponent = () => render(<App />)

describe('<App />', () => {
  it('should render the correct elements', async () => {
    const { getByTestId } = renderComponent()

    await wait(() => {
      const sidebar = getByTestId(/sidebar/i)
      expect(sidebar).toBeInTheDocument()

      routes.forEach(({ id }) => {
        const menuItem = getByTestId(`menu-item-${id}`)
        expect(menuItem).toBeInTheDocument()
      })

      const home = getByTestId(/home/i)
      expect(home).toBeInTheDocument()
    })
  })

  it('changes route correctly', () => {
    const { getByTestId } = renderComponent()

    routes.forEach(async ({ id }) => {
      const menuItem = getByTestId(`menu-item-${id}`)
      fireEvent.click(menuItem)

      const route = await waitForElement(() => getByTestId(id))
      expect(route).toBeInTheDocument()
    })
  })
})
