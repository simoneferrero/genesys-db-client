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

import { GET_FACTIONS } from 'actions/factions/constants'
import { ADD_FAVOR } from 'actions/favors/constants'
import {
  EDIT_PLAYER_CHARACTER,
  GET_PLAYER_CHARACTER,
  GET_PLAYER_CHARACTER_SUCCESS,
} from 'actions/playersCharacters/constants'

jest.mock('actions/favors', () => ({
  addFavor: jest.fn(() => ({ type: '' })),
  addFavorSuccess: jest.fn(() => ({ type: '' })),
  addFavorError: jest.fn(() => ({ type: '' })),
}))
import { addFavor } from 'actions/favors'

jest.mock('actions/playersCharacters', () => ({
  editPlayerCharacter: jest.fn(() => ({ type: '' })),
  editPlayerCharacterSuccess: jest.fn(() => ({ type: '' })),
  editPlayerCharacterError: jest.fn(() => ({ type: '' })),
  getPlayerCharacter: jest.fn(() => ({ type: '' })),
  getPlayerCharacterSuccess: jest.fn(() => ({ type: '' })),
  getPlayerCharacterError: jest.fn(() => ({ type: '' })),
  getPlayersCharacters: jest.fn(() => ({ type: '' })),
  getPlayersCharactersSuccess: jest.fn(() => ({ type: '' })),
  getPlayersCharactersError: jest.fn(() => ({ type: '' })),
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
    getArchetypesSuccess: jest.fn(() => ({ type: '' })),
    getArchetypesError: jest.fn(() => ({ type: '' })),
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
    getCareersSuccess: jest.fn(() => ({ type: '' })),
    getCareersError: jest.fn(() => ({ type: '' })),
  }
})
import { getCareers } from 'actions/careers'

jest.mock('actions/factions', () => ({
  getFactions: jest.fn(() => ({ type: '' })),
  getFactionsSuccess: jest.fn(() => ({ type: '' })),
  getFactionsError: jest.fn(() => ({ type: '' })),
}))
import { getFactions } from 'actions/factions'

jest.mock('actions/skills', () => {
  const { GET_SKILLS } = require('actions/skills/constants')
  return {
    getSkills: jest.fn(() => ({
      type: GET_SKILLS,
      payload: {},
    })),
    getSkillsSuccess: jest.fn(() => ({ type: '' })),
    getSkillsError: jest.fn(() => ({ type: '' })),
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

  it('should display a loader if factions are loading', async () => {
    getFactions.mockImplementation(() => ({
      type: GET_FACTIONS,
      payload: {},
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
    expect(getPlayerCharacter).toHaveBeenCalledTimes(1)
    expect(getPlayerCharacter).toHaveBeenCalledWith(id)
    expect(getArchetypes).toHaveBeenCalledTimes(1)
    expect(getCareers).toHaveBeenCalledTimes(1)
    expect(getSkills).toHaveBeenCalledTimes(1)
    expect(getFactions).toHaveBeenCalledTimes(1)
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

    const editButton = getByTestId(/edit-pc-sheet/i)
    fireEvent.click(editButton)

    const submitButton = getByTestId(/submit-pc-sheet/i)
    fireEvent.click(submitButton)

    await wait(() => {
      expect(editPlayerCharacter).toHaveBeenCalledTimes(1)
    })
  })

  it('should call addFavor on new favor submit', async () => {
    addFavor.mockImplementation(() => ({
      type: ADD_FAVOR,
      payload: {
        actions: formikActions,
        favor: newFavor,
        playerCharacterId: id,
      },
    }))

    const { getByPlaceholderText, getByTestId } = renderComponent()

    const editButton = getByTestId(/edit-favor-owed/i)
    fireEvent.click(editButton)

    const description = getByPlaceholderText(/add description.../i)
    fireEvent.change(description, {
      target: { value: 'This is a new description' },
    })

    const submitButton = getByTestId(/submit-favor-owed/i)
    fireEvent.click(submitButton)

    await wait(() => {
      expect(addFavor).toHaveBeenCalledTimes(1)

      const spinner = getByTestId(/spinner/i)
      expect(spinner).toBeInTheDocument()
    })
  })
})
