import initStoryshots, {
  multiSnapshotWithOptions,
} from '@storybook/addon-storyshots'
import styleSheetSerializer from 'jest-styled-components/src/styleSheetSerializer'
import { addSerializer } from 'jest-specific-snapshot'

import App from './App'

// Create snapshots from stories
addSerializer(styleSheetSerializer)
initStoryshots({
  test: multiSnapshotWithOptions({}),
})

const renderComponent = () => render(<App />)

describe('<App />', () => {
  it('renders a header', () => {
    const { getByTestId } = renderComponent()
    const result = getByTestId(/header$/i)
    expect(result).toBeInTheDocument()
  })

  it('renders a status cards container', () => {
    const { getByTestId } = renderComponent()
    const result = getByTestId(/statusCardsContainer$/i)
    expect(result).toBeInTheDocument()
  })
})
