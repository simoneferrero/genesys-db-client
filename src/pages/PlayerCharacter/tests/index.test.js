import { Suspense } from 'react'
import render from 'utils/customTestRenderers'

import ReducerRecord from 'reducers/records'

import PlayerCharacter from '../index'

import { formikActions, store } from 'mocks'
import { newFavor } from 'mocks/favors'
import {
  playerCharacter1Id,
  playerCharacter1Augmented,
  playerCharacter1Response,
} from 'mocks/playersCharacters'

import { ADD_FAVOR } from 'actions/favors/constants'
import {
  EDIT_PLAYER_CHARACTER,
  GET_PLAYER_CHARACTER,
  GET_PLAYER_CHARACTER_SUCCESS,
} from 'actions/playersCharacters/constants'

jest.mock('actions/favors', () => ({
  addFavor: jest.fn(),
  addFavorSuccess: jest.fn(),
  addFavorError: jest.fn(),
}))
import { addFavor } from 'actions/favors'

jest.mock('actions/playersCharacters', () => ({
  editPlayerCharacter: jest.fn(),
  editPlayerCharacterSuccess: jest.fn(),
  editPlayerCharacterError: jest.fn(),
  getPlayerCharacter: jest.fn(),
  getPlayerCharacterSuccess: jest.fn(),
  getPlayerCharacterError: jest.fn(),
  getPlayersCharacters: jest.fn(),
  getPlayersCharactersSuccess: jest.fn(),
  getPlayersCharactersError: jest.fn(),
}))
import {
  editPlayerCharacter,
  getPlayerCharacter,
} from 'actions/playersCharacters'

jest.mock('actions/archetypes', () => {
  const { GET_ARCHETYPES } = require('actions/archetypes/constants')
  return {
    getArchetypes: jest.fn(() => ({
      type: GET_ARCHETYPES,
      payload: {},
    })),
    getArchetypesSuccess: jest.fn(),
    getArchetypesError: jest.fn(),
  }
})
import { getArchetypes } from 'actions/archetypes'

jest.mock('actions/careers', () => {
  const { GET_CAREERS } = require('actions/careers/constants')
  return {
    getCareers: jest.fn(() => ({
      type: GET_CAREERS,
      payload: {},
    })),
    getCareersSuccess: jest.fn(),
    getCareersError: jest.fn(),
  }
})
import { getCareers } from 'actions/careers'

jest.mock('actions/skills', () => {
  const { GET_SKILLS } = require('actions/skills/constants')
  return {
    getSkills: jest.fn(() => ({
      type: GET_SKILLS,
      payload: {},
    })),
    getSkillsSuccess: jest.fn(),
    getSkillsError: jest.fn(),
  }
})
import { getSkills } from 'actions/skills'

const renderComponent = (props = {}, initialState) =>
  render(
    <Suspense fallback="loading...">
      <PlayerCharacter {...props} />
    </Suspense>,
    { initialState },
  )

describe('<PlayerCharacter />', () => {
  const id = `${playerCharacter1Id}`

  beforeEach(() => {
    // Do not dispatch correct action so loader is false
    getPlayerCharacter.mockImplementation(() => ({
      type: '',
      payload: {},
    }))
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render the page correctly', async () => {
    const { getByTestId, getByText, queryByTestId } = renderComponent()

    await wait(() => {
      const playersCharactersWrapper = getByTestId(/player-character/i)
      expect(playersCharactersWrapper).toBeInTheDocument()

      const header = getByText(playerCharacter1Augmented.get('name'))
      expect(header).toBeInTheDocument()

      const pcSheet = getByTestId(/pc-sheet/i)
      expect(pcSheet).toBeInTheDocument()

      const spinner = queryByTestId(/spinner/i)
      expect(spinner).not.toBeInTheDocument()
    })
  })

  it('should not render the header if character has not been fetched yet', async () => {
    const modifiedState = store.set('playersCharacters', new ReducerRecord())
    const { getByTestId, queryByTestId } = renderComponent({}, modifiedState)

    await wait(() => {
      const playersCharactersWrapper = getByTestId(/player-character/i)
      expect(playersCharactersWrapper).toBeInTheDocument()

      const header = queryByTestId(/header/i)
      expect(header).not.toBeInTheDocument()
    })
  })

  it('should render correctly if loading', async () => {
    getPlayerCharacter.mockImplementation(() => ({
      type: GET_PLAYER_CHARACTER,
      payload: {
        id,
      },
    }))

    const { getByTestId } = renderComponent()

    await wait(() => {
      const playersCharactersWrapper = getByTestId(/player-character/i)
      expect(playersCharactersWrapper).toBeInTheDocument()

      const pcSheet = getByTestId(/pc-sheet/i)
      expect(pcSheet).toBeInTheDocument()

      const spinner = getByTestId(/spinner/i)
      expect(spinner).toBeInTheDocument()
    })
  })

  it('should render correctly if finished loading', async () => {
    // Skip redux-saga and dispatch success action directly
    getPlayerCharacter.mockImplementation(() => ({
      type: GET_PLAYER_CHARACTER_SUCCESS,
      payload: {
        id,
        playerCharacter: playerCharacter1Response,
      },
    }))
    const { getByTestId, queryByTestId } = renderComponent()

    await wait(() => {
      const playersCharactersWrapper = getByTestId(/player-character/i)
      expect(playersCharactersWrapper).toBeInTheDocument()

      const pcSheet = getByTestId(/pc-sheet/i)
      expect(pcSheet).toBeInTheDocument()

      const spinner = queryByTestId(/spinner/i)
      expect(spinner).not.toBeInTheDocument()
    })
  })

  // TODO: implement once UI is in place
  xit('should display a loader if favor is loading', async () => {
    addFavor.mockImplementation(() => ({
      type: ADD_FAVOR,
      payload: {
        actions: formikActions,
        favor: newFavor,
        playerCharacterId: id,
      },
    }))

    const { getByTestId } = renderComponent()

    await wait(() => {
      const playersCharactersWrapper = getByTestId(/player-character/i)
      expect(playersCharactersWrapper).toBeInTheDocument()

      const pcSheet = getByTestId(/pc-sheet/i)
      expect(pcSheet).toBeInTheDocument()

      const spinner = getByTestId(/spinner/i)
      expect(spinner).toBeInTheDocument()
    })
  })

  it('should dispatch fetch actions on mount', () => {
    renderComponent()
    expect(getArchetypes).toHaveBeenCalledTimes(1)
    expect(getCareers).toHaveBeenCalledTimes(1)
    expect(getPlayerCharacter).toHaveBeenCalledTimes(1)
    expect(getPlayerCharacter).toHaveBeenCalledWith(id)
    expect(getSkills).toHaveBeenCalledTimes(1)
  })

  it('should call editPlayerCharacter on submit', async () => {
    editPlayerCharacter.mockImplementation(() => ({
      type: EDIT_PLAYER_CHARACTER,
      payload: {
        id,
        values: playerCharacter1Augmented.toJS(),
        actions: formikActions,
      },
    }))

    const { getByTestId } = renderComponent()

    const editButton = getByTestId(/edit/i)
    fireEvent.click(editButton)

    const submitButton = getByTestId(/submit/i)
    fireEvent.click(submitButton)

    await wait(() => {
      expect(editPlayerCharacter).toHaveBeenCalledTimes(1)
    })
  })
})
