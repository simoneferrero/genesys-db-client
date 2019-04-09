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

  const currentWoundsName = 'attributes.wounds.current'
  const currentStrainName = 'attributes.strain.current'

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

      // info
      const playerNameLabel = getByText(/player name:/i)
      expect(playerNameLabel).toBeInTheDocument()
      const playerNameValue = getByText(player_name)
      expect(playerNameValue).toBeInTheDocument()

      const archetypeLabel = getByText(/archetype:/i)
      expect(archetypeLabel).toBeInTheDocument()
      const archetypeValue = getByText(archetypeName)
      expect(archetypeValue).toBeInTheDocument()

      const characterNameLabel = getByText(/character name:/i)
      expect(characterNameLabel).toBeInTheDocument()
      const characterNameValue = getByText(name)
      expect(characterNameValue).toBeInTheDocument()

      const careerLabel = getByText(/career:/i)
      expect(careerLabel).toBeInTheDocument()
      const careerValue = getByText(careerName)
      expect(careerValue).toBeInTheDocument()

      // characteristics
      const brawnBadge = getByAltText(BRAWN)
      expect(brawnBadge).toBeInTheDocument()
      const brawnValue = getByText(`${brawn}`)
      expect(brawnValue).toBeInTheDocument()

      const agilityBadge = getByAltText(AGILITY)
      expect(agilityBadge).toBeInTheDocument()
      const agilityValue = getByText(`${agility}`)
      expect(agilityValue).toBeInTheDocument()

      const intellectBadge = getByAltText(INTELLECT)
      expect(intellectBadge).toBeInTheDocument()
      const intellectValue = getByText(`${intellect}`)
      expect(intellectValue).toBeInTheDocument()

      const cunningBadge = getByAltText(CUNNING)
      expect(cunningBadge).toBeInTheDocument()
      const cunningValue = getByText(`${cunning}`)
      expect(cunningValue).toBeInTheDocument()

      const willpowerBadge = getByAltText(WILLPOWER)
      expect(willpowerBadge).toBeInTheDocument()
      const willpowerValue = getByText(`${willpower}`)
      expect(willpowerValue).toBeInTheDocument()

      const presenceBadge = getByAltText(PRESENCE)
      expect(presenceBadge).toBeInTheDocument()
      const presenceValue = getByText(`${presence}`)
      expect(presenceValue).toBeInTheDocument()

      // attributes
      const woundsBadge = getByAltText(WOUNDS)
      expect(woundsBadge).toBeInTheDocument()
      const currentWoundsValue = getByText(`${currentWounds}`)
      expect(currentWoundsValue).toBeInTheDocument()
      const totalWoundsValue = getByText(`${totalWounds}`)
      expect(totalWoundsValue).toBeInTheDocument()

      const strainBadge = getByAltText(STRAIN)
      expect(strainBadge).toBeInTheDocument()
      const currentStrainValue = getByText(`${currentStrain}`)
      expect(currentStrainValue).toBeInTheDocument()
      const totalStrainValue = getByText(`${totalStrain}`)
      expect(totalStrainValue).toBeInTheDocument()

      const soakBadge = getByAltText(SOAK)
      expect(soakBadge).toBeInTheDocument()
      const soakValue = getByText(`${soak}`)
      expect(soakValue).toBeInTheDocument()

      const defenseBadge = getByAltText(DEFENSE)
      expect(defenseBadge).toBeInTheDocument()
      const meleeValue = getByText(`${melee}`)
      expect(meleeValue).toBeInTheDocument()
      const rangedValue = getByText(`${ranged}`)
      expect(rangedValue).toBeInTheDocument()

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
    const {
      attributes: {
        wounds: { current: currentWounds },
        strain: { current: currentStrain },
      },
    } = playerCharacter

    await wait(() => {
      const currentWoundsModifiers = getByTestId(
        `badge-modifiers-${currentWoundsName}`,
      )
      expect(currentWoundsModifiers).toBeInTheDocument()
      const decreaseCurrentWounds = getByTestId(`decrease-${currentWoundsName}`)
      expect(decreaseCurrentWounds).toBeInTheDocument()
      fireEvent.click(decreaseCurrentWounds)
      expect(mockSetFieldValue).toHaveBeenCalledWith(
        currentWoundsName,
        currentWounds - 1,
      )
      const increaseCurrentWounds = getByTestId(`increase-${currentWoundsName}`)
      expect(increaseCurrentWounds).toBeInTheDocument()
      fireEvent.click(increaseCurrentWounds)
      expect(mockSetFieldValue).toHaveBeenCalledWith(
        currentWoundsName,
        currentWounds + 1,
      )

      const currentStrainModifiers = getByTestId(
        `badge-modifiers-${currentStrainName}`,
      )
      expect(currentStrainModifiers).toBeInTheDocument()
      const decreaseCurrentStrain = getByTestId(`decrease-${currentStrainName}`)
      expect(decreaseCurrentStrain).toBeInTheDocument()
      fireEvent.click(decreaseCurrentStrain)
      expect(mockSetFieldValue).toHaveBeenCalledWith(
        currentStrainName,
        currentStrain - 1,
      )
      const increaseCurrentStrain = getByTestId(`increase-${currentStrainName}`)
      expect(increaseCurrentStrain).toBeInTheDocument()
      fireEvent.click(increaseCurrentStrain)
      expect(mockSetFieldValue).toHaveBeenCalledWith(
        currentStrainName,
        currentStrain + 1,
      )
    })
  })

  it('should have disabled fields when max/min', async () => {
    const props = {
      editing: true,
      attributes: {
        ...playerCharacter.attributes,
        wounds: {
          current: 0,
          total: 0,
        },
        strain: {
          current: 0,
          total: 0,
        },
      },
    }
    const { getByTestId } = renderComponent(props)

    await wait(() => {
      const decreaseCurrentWounds = getByTestId(`decrease-${currentWoundsName}`)
      expect(decreaseCurrentWounds).toBeDisabled()
      const increaseCurrentWounds = getByTestId(`increase-${currentWoundsName}`)
      expect(increaseCurrentWounds).toBeDisabled()

      const decreaseCurrentStrain = getByTestId(`decrease-${currentStrainName}`)
      expect(decreaseCurrentStrain).toBeDisabled()
      const increaseCurrentStrain = getByTestId(`increase-${currentStrainName}`)
      expect(increaseCurrentStrain).toBeDisabled()
    })
  })

  it('should have disabled fields when submitting', async () => {
    const props = {
      editing: true,
      isSubmitting: true,
    }
    const { getByTestId } = renderComponent(props)

    await wait(() => {
      const decreaseCurrentWounds = getByTestId(`decrease-${currentWoundsName}`)
      expect(decreaseCurrentWounds).toBeDisabled()
      const increaseCurrentWounds = getByTestId(`increase-${currentWoundsName}`)
      expect(increaseCurrentWounds).toBeDisabled()

      const decreaseCurrentStrain = getByTestId(`decrease-${currentStrainName}`)
      expect(decreaseCurrentStrain).toBeDisabled()
      const increaseCurrentStrain = getByTestId(`increase-${currentStrainName}`)
      expect(increaseCurrentStrain).toBeDisabled()
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
