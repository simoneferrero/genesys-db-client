import Header from '../index'

const renderComponent = () => render(<Header />)

describe('<Header />', () => {
  it('should render the logo', () => {
    const { getByTestId } = renderComponent()
    const logo = getByTestId(/logo/i)
    expect(logo).toBeInTheDocument()
  })

  it('should render the header title', () => {
    const { getByText } = renderComponent()
    const title = getByText(/tfl tube status/i)
    expect(title).toBeInTheDocument()
  })
})
