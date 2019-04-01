import initStoryshots, {
  multiSnapshotWithOptions,
} from '@storybook/addon-storyshots'
import styleSheetSerializer from 'jest-styled-components/src/styleSheetSerializer'
import { addSerializer } from 'jest-specific-snapshot'

import App from './App'

import routes from 'utils/routes'

// Create snapshots from stories
addSerializer(styleSheetSerializer)
initStoryshots({
  test: multiSnapshotWithOptions({}),
})

const renderComponent = () => render(<App />)

describe('<App />', () => {
  it('should render the correct elements', () => {
    const { getByTestId } = renderComponent()

    const sidebar = getByTestId(/sidebar/i)
    expect(sidebar).toBeInTheDocument()

    routes.forEach(({ id }) => {
      const menuItem = getByTestId(`menu-item-${id}`)
      expect(menuItem).toBeInTheDocument()
    })

    const home = getByTestId(/home/i)
    expect(home).toBeInTheDocument()
  })

  it('changes route correctly', () => {
    const { getByTestId } = renderComponent()

    routes.forEach(({ id }) => {
      const menuItem = getByTestId(`menu-item-${id}`)
      fireEvent.click(menuItem)

      const route = getByTestId(id)
      expect(route).toBeInTheDocument()
    })
  })
})
