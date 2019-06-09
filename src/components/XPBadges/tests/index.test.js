import XPBadges from '../index'

import { XP } from 'utils/definitions'

const xp_available = 100
const xp_total = 200
const defaultProps = {
  xp_available,
  xp_total,
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
    const { getByAltText, getByText, queryByDisplayValue } = renderComponent()

    const xpAvailableBadge = getByAltText(XP.AVAILABLE)
    expect(xpAvailableBadge).toBeInTheDocument()
    const xpAvailableValue = getByText(`${xp_available}`)
    expect(xpAvailableValue).toBeInTheDocument()
    const xpAvailableInput = queryByDisplayValue(`${xp_available}`)
    expect(xpAvailableInput).not.toBeInTheDocument()

    const xpTotalBadge = getByAltText(XP.TOTAL)
    expect(xpTotalBadge).toBeInTheDocument()
    const xpTotalValue = getByText(`${xp_total}`)
    expect(xpTotalValue).toBeInTheDocument()
    const xpTotalInput = queryByDisplayValue(`${xp_total}`)
    expect(xpTotalInput).not.toBeInTheDocument()
  })

  it('should render correctly while editing', () => {
    const props = {
      editing: true,
      setFieldValue: mockSetFieldValue,
    }
    const { getByAltText, getByDisplayValue, queryByText } = renderComponent(
      props,
    )

    const xpAvailableBadge = getByAltText(XP.AVAILABLE)
    expect(xpAvailableBadge).toBeInTheDocument()
    const xpAvailableValue = queryByText(`${xp_available}`)
    expect(xpAvailableValue).not.toBeInTheDocument()
    const xpAvailableInput = getByDisplayValue(`${xp_available}`)
    expect(xpAvailableInput).toBeInTheDocument()

    const newXPAvailable = 300
    fireEvent.change(xpAvailableInput, { target: { value: newXPAvailable } })

    expect(mockSetFieldValue).toHaveBeenCalledWith(
      'xp_available',
      newXPAvailable,
    )

    const xpTotalBadge = getByAltText(XP.TOTAL)
    expect(xpTotalBadge).toBeInTheDocument()
    const xpTotalValue = queryByText(`${xp_total}`)
    expect(xpTotalValue).not.toBeInTheDocument()
    const xpTotalInput = getByDisplayValue(`${xp_total}`)
    expect(xpTotalInput).toBeInTheDocument()

    const newXPTotal = 500
    fireEvent.change(xpTotalInput, { target: { value: newXPTotal } })

    expect(mockSetFieldValue).toHaveBeenCalledWith('xp_total', newXPTotal)
  })
})
