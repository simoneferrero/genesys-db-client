import TalentsSection from '../index'

import { fromJS } from 'immutable'

import { playerCharacter1TalentsAugmented } from 'mocks/playersCharacters'
import { newTalentResponse, talentsById } from 'mocks/talents'

const mockHandleSubmit = jest.fn()
const mockSetFieldValue = jest.fn()
const characterTalents = fromJS(playerCharacter1TalentsAugmented).toJS()
const talents = fromJS(talentsById).toJS()
const defaultProps = {
  characterTalents,
  handleSubmit: mockHandleSubmit,
  setFieldValue: mockSetFieldValue,
  talents,
}

const tiers = [...Array(5).keys()].map((tier) => tier + 1)

const renderComponent = (props = {}) =>
  render(<TalentsSection {...defaultProps} {...props} />)

describe('<TalentsSection />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render correctly', () => {
    const { getByTestId } = renderComponent()

    const talentsSection = getByTestId('talents')
    expect(talentsSection).toBeInTheDocument()

    tiers.forEach((tier) => {
      const talentsTier = getByTestId(`talents-tier-${tier}`)
      expect(talentsTier).toBeInTheDocument()
    })

    Object.values(talents).forEach(({ id }) => {
      const talent = getByTestId(`talent-${id}`)
      expect(talent).toBeInTheDocument()
    })
  })

  it('should render correctly when isCharacter', () => {
    const props = {
      isCharacter: true,
    }
    const { getByTestId } = renderComponent(props)

    const talentsSection = getByTestId('talents')
    expect(talentsSection).toBeInTheDocument()

    tiers.forEach((tier) => {
      const talentsTier = getByTestId(`talents-tier-${tier}`)
      expect(talentsTier).toBeInTheDocument()
    })

    Object.values(characterTalents).forEach(({ id }) => {
      const talent = getByTestId(`talent-${id}`)
      expect(talent).toBeInTheDocument()
    })
  })

  it('should not break if talents are empty', () => {
    const props = {
      talents: {},
    }

    const { getByTestId } = renderComponent(props)

    const talents = getByTestId('talents')
    expect(talents).toBeInTheDocument()

    tiers.forEach((tier) => {
      const talentsTier = getByTestId(`talents-tier-${tier}`)
      expect(talentsTier).toBeInTheDocument()
    })
  })

  it('should not break if character talents are empty', () => {
    const props = {
      characterTalents: {},
      isCharacter: true,
    }

    const { getByTestId } = renderComponent(props)

    const talents = getByTestId('talents')
    expect(talents).toBeInTheDocument()

    tiers.forEach((tier) => {
      const talentsTier = getByTestId(`talents-tier-${tier}`)
      expect(talentsTier).toBeInTheDocument()
    })
  })

  it('should render correctly when editing', () => {
    const props = {
      editing: true,
      isCharacter: true,
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

      expect(mockSetFieldValue).toHaveBeenCalledWith(
        `talents.${id}.notes`,
        notes,
      )
    })
  })

  tiers.forEach((tier) => {
    it(`should render correctly when show adding new tier ${tier} talent`, () => {
      const props = {
        showAdd: true,
      }
      const { getByTestId } = renderComponent(props)

      const talentsTier = getByTestId(`talents-tier-${tier}`)
      expect(talentsTier).toBeInTheDocument()

      const editButton = getByTestId(`edit-tier-${tier}-talents`)
      expect(editButton).toBeInTheDocument()

      fireEvent.click(editButton)

      const newTalent = getByTestId('new-talent')
      expect(newTalent).toBeInTheDocument()
    })

    it(`should render correctly when show adding new tier ${tier} character talent`, () => {
      const props = {
        isCharacter: true,
        showAdd: true,
      }
      const { getByTestId, queryByTestId } = renderComponent(props)

      const talentsTier = getByTestId(`talents-tier-${tier}`)
      expect(talentsTier).toBeInTheDocument()

      const editButton = getByTestId(`edit-tier-${tier}-talents`)
      expect(editButton).toBeInTheDocument()

      fireEvent.click(editButton)

      const newTalent = queryByTestId('new-talent')
      expect(newTalent).not.toBeInTheDocument()

      const talentIdSelect = getByTestId('talentId')
      expect(talentIdSelect).toBeInTheDocument()
    })

    it(`should correctly submit new talent for tier ${tier}`, async () => {
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

    it(`should correctly submit new character talent for tier ${tier}`, async () => {
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
})
