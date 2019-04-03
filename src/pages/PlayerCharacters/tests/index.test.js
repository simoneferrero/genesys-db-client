import render from 'utils/customTestRenderers'

import PlayerCharacters from '../index'

import { playerCharactersAllIds } from 'mocks/playerCharacters'

jest.mock('actions/playerCharacters', () => {
  const {
    GET_PLAYER_CHARACTERS,
  } = require('actions/playerCharacters/constants')
  return {
    getPlayerCharacters: jest.fn(() => ({
      type: GET_PLAYER_CHARACTERS,
      payload: {},
    })),
  }
})
import { getPlayerCharacters } from 'actions/playerCharacters'

const renderComponent = (props = {}) => render(<PlayerCharacters {...props} />)

describe('<PlayerCharacters />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render the page correctly', () => {
    const { getByTestId } = renderComponent()

    const home = getByTestId(/player-characters/i)
    expect(home).toBeInTheDocument()

    playerCharactersAllIds.forEach((id) => {
      const pcSummary = getByTestId(`pc-summary-${id}`)
      expect(pcSummary).toBeInTheDocument()
    })
  })

  it('should dispatch getPlayerCharacters on mount', () => {
    renderComponent()
    expect(getPlayerCharacters).toHaveBeenCalledTimes(1)
  })
})
