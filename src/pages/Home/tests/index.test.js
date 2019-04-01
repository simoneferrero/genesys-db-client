import Home from '../index'

const renderComponent = (props = {}) => render(<Home {...props} />)

describe('<Home />', () => {
  it('should render the page correctly', () => {
    const { getByTestId, getByText } = renderComponent()

    const home = getByTestId(/home/i)
    expect(home).toBeInTheDocument()

    const genesysLogo = getByTestId(/genesys-logo/i)
    expect(genesysLogo).toBeInTheDocument()

    const title = getByText(/sotb gm resources/i)
    expect(title).toBeInTheDocument()
  })
})
