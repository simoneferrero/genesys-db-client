import { Suspense } from 'react'
import render from 'utils/customTestRenderers'

import PCSummary from '../index'

import { playerCharacterSummary1Augmented } from 'mocks/playersCharacters'

import { ATTRIBUTES, CHARACTERISTICS } from 'utils/definitions'

const mockSetFieldValue = jest.fn()
const playerCharacter = playerCharacterSummary1Augmented.toJS()
const defaultProps = {
  ...playerCharacter,
  setFieldValue: mockSetFieldValue,
}

const renderComponent = (props = {}) =>
  render(
    <Suspense fallback="Loading...">
      <PCSummary {...defaultProps} {...props} />
    </Suspense>,
  )

describe('<PCSummary />', () => {
  const {
    archetype: { name: archetypeName },
    attributes: {
      defense: { melee, ranged },
      soak,
      strain: { current: currentStrain, total: totalStrain },
      wounds: { current: currentWounds, total: totalWounds },
    },
    career: { name: careerName },
    characteristics: {
      agility,
      brawn,
      cunning,
      intellect,
      presence,
      willpower,
    },
    id,
    name,
    player_name,
  } = playerCharacterSummary1Augmented.toJS()
  const { DEFENSE, SOAK, STRAIN, WOUNDS } = ATTRIBUTES
  const {
    AGILITY,
    BRAWN,
    CUNNING,
    INTELLECT,
    PRESENCE,
    WILLPOWER,
  } = CHARACTERISTICS

  const brawnName = 'characteristics.brawn'
  const agilityName = 'characteristics.agility'
  const intellectName = 'characteristics.intellect'
  const cunningName = 'characteristics.cunning'
  const willpowerName = 'characteristics.willpower'
  const presenceName = 'characteristics.presence'
  const soakName = 'attributes.soak'
  const totalWoundsName = 'attributes.wounds.total'
  const currentWoundsName = 'attributes.wounds.current'
  const totalStrainName = 'attributes.strain.total'
  const currentStrainName = 'attributes.strain.current'
  const meleeDefenseName = 'attributes.defense.melee'
  const rangedDefenseName = 'attributes.defense.ranged'

  const testCases = [
    {
      name: brawnName,
      value: brawn,
    },
    {
      name: agilityName,
      value: agility,
    },
    {
      name: intellectName,
      value: intellect,
    },
    {
      name: cunningName,
      value: cunning,
    },
    {
      name: willpowerName,
      value: willpower,
    },
    {
      name: presenceName,
      value: presence,
    },
    {
      name: soakName,
      value: soak,
    },
    {
      name: totalWoundsName,
      value: totalWounds,
    },
    {
      name: currentWoundsName,
      value: currentWounds,
    },
    {
      name: totalStrainName,
      value: totalStrain,
    },
    {
      name: currentStrainName,
      value: currentStrain,
    },
    {
      name: meleeDefenseName,
      value: melee,
    },
    {
      name: rangedDefenseName,
      value: ranged,
    },
  ]

  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render correctly', async () => {
    const { getByAltText, getByTestId, getByText } = renderComponent()

    await wait(() => {
      const summary = getByTestId(`pc-summary-${id}`)
      expect(summary).toBeInTheDocument()

      const testCases = [
        {
          name: new RegExp('player name:', 'i'),
          value: player_name,
        },
        {
          name: new RegExp('archetype:', 'i'),
          value: archetypeName,
        },
        {
          name: new RegExp('character name:', 'i'),
          value: name,
        },
        {
          name: new RegExp('career:', 'i'),
          value: careerName,
        },
        {
          name: BRAWN,
          value: `${brawn}`,
        },
        {
          name: AGILITY,
          value: `${agility}`,
        },
        {
          name: INTELLECT,
          value: `${intellect}`,
        },
        {
          name: CUNNING,
          value: `${cunning}`,
        },
        {
          name: WILLPOWER,
          value: `${willpower}`,
        },
        {
          name: PRESENCE,
          value: `${presence}`,
        },
        {
          name: WOUNDS,
          value: `${currentWounds}`,
        },
        {
          name: WOUNDS,
          value: `${totalWounds}`,
        },
        {
          name: STRAIN,
          value: `${currentStrain}`,
        },
        {
          name: STRAIN,
          value: `${totalStrain}`,
        },
        {
          name: SOAK,
          value: `${soak}`,
        },
        {
          name: DEFENSE,
          value: `${melee}`,
        },
        {
          name: DEFENSE,
          value: `${ranged}`,
        },
      ]

      testCases.forEach(({ name, value }) => {
        let label

        if (typeof name === 'object') {
          label = getByText(name)
        } else {
          label = getByAltText(name)
        }

        expect(label).toBeInTheDocument()
        const displayValue = getByText(value)
        expect(displayValue).toBeInTheDocument()
      })

      // Link
      const link = getByTestId(`pc-sheet-link-${id}`)
      expect(link).toBeInTheDocument()
    })
  })

  it('should render correctly when editing', async () => {
    const props = {
      editing: true,
    }
    const { getByTestId } = renderComponent(props)

    await wait(() => {
      testCases.forEach(({ name, value }) => {
        const modifiers = getByTestId(`badge-modifiers-${name}`)
        expect(modifiers).toBeInTheDocument()
        const decrease = getByTestId(`decrease-${name}`)
        expect(decrease).toBeInTheDocument()
        fireEvent.click(decrease)
        expect(mockSetFieldValue).toHaveBeenCalledWith(name, value - 1)
        const increase = getByTestId(`increase-${name}`)
        expect(increase).toBeInTheDocument()
        fireEvent.click(increase)
        expect(mockSetFieldValue).toHaveBeenCalledWith(name, value + 1)
      })
    })
  })

  it('should have disabled fields when min', async () => {
    const props = {
      editing: true,
      characteristics: {
        brawn: 1,
        agility: 1,
        intellect: 1,
        cunning: 1,
        willpower: 1,
        presence: 1,
      },
      attributes: {
        soak: 0,
        wounds: {
          current: 0,
          total: 0,
        },
        strain: {
          current: 0,
          total: 0,
        },
        defense: {
          melee: 0,
          ranged: 0,
        },
      },
    }
    const { getByTestId } = renderComponent(props)

    await wait(() => {
      testCases.forEach(({ name }) => {
        const decrease = getByTestId(`decrease-${name}`)
        expect(decrease).toBeDisabled()
      })
    })
  })

  it('should have disabled fields when max', async () => {
    const props = {
      editing: true,
      characteristics: {
        brawn: 5,
        agility: 5,
        intellect: 5,
        cunning: 5,
        willpower: 5,
        presence: 5,
      },
    }
    const { getByTestId } = renderComponent(props)

    await wait(() => {
      testCases.forEach(({ name }) => {
        const increase = getByTestId(`increase-${name}`)

        if (name.indexOf('characteristics.') > -1) {
          expect(increase).toBeDisabled()
        } else {
          expect(increase).not.toBeDisabled()
        }
      })
    })
  })

  it('should have disabled fields when submitting', async () => {
    const props = {
      editing: true,
      isSubmitting: true,
    }
    const { getByTestId } = renderComponent(props)

    await wait(() => {
      testCases.forEach(({ name }) => {
        const decrease = getByTestId(`decrease-${name}`)
        expect(decrease).toBeDisabled()
        const increase = getByTestId(`increase-${name}`)
        expect(increase).toBeDisabled()
      })
    })
  })

  it('should not break if setFieldValue is not defined', async () => {
    const props = {
      editing: true,
      setFieldValue: undefined,
    }
    const { getByTestId } = renderComponent(props)

    await wait(() => {
      const decreaseCurrentWounds = getByTestId(`decrease-${currentWoundsName}`)
      fireEvent.click(decreaseCurrentWounds)

      const summary = getByTestId(`pc-summary-${id}`)
      expect(summary).toBeInTheDocument()
    })
  })

  it('should not display the link if hideLink is true', async () => {
    const props = {
      hideLink: true,
    }
    const { queryByTestId } = renderComponent(props)

    await wait(() => {
      const link = queryByTestId(`pc-sheet-link-${id}`)
      expect(link).not.toBeInTheDocument()
    })
  })
})
