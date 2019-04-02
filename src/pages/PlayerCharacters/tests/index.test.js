import Home from '../index'

const renderComponent = (props = {}) => render(<Home {...props} />)

describe('<Home />', () => {
  it('should render the page correctly', () => {
    const { getByTestId, getByText } = renderComponent()

    const home = getByTestId(/player-characters/i)
    expect(home).toBeInTheDocument()

    const title = getByText(/player characters/i)
    expect(title).toBeInTheDocument()
  })
})
