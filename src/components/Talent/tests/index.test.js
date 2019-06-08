import Talent from '../index'

import { talent1, talent2 } from 'mocks/talents'

import { Formik } from 'formik'

import { colours } from 'styles/constants'

const mockHandleSubmit = jest.fn()
const mockSetFieldValue = jest.fn()
const defaultProps = {
  talent: talent1,
  setFieldValue: mockSetFieldValue,
}

const renderComponent = (props = {}) =>
  render(<Talent {...defaultProps} {...props} />)

const renderWithFormik = (formProps = {}) =>
  render(
    <Formik
      onSubmit={mockHandleSubmit}
      render={({ values, ...props }) => (
        <Talent skills={defaultProps.skills} talent={values} isNew {...props} />
      )}
      {...formProps}
    />,
  )

describe('<Talent />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render correctly when not in character', () => {
    const { getByTestId, getByText, queryByTestId } = renderComponent()

    const existingTalent = getByTestId(`talent-${talent1.id}`)
    expect(existingTalent).toBeInTheDocument()

    const form = queryByTestId('new-talent')
    expect(form).not.toBeInTheDocument()

    Object.entries(talent1).forEach(([key, value]) => {
      if (key !== 'id' && key !== 'tier') {
        const field = getByTestId(`talent-${talent1.id}-${key}`)
        expect(field).toBeInTheDocument()

        let fieldValue
        if (key === 'ranked') {
          expect(field).toHaveStyle(`color: ${colours.veryLightBlue}`)
        } else if (key === 'description') {
          fieldValue = getByText(new RegExp(value.substring(0, 20), 'g'))
          expect(fieldValue).toBeInTheDocument()
        } else {
          fieldValue = getByText(value)
          expect(fieldValue).toBeInTheDocument()
        }
      }
    })

    const notes = queryByTestId(`talent-${talent1.id}-notes`)
    expect(notes).not.toBeInTheDocument()
  })

  it('should render correctly when in character', () => {
    const id = 1
    const talent = {
      ...talent1,
      id,
      notes: 'Test notes',
      rank: 3,
    }
    const props = {
      isCharacter: true,
      talent,
    }
    const { getByTestId, getByText, queryByTestId } = renderComponent(props)

    const existingTalent = getByTestId(`talent-${id}`)
    expect(existingTalent).toBeInTheDocument()

    const form = queryByTestId('new-talent')
    expect(form).not.toBeInTheDocument()

    Object.entries(talent).forEach(([key, value]) => {
      if (key !== 'id' && key !== 'tier' && key !== 'ranked') {
        const field = getByTestId(`talent-${id}-${key}`)
        expect(field).toBeInTheDocument()

        let fieldValue
        if (key === 'description') {
          fieldValue = getByText(new RegExp(value.substring(0, 20), 'g'))
          expect(fieldValue).toBeInTheDocument()
        } else if (key === 'rank') {
          fieldValue = getByText(new RegExp(`${value}`, 'g'))
        } else {
          fieldValue = getByText(value)
          expect(fieldValue).toBeInTheDocument()
        }
      }
    })

    const ranked = queryByTestId(`talent-${talent1.id}-ranked`)
    expect(ranked).not.toBeInTheDocument()
  })

  it('should render correctly when in character and not ranked or notes', () => {
    const id = 1
    const talent = {
      ...talent2,
      id,
      notes: '',
    }
    const props = {
      isCharacter: true,
      talent,
    }
    const { getByTestId, queryByTestId } = renderComponent(props)

    const existingTalent = getByTestId(`talent-${id}`)
    expect(existingTalent).toBeInTheDocument()

    const ranked = getByTestId(`talent-${id}-ranked`)
    expect(ranked).toBeInTheDocument()
    expect(ranked).not.toHaveStyle(`color: ${colours.veryLightBlue}`)

    const rank = queryByTestId(`talent-${talent1.id}-rank`)
    expect(rank).not.toBeInTheDocument()

    const notes = queryByTestId(`talent-${talent1.id}-notes`)
    expect(notes).not.toBeInTheDocument()
  })

  it('should render correctly when editing in character', () => {
    const id = 1
    const notesText = 'Test notes'
    const rank = 3
    const talent = {
      ...talent1,
      id,
      notes: notesText,
      rank,
    }
    const props = {
      editing: true,
      isCharacter: true,
      talent,
    }
    const { getByDisplayValue, getByTestId, queryByTestId } = renderComponent(
      props,
    )

    const existingTalent = getByTestId(`talent-${id}`)
    expect(existingTalent).toBeInTheDocument()

    const form = queryByTestId('new-talent')
    expect(form).not.toBeInTheDocument()

    const decreaseButton = getByTestId(`decrease-${id}-rank`)
    expect(decreaseButton).toBeInTheDocument()

    fireEvent.click(decreaseButton)

    expect(mockSetFieldValue).toHaveBeenNthCalledWith(
      1,
      `talents.${id}.rank`,
      rank - 1,
    )

    const increaseButton = getByTestId(`increase-${id}-rank`)
    expect(increaseButton).toBeInTheDocument()

    fireEvent.click(increaseButton)

    expect(mockSetFieldValue).toHaveBeenNthCalledWith(
      2,
      `talents.${id}.rank`,
      rank + 1,
    )

    const notes = getByDisplayValue(notesText)
    expect(notes).toBeInTheDocument()

    const changedNotesText = 'New note'
    fireEvent.change(notes, {
      target: {
        value: changedNotesText,
      },
    })

    expect(mockSetFieldValue).toHaveBeenNthCalledWith(
      3,
      `talents.${id}.notes`,
      changedNotesText,
    )
  })

  it('should disable buttons if decreaseEnabled and decreaseDisabled are true', () => {
    const id = 1
    const talent = {
      ...talent1,
      id,
      notes: '',
      rank: 1,
    }
    const props = {
      decreaseDisabled: true,
      editing: true,
      increaseDisabled: true,
      isCharacter: true,
      talent,
    }
    const { getByTestId } = renderComponent(props)

    const decreaseButton = getByTestId(`decrease-${id}-rank`)
    expect(decreaseButton).toBeDisabled()

    fireEvent.click(decreaseButton)

    const increaseButton = getByTestId(`increase-${id}-rank`)
    expect(increaseButton).toBeDisabled()

    fireEvent.click(increaseButton)

    expect(mockSetFieldValue).not.toHaveBeenCalled()
  })

  it('should disable buttons and fields if submitting', () => {
    const id = 1
    const talent = {
      ...talent1,
      id,
      notes: '',
      rank: 1,
    }
    const props = {
      editing: true,
      isCharacter: true,
      isSubmitting: true,
      talent,
    }
    const { getByTestId } = renderComponent(props)

    const decreaseButton = getByTestId(`decrease-${id}-rank`)
    expect(decreaseButton).toBeDisabled()

    fireEvent.click(decreaseButton)

    const increaseButton = getByTestId(`increase-${id}-rank`)
    expect(increaseButton).toBeDisabled()

    fireEvent.click(increaseButton)

    expect(mockSetFieldValue).not.toHaveBeenCalled()

    const notes = getByTestId(`talent-${id}-notes`)
    expect(notes).toBeDisabled()
  })

  it('should render correctly when new', () => {
    const activation = 'Passive'
    const tier = 1
    const props = {
      isNew: true,
      initialValues: {
        activation,
        description: '',
        name: '',
        ranked: true,
        tier,
      },
    }
    const { getByDisplayValue, getByTestId, getByText } = renderWithFormik(
      props,
    )

    const form = getByTestId(/new-talent/i)
    expect(form).toBeInTheDocument()

    const fields = [
      { id: 'name', label: 'Name' },
      { id: 'description', label: 'Description' },
    ]
    fields.forEach(({ id, label }) => {
      const labelElement = getByText(label)
      expect(labelElement).toBeInTheDocument()

      const input = getByTestId(`new-talent-${id}`)
      expect(input).toBeInTheDocument()

      fireEvent.change(input, {
        target: {
          value: talent1[id],
        },
      })

      const populatedInput = getByDisplayValue(`${talent1[id]}`)
      expect(populatedInput).toBeInTheDocument()
    })

    const selectFields = [{ label: 'Activation', value: activation }]
    selectFields.forEach(({ label, value }) => {
      const labelElement = getByText(label)
      expect(labelElement).toBeInTheDocument()

      const elementValue = getByDisplayValue(`${value}`)
      expect(elementValue).toBeInTheDocument()
    })

    const ranked = getByTestId(`new-talent-ranked`)
    expect(ranked).toBeInTheDocument()
    expect(ranked).toHaveStyle(`color: ${colours.veryLightBlue}`)

    fireEvent.click(ranked)

    expect(ranked).not.toHaveStyle(`color: ${colours.veryLightBlue}`)
  })
})
