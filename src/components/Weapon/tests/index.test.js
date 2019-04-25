import Weapon from '../index'

import { fromJS } from 'immutable'

import { skillsById } from 'mocks/skills'
import { weapon1, newWeaponResponse } from 'mocks/weapons'

import { Formik } from 'formik'

import { colours } from 'styles/constants'

const mockHandleSubmit = jest.fn()
const mockSetFieldValue = jest.fn()
const defaultProps = {
  skills: fromJS(skillsById).toJS(),
  weapon: weapon1,
  setFieldValue: mockSetFieldValue,
}

const renderComponent = (props = {}) =>
  render(<Weapon {...defaultProps} {...props} />)

const renderWithFormik = (formProps = {}) =>
  render(
    <Formik
      onSubmit={mockHandleSubmit}
      render={({ values, ...props }) => (
        <Weapon skills={defaultProps.skills} weapon={values} isNew {...props} />
      )}
      {...formProps}
    />,
  )

describe('<Weapon />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render correctly when not adding or editing', () => {
    const { getByTestId, getByText, queryByTestId } = renderComponent()

    const existingWeapon = getByTestId(`weapon-${weapon1.id}`)
    expect(existingWeapon).toBeInTheDocument()

    const form = queryByTestId(/new-weapon/i)
    expect(form).not.toBeInTheDocument()

    Object.entries(weapon1).forEach(([key, value]) => {
      if (key !== 'id' && key !== 'name') {
        const field = getByTestId(`weapon-${weapon1.id}-${key}`)
        expect(field).toBeInTheDocument()

        let fieldValue
        if (key === 'restricted') {
          fieldValue = getByText(/no/gi)
        } else {
          fieldValue = getByText(new RegExp(`${value}`, 'i'))
        }
        expect(fieldValue).toBeInTheDocument()
      }
    })

    const dropdownButton = getByTestId(`dropdown-${weapon1.id}`)
    expect(dropdownButton).toBeInTheDocument()
    expect(dropdownButton).toHaveStyle(`background: ${colours.teal};`)

    const name = getByText(weapon1.name)
    expect(name).toBeInTheDocument()

    const content = getByTestId(`weapon-${weapon1.id}-content`)
    expect(content).toBeInTheDocument()
    expect(content).toHaveStyle('display: none;')

    fireEvent.click(dropdownButton)
    expect(dropdownButton).toHaveStyle(`background: ${colours.veryLightBlue};`)
    expect(content).toHaveStyle('display: grid;')
  })

  it('should correctly display the value of restricted if restricted', () => {
    const props = {
      weapon: {
        ...weapon1,
        restricted: true,
      },
    }
    const { getByText } = renderComponent(props)

    const restrictedFieldValue = getByText(/yes/gi)
    expect(restrictedFieldValue).toBeInTheDocument()
  })

  it('should not break if skills are empty', () => {
    const props = {
      skills: {},
    }
    const { getByTestId } = renderComponent(props)

    const existingWeapon = getByTestId(`weapon-${weapon1.id}`)
    expect(existingWeapon).toBeInTheDocument()
  })

  it('should render correctly when adding', () => {
    const skill_id = skillsById.athletics.id
    const range = 'engaged'
    const props = {
      adding: true,
      initialValues: {
        crit: 0,
        damage: 0,
        encumbrance: 0,
        hard_points: 0,
        name: '',
        price: 0,
        range,
        rarity: 0,
        restricted: false,
        skill_id,
        special: '',
      },
    }
    const {
      getByDisplayValue,
      getByTestId,
      getByText,
      queryByTestId,
      queryByText,
    } = renderWithFormik(props)

    const existingWeapon = queryByTestId(/weapon-/i)
    expect(existingWeapon).not.toBeInTheDocument()

    const form = getByTestId(/new-weapon/i)
    expect(form).toBeInTheDocument()

    const fields = [
      { id: 'name', label: 'Name' },
      { id: 'special', label: 'Special' },
      { id: 'damage', label: 'Damage' },
      { id: 'crit', label: 'Crit' },
      { id: 'encumbrance', label: 'Encumbrance' },
      { id: 'hard_points', label: 'Hard Points' },
      { id: 'price', label: 'Price' },
      { id: 'rarity', label: 'Rarity' },
    ]
    fields.forEach(({ id, label }) => {
      const labelElement = getByText(label)
      expect(labelElement).toBeInTheDocument()

      const input = getByTestId(id)
      expect(input).toBeInTheDocument()

      fireEvent.change(input, {
        target: {
          value: newWeaponResponse[id],
        },
      })

      const populatedInput = getByDisplayValue(`${newWeaponResponse[id]}`)
      expect(populatedInput).toBeInTheDocument()
    })

    const selectFields = [
      { label: 'Skill', value: skill_id },
      { label: 'Range', value: range },
    ]
    selectFields.forEach(({ label, value }) => {
      const labelElement = getByText(label)
      expect(labelElement).toBeInTheDocument()

      const elementValue = getByDisplayValue(value)
      expect(elementValue).toBeInTheDocument()
    })

    const restrictedInput = getByTestId(/restricted/i)
    expect(restrictedInput).toBeInTheDocument()

    const notRestricted = queryByText(/yes/gi)
    expect(notRestricted).not.toBeInTheDocument()

    fireEvent.click(restrictedInput)

    const restricted = getByText(/yes/gi)
    expect(restricted).toBeInTheDocument()
  })

  it('should render correctly when editing', () => {
    const props = {
      editing: true,
    }
    const { getByTestId, getByText } = renderComponent(props)

    const existingWeapon = getByTestId(`weapon-${weapon1.id}`)
    expect(existingWeapon).toBeInTheDocument()

    Object.entries(weapon1).forEach(([key, value]) => {
      if (key !== 'id' && key !== 'name') {
        const field = getByTestId(`weapon-${weapon1.id}-${key}`)
        expect(field).toBeInTheDocument()

        let fieldValue
        if (key === 'restricted') {
          fieldValue = getByText(value ? 'Yes' : 'No')
        } else {
          fieldValue = getByText(new RegExp(`${value}`, 'i'))
        }
        expect(fieldValue).toBeInTheDocument()
      }
    })

    const deleteButton = getByTestId(/deleteWeaponButton/i)
    expect(deleteButton).toBeInTheDocument()
    const deleteButtonText = getByText(/delete/gi)
    expect(deleteButtonText).toBeInTheDocument()

    fireEvent.click(deleteButton)
    expect(mockSetFieldValue).toHaveBeenCalledWith(
      `deletedWeapons.${weapon1.id}`,
      true,
    )
  })

  it('should render correctly when deleting', () => {
    const props = {
      deleting: true,
      editing: true,
    }
    const { getByTestId, getByText } = renderComponent(props)

    const existingWeapon = getByTestId(`weapon-${weapon1.id}`)
    expect(existingWeapon).toBeInTheDocument()

    Object.entries(weapon1).forEach(([key, value]) => {
      if (key !== 'id') {
        let fieldValue
        if (key === 'restricted') {
          fieldValue = getByText(value ? 'Yes' : 'No')
        } else {
          fieldValue = getByText(new RegExp(`${value}`, 'i'))
        }
        expect(fieldValue).toHaveStyle(`
          text-decoration: line-through;
          opacity: 0.5;
        `)
      }
    })

    const deleteButton = getByTestId(/deleteWeaponButton/i)
    expect(deleteButton).toBeInTheDocument()
    const deleteButtonText = getByText(/undo/gi)
    expect(deleteButtonText).toBeInTheDocument()

    fireEvent.click(deleteButton)
    expect(mockSetFieldValue).toHaveBeenCalledWith(
      `deletedWeapons.${weapon1.id}`,
      false,
    )
  })
})
