import TalentsTier from '../index'

import { fromJS } from 'immutable'

import {
  playerCharacterTalent1,
  newTalentResponse,
  talent1,
  talent2,
  talentsById,
} from 'mocks/talents'

const mockHandleSubmit = jest.fn()
const mockOnTalentChange = jest.fn()
const talents = fromJS(talentsById).toJS()
const tier = 1
const characterTalents = {
  [playerCharacterTalent1.id]: {
    ...talent1,
    ...playerCharacterTalent1,
  },
}
const defaultProps = {
  characterTalents,
  handleSubmit: mockHandleSubmit,
  onTalentChange: mockOnTalentChange,
  talents,
  tier,
}

const renderComponent = (props = {}) =>
  render(<TalentsTier {...defaultProps} {...props} />)

describe('<TalentsTier />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render correctly', () => {
    const { getByTestId, queryByTestId } = renderComponent()

    const talentsTier = getByTestId(`talents-tier-${tier}`)
    expect(talentsTier).toBeInTheDocument()

    const editButton = queryByTestId(`edit-tier-${tier}-talents`)
    expect(editButton).not.toBeInTheDocument()

    const nonExistingNewTalent = queryByTestId('new-talent')
    expect(nonExistingNewTalent).not.toBeInTheDocument()

    Object.values(talents).forEach(({ id }) => {
      const talent = getByTestId(`talent-${id}`)
      expect(talent).toBeInTheDocument()
    })
  })

  it('should render correctly when isCharacter', () => {
    const props = {
      characterTalents,
      isCharacter: true,
    }
    const { getByTestId, queryByTestId } = renderComponent(props)

    const talentsTier = getByTestId(`talents-tier-${tier}`)
    expect(talentsTier).toBeInTheDocument()

    const editButton = queryByTestId(`edit-tier-${tier}-talents`)
    expect(editButton).not.toBeInTheDocument()

    const nonExistingNewTalent = queryByTestId('new-talent')
    expect(nonExistingNewTalent).not.toBeInTheDocument()

    Object.values(characterTalents).forEach(({ id }) => {
      if (id === playerCharacterTalent1.id) {
        const talent = getByTestId(`talent-${id}`)
        expect(talent).toBeInTheDocument()
      } else {
        const talent = queryByTestId(`talent-${id}`)
        expect(talent).not.toBeInTheDocument()
      }
    })
  })

  it('should correctly order the talents by id', () => {
    const unorderedTalents = {
      [talent2.id]: talent2,
      [talent1.id]: talent1,
    }
    const props = {
      talents: unorderedTalents,
    }
    const { getAllByTestId } = renderComponent(props)

    const renderedTalentsNames = getAllByTestId(/\btalent-\b.*\b-name/i)

    expect(renderedTalentsNames[0]).toHaveTextContent(talent1.name)
    expect(renderedTalentsNames[1]).toHaveTextContent(talent2.name)
  })

  it('should render correctly when show adding new talent', () => {
    const props = {
      showAdd: true,
    }
    const { getByTestId, queryByTestId } = renderComponent(props)

    const talentsTier = getByTestId(`talents-tier-${tier}`)
    expect(talentsTier).toBeInTheDocument()

    const editButton = getByTestId(`edit-tier-${tier}-talents`)
    expect(editButton).toBeInTheDocument()

    const nonExistingNewTalent = queryByTestId('new-talent')
    expect(nonExistingNewTalent).not.toBeInTheDocument()

    Object.values(talents).forEach(({ id }) => {
      const talent = getByTestId(`talent-${id}`)
      expect(talent).toBeInTheDocument()
    })

    fireEvent.click(editButton)

    const cancelButton = getByTestId(`cancel-tier-${tier}-talents`)
    expect(cancelButton).toBeInTheDocument()

    const submitButton = getByTestId(`submit-tier-${tier}-talents`)
    expect(submitButton).toBeInTheDocument()

    const newTalent = getByTestId('new-talent')
    expect(newTalent).toBeInTheDocument()

    fireEvent.click(cancelButton)

    const unmountedNewTalent = queryByTestId('new-talent')
    expect(unmountedNewTalent).not.toBeInTheDocument()

    expect(editButton).toBeInTheDocument()
  })

  it('should reset the form on cancel', () => {
    const props = {
      showAdd: true,
    }

    const {
      getByDisplayValue,
      getByPlaceholderText,
      getByTestId,
      queryByDisplayValue,
    } = renderComponent(props)

    const editButton = getByTestId(`edit-tier-${tier}-talents`)
    fireEvent.click(editButton)

    const cancelButton = getByTestId(`cancel-tier-${tier}-talents`)
    expect(cancelButton).toBeInTheDocument()

    const name = getByPlaceholderText(/talent's name/i)
    expect(name).toBeInTheDocument()
    fireEvent.change(name, {
      target: {
        value: newTalentResponse.name,
      },
    })
    const populatedName = getByDisplayValue(`${newTalentResponse.name}`)
    expect(populatedName).toBeInTheDocument()

    fireEvent.click(cancelButton)

    fireEvent.click(editButton)

    const resetName = queryByDisplayValue(newTalentResponse.name)
    expect(resetName).not.toBeInTheDocument()

    expect(editButton).toBeInTheDocument()
  })

  it('should render correctly when show adding character talent', () => {
    const props = {
      showAdd: true,
      isCharacter: true,
      characterTalents,
    }
    const { getByDisplayValue, getByTestId, queryByTestId } = renderComponent(
      props,
    )

    const talentsTier = getByTestId(`talents-tier-${tier}`)
    expect(talentsTier).toBeInTheDocument()

    const editButton = getByTestId(`edit-tier-${tier}-talents`)
    expect(editButton).toBeInTheDocument()

    const nonExistingTalentIdSelect = queryByTestId('talentId')
    expect(nonExistingTalentIdSelect).not.toBeInTheDocument()

    fireEvent.click(editButton)

    const newTalent = queryByTestId('new-talent')
    expect(newTalent).not.toBeInTheDocument()

    const talentIdSelect = getByTestId('talentId')
    expect(talentIdSelect).toBeInTheDocument()
    const talentIdValue = getByDisplayValue(`${Object.values(talents)[0].id}`)
    expect(talentIdValue).toBeInTheDocument()

    const cancelButton = getByTestId(`cancel-tier-${tier}-talents`)
    expect(cancelButton).toBeInTheDocument()

    const submitButton = getByTestId(`submit-tier-${tier}-talents`)
    expect(submitButton).toBeInTheDocument()

    fireEvent.click(cancelButton)

    const unmountedTalentIdSelect = queryByTestId('talentId')
    expect(unmountedTalentIdSelect).not.toBeInTheDocument()

    expect(editButton).toBeInTheDocument()
  })

  it('should not break if talents are empty', () => {
    const props = {
      talents: {},
    }

    const { getByTestId } = renderComponent(props)

    const talentsTier = getByTestId(`talents-tier-${tier}`)
    expect(talentsTier).toBeInTheDocument()
  })

  it('should render correctly when editing', () => {
    const props = {
      editing: true,
      isCharacter: true,
      characterTalents,
    }
    const { getByTestId } = renderComponent(props)

    Object.values(characterTalents).forEach(({ id }) => {
      const talent = getByTestId(`talent-${id}`)
      expect(talent).toBeInTheDocument()

      const talentNotes = getByTestId(`talent-${id}-notes`)
      expect(talentNotes).toBeInTheDocument()

      const notes = `Some notes for talent ${id}`

      fireEvent.change(talentNotes, {
        target: {
          value: notes,
        },
      })

      expect(mockOnTalentChange).toHaveBeenCalledWith(
        `talents.${id}.notes`,
        notes,
      )
    })
  })

  it('should correctly submit new talent', async () => {
    const props = {
      showAdd: true,
    }
    const {
      getByDisplayValue,
      getByPlaceholderText,
      getByTestId,
    } = renderComponent(props)

    const editButton = getByTestId(`edit-tier-${tier}-talents`)
    fireEvent.click(editButton)

    const name = getByPlaceholderText(/talent's name/i)
    expect(name).toBeInTheDocument()
    fireEvent.change(name, {
      target: {
        value: newTalentResponse.name,
      },
    })
    const populatedName = getByDisplayValue(`${newTalentResponse.name}`)
    expect(populatedName).toBeInTheDocument()

    const description = getByPlaceholderText(/add description/i)
    expect(description).toBeInTheDocument()
    fireEvent.change(description, {
      target: {
        value: newTalentResponse.description,
      },
    })
    const populatedDescription = getByDisplayValue(
      `${newTalentResponse.description}`,
    )
    expect(populatedDescription).toBeInTheDocument()

    const submitButton = getByTestId(`submit-tier-${tier}-talents`)
    fireEvent.click(submitButton)

    await wait(() => {
      expect(mockHandleSubmit).toHaveBeenCalledTimes(1)
    })
  })

  it('should correctly submit new character talent', async () => {
    const props = {
      showAdd: true,
      isCharacter: true,
      characterTalents,
    }
    const { getByTestId } = renderComponent(props)

    const talentsTier = getByTestId(`talents-tier-${tier}`)
    expect(talentsTier).toBeInTheDocument()

    const editButton = getByTestId(`edit-tier-${tier}-talents`)
    expect(editButton).toBeInTheDocument()

    fireEvent.click(editButton)

    const submitButton = getByTestId(`submit-tier-${tier}-talents`)
    expect(submitButton).toBeInTheDocument()

    fireEvent.click(submitButton)

    await wait(() => {
      expect(mockHandleSubmit).toHaveBeenCalledTimes(1)
    })
  })
})
