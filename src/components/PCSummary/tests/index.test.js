import { Suspense } from 'react'
import render from 'utils/customTestRenderers'

import PCSummary from '../index'

import { playerCharacterSummary1Augmented } from 'mocks/playersCharacters'

import { ATTRIBUTES, CHARACTERISTICS } from 'utils/definitions'

const renderedComponent = (props = {}) =>
  render(
    <Suspense fallback="Loading...">
      <PCSummary {...playerCharacterSummary1Augmented.toJS()} {...props} />
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

  it('should render correctly', async () => {
    const { getByAltText, getByTestId, getByText } = renderedComponent()

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

  it('should not display the link if hideLink is true', async () => {
    const props = {
      hideLink: true,
    }
    const { queryByTestId } = renderedComponent(props)

    await wait(() => {
      const link = queryByTestId(`pc-sheet-link-${id}`)
      expect(link).not.toBeInTheDocument()
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
