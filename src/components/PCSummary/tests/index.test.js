import { Suspense } from 'react'

import PCSummary from '../index'

import { playerCharacter1Augmented } from 'mocks/playersCharacters'

import { ATTRIBUTES, CHARACTERISTICS } from 'utils/definitions'

const renderedComponent = (props = {}) =>
  render(
    <Suspense fallback="Loading...">
      <PCSummary {...playerCharacter1Augmented} {...props} />
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
  } = playerCharacter1Augmented
  const { DEFENSE, SOAK, STRAIN, WOUNDS } = ATTRIBUTES
  const {
    AGILITY,
    BRAWN,
    CUNNING,
    INTELLECT,
    PRESENCE,
    WILLPOWER,
  } = CHARACTERISTICS

  it('should render correctly', async () => {
    const { getByTestId, getByText } = renderedComponent()

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
      const brawnBadge = getByTestId(`characteristics-badge-${BRAWN}`)
      expect(brawnBadge).toBeInTheDocument()
      const brawnValue = getByText(`${brawn}`)
      expect(brawnValue).toBeInTheDocument()

      const agilityBadge = getByTestId(`characteristics-badge-${AGILITY}`)
      expect(agilityBadge).toBeInTheDocument()
      const agilityValue = getByText(`${agility}`)
      expect(agilityValue).toBeInTheDocument()

      const intellectBadge = getByTestId(`characteristics-badge-${INTELLECT}`)
      expect(intellectBadge).toBeInTheDocument()
      const intellectValue = getByText(`${intellect}`)
      expect(intellectValue).toBeInTheDocument()

      const cunningBadge = getByTestId(`characteristics-badge-${CUNNING}`)
      expect(cunningBadge).toBeInTheDocument()
      const cunningValue = getByText(`${cunning}`)
      expect(cunningValue).toBeInTheDocument()

      const willpowerBadge = getByTestId(`characteristics-badge-${WILLPOWER}`)
      expect(willpowerBadge).toBeInTheDocument()
      const willpowerValue = getByText(`${willpower}`)
      expect(willpowerValue).toBeInTheDocument()

      const presenceBadge = getByTestId(`characteristics-badge-${PRESENCE}`)
      expect(presenceBadge).toBeInTheDocument()
      const presenceValue = getByText(`${presence}`)
      expect(presenceValue).toBeInTheDocument()

      // attributes
      const woundsBadge = getByTestId(`attributes-badge-${WOUNDS}`)
      expect(woundsBadge).toBeInTheDocument()
      const currentWoundsValue = getByText(`${currentWounds}`)
      expect(currentWoundsValue).toBeInTheDocument()
      const totalWoundsValue = getByText(`${totalWounds}`)
      expect(totalWoundsValue).toBeInTheDocument()

      const strainBadge = getByTestId(`attributes-badge-${STRAIN}`)
      expect(strainBadge).toBeInTheDocument()
      const currentStrainValue = getByText(`${currentStrain}`)
      expect(currentStrainValue).toBeInTheDocument()
      const totalStrainValue = getByText(`${totalStrain}`)
      expect(totalStrainValue).toBeInTheDocument()

      const soakBadge = getByTestId(`attributes-badge-${SOAK}`)
      expect(soakBadge).toBeInTheDocument()
      const soakValue = getByText(`${soak}`)
      expect(soakValue).toBeInTheDocument()

      const defenseBadge = getByTestId(`attributes-badge-${DEFENSE}`)
      expect(defenseBadge).toBeInTheDocument()
      const meleeValue = getByText(`${melee}`)
      expect(meleeValue).toBeInTheDocument()
      const rangedValue = getByText(`${ranged}`)
      expect(rangedValue).toBeInTheDocument()
    })
  })

  it('should not break if archetype or career are undefined', async () => {
    const props = {
      archetype: undefined,
      career: undefined,
    }
    const { getByTestId } = renderedComponent(props)

    const summary = await waitForElement(() => getByTestId(`pc-summary-${id}`))
    expect(summary).toBeInTheDocument()
  })
})
