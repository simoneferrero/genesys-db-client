import XPBadges from '../index'

import { XP } from 'utils/definitions'

const xpAvailable = 100
const xpTotal = 200
const defaultProps = {
  xpAvailable,
  xpTotal,
}

const mockSetFieldValue = jest.fn()
const renderComponent = (props = {}) =>
  render(<XPBadges {...defaultProps} {...props} />)

describe('<XPBadges />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render correctly', () => {
    const {
      getByAltText,
      getByTestId,
      getByText,
      queryByDisplayValue,
    } = renderComponent()

    const xpBadges = getByTestId('xpBadges')
    expect(xpBadges).toBeInTheDocument()

    const xpAvailableBadge = getByAltText(XP.AVAILABLE)
    expect(xpAvailableBadge).toBeInTheDocument()
    const xpAvailableValue = getByText(`${xpAvailable}`)
    expect(xpAvailableValue).toBeInTheDocument()
    const xpAvailableInput = queryByDisplayValue(`${xpAvailable}`)
    expect(xpAvailableInput).not.toBeInTheDocument()

    const xpTotalBadge = getByAltText(XP.TOTAL)
    expect(xpTotalBadge).toBeInTheDocument()
    const xpTotalValue = getByText(`${xpTotal}`)
    expect(xpTotalValue).toBeInTheDocument()
    const xpTotalInput = queryByDisplayValue(`${xpTotal}`)
    expect(xpTotalInput).not.toBeInTheDocument()
  })

  it('should render correctly while editing', () => {
    const props = {
      editing: true,
      setFieldValue: mockSetFieldValue,
    }
    const {
      getByAltText,
      getByDisplayValue,
      getByTestId,
      queryByText,
    } = renderComponent(props)

    const xpBadges = getByTestId('xpBadges')
    expect(xpBadges).toBeInTheDocument()

    const xpAvailableBadge = getByAltText(XP.AVAILABLE)
    expect(xpAvailableBadge).toBeInTheDocument()
    const xpAvailableValue = queryByText(`${xpAvailable}`)
    expect(xpAvailableValue).not.toBeInTheDocument()
    const xpAvailableInput = getByDisplayValue(`${xpAvailable}`)
    expect(xpAvailableInput).toBeInTheDocument()

    const newXPAvailable = 300
    fireEvent.change(xpAvailableInput, { target: { value: newXPAvailable } })

    expect(mockSetFieldValue).toHaveBeenCalledWith(
      'xp.available',
      newXPAvailable,
    )

    const xpTotalBadge = getByAltText(XP.TOTAL)
    expect(xpTotalBadge).toBeInTheDocument()
    const xpTotalValue = queryByText(`${xpTotal}`)
    expect(xpTotalValue).not.toBeInTheDocument()
    const xpTotalInput = getByDisplayValue(`${xpTotal}`)
    expect(xpTotalInput).toBeInTheDocument()

    const newXPTotal = 500
    fireEvent.change(xpTotalInput, { target: { value: newXPTotal } })

    expect(mockSetFieldValue).toHaveBeenCalledWith('xp.total', newXPTotal)
  })

  it('should not break if values are not defined', () => {
    const props = {
      xpAvailable: undefined,
      xpTotal: undefined,
    }
    const { getAllByText, getByTestId } = renderComponent(props)

    const xpBadges = getByTestId('xpBadges')
    expect(xpBadges).toBeInTheDocument()

    const emptyXPFieldsLength = getAllByText(`${0}`).length
    expect(emptyXPFieldsLength).toBe(2)
  })
})
