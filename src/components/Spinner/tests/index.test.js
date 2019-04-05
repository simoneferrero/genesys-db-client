import Spinner from '../index'

const renderComponent = (props = {}) => render(<Spinner {...props} />)

describe('<Spinner />', () => {
  it('should render correctly', () => {
    const { getByTestId } = renderComponent()

    const header = getByTestId(/spinner/i)
    expect(header).toBeInTheDocument()
  })
})
