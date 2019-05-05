import Equipment from '../index'

import { playerCharacter1Response } from 'mocks/playersCharacters'

const { equipment } = playerCharacter1Response
const mockSetFieldValue = jest.fn()
const defaultProps = {
  equipment,
  setFieldValue: mockSetFieldValue,
}

const renderComponent = (props = {}) =>
  render(<Equipment {...defaultProps} {...props} />)

describe('<Equipment />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render correctly', () => {
    const { getByTestId, getByText, queryByDisplayValue } = renderComponent()

    const equipmentWrapper = getByTestId(/equipment/gi)
    expect(equipmentWrapper).toBeInTheDocument()

    const renderedMoneyLabel = getByText(/money:/i)
    expect(renderedMoneyLabel).toBeInTheDocument()
    const renderedMoneyValue = getByText(`${equipment.money} credits`)
    expect(renderedMoneyValue).toBeInTheDocument()
    const moneyInput = queryByDisplayValue(`${equipment.money}`)
    expect(moneyInput).not.toBeInTheDocument()

    const renderedArmorLabel = getByText(/armor:/i)
    expect(renderedArmorLabel).toBeInTheDocument()
    const renderedArmorValue = getByText(equipment.armor)
    expect(renderedArmorValue).toBeInTheDocument()
    const armorInput = queryByDisplayValue(equipment.armor)
    expect(armorInput).not.toBeInTheDocument()

    const renderedGearLabel = getByText(/gear:/i)
    expect(renderedGearLabel).toBeInTheDocument()
    const renderedGearValue = getByText(equipment.gear)
    expect(renderedGearValue).toBeInTheDocument()
    const gearInput = queryByDisplayValue(equipment.gear)
    expect(gearInput).not.toBeInTheDocument()
  })

  it('should render correctly when editing', () => {
    const props = {
      editing: true,
    }
    const {
      getByDisplayValue,
      getByTestId,
      getByText,
      queryByTestId,
      queryByText,
    } = renderComponent(props)

    const equipmentWrapper = getByTestId(/equipment/gi)
    expect(equipmentWrapper).toBeInTheDocument()

    const renderedMoneyLabel = getByText(/money:/i)
    expect(renderedMoneyLabel).toBeInTheDocument()
    const renderedMoneyValue = queryByText(`${equipment.money} credits`)
    expect(renderedMoneyValue).not.toBeInTheDocument()
    const moneyInput = getByDisplayValue(`${equipment.money}`)
    expect(moneyInput).toBeInTheDocument()

    const newMoney = '100'
    fireEvent.change(moneyInput, { target: { value: newMoney } })
    expect(mockSetFieldValue).toHaveBeenCalledWith('equipment.money', newMoney)
    mockSetFieldValue.mockClear()

    const renderedArmorLabel = getByText(/armor:/i)
    expect(renderedArmorLabel).toBeInTheDocument()
    const renderedArmorValue = queryByTestId(/armor/gi)
    expect(renderedArmorValue).not.toBeInTheDocument()
    const armorInput = getByDisplayValue(equipment.armor)
    expect(armorInput).toBeInTheDocument()

    const newArmor = 'New armor'
    fireEvent.change(armorInput, { target: { value: newArmor } })
    expect(mockSetFieldValue).toHaveBeenCalledWith('equipment.armor', newArmor)
    mockSetFieldValue.mockClear()

    const renderedGearLabel = getByText(/gear:/i)
    expect(renderedGearLabel).toBeInTheDocument()
    const renderedGearValue = queryByTestId(/gear/gi)
    expect(renderedGearValue).not.toBeInTheDocument()
    const gearInput = getByDisplayValue(equipment.gear)
    expect(gearInput).toBeInTheDocument()

    const newGear = 'New gear'
    fireEvent.change(gearInput, { target: { value: newGear } })
    expect(mockSetFieldValue).toHaveBeenCalledWith('equipment.gear', newGear)
  })

  it('should render correctly when submitting', () => {
    const props = {
      editing: true,
      isSubmitting: true,
    }
    const { getByDisplayValue } = renderComponent(props)

    const moneyInput = getByDisplayValue(`${equipment.money}`)
    expect(moneyInput).toBeInTheDocument()
    expect(moneyInput).toBeDisabled()

    const armorInput = getByDisplayValue(equipment.armor)
    expect(armorInput).toBeInTheDocument()
    expect(armorInput).toBeDisabled()

    const gearInput = getByDisplayValue(equipment.gear)
    expect(gearInput).toBeInTheDocument()
    expect(gearInput).toBeDisabled()
  })
})
