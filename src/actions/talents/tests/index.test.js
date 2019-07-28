import {
  GET_TALENTS,
  GET_TALENTS_ERROR,
  GET_TALENTS_SUCCESS,
  ADD_TALENT,
  ADD_TALENT_ERROR,
  ADD_TALENT_SUCCESS,
  ADD_PLAYER_CHARACTER_TALENT,
  ADD_PLAYER_CHARACTER_TALENT_ERROR,
  ADD_PLAYER_CHARACTER_TALENT_SUCCESS,
} from '../constants'
import {
  getTalents,
  getTalentsError,
  getTalentsSuccess,
  addTalent,
  addTalentError,
  addTalentSuccess,
  addPlayerCharacterTalent,
  addPlayerCharacterTalentError,
  addPlayerCharacterTalentSuccess,
} from '../index'

import { formikActions, genericError } from 'mocks/errors'
import { playerCharacter1Id } from 'mocks/playersCharacters'
import { talents, newCharacterTalentResponse, talent3 } from 'mocks/talents'

describe('talents actions', () => {
  describe('getTalents', () => {
    describe('getTalents', () => {
      it('should dispatch the correct action', () => {
        const result = getTalents()
        const expectedResult = {
          type: GET_TALENTS,
          payload: {},
        }
        expect(result).toEqual(expectedResult)
      })
    })

    describe('getTalentsSuccess', () => {
      it('should dispatch the correct action', () => {
        const result = getTalentsSuccess(talents)
        const expectedResult = {
          type: GET_TALENTS_SUCCESS,
          payload: {
            talents,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })

    describe('getTalentsError', () => {
      it('should dispatch the correct action', () => {
        const result = getTalentsError(genericError)
        const expectedResult = {
          type: GET_TALENTS_ERROR,
          payload: {
            error: genericError,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })
  })

  describe('addTalent', () => {
    describe('addTalent', () => {
      it('should dispatch the correct action', () => {
        const result = addTalent(talent3, formikActions)
        const expectedResult = {
          type: ADD_TALENT,
          payload: {
            actions: formikActions,
            talent: talent3,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })

    describe('addTalentSuccess', () => {
      it('should dispatch the correct action', () => {
        const result = addTalentSuccess(talent3)
        const expectedResult = {
          type: ADD_TALENT_SUCCESS,
          payload: {
            talent: talent3,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })

    describe('addTalentError', () => {
      it('should dispatch the correct action', () => {
        const result = addTalentError(genericError)
        const expectedResult = {
          type: ADD_TALENT_ERROR,
          payload: {
            error: genericError,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })
  })

  describe('addPlayerCharacterTalent', () => {
    describe('addPlayerCharacterTalent', () => {
      it('should dispatch the correct action', () => {
        const result = addPlayerCharacterTalent(
          playerCharacter1Id,
          talent3.id,
          formikActions,
        )
        const expectedResult = {
          type: ADD_PLAYER_CHARACTER_TALENT,
          payload: {
            actions: formikActions,
            playerCharacterId: playerCharacter1Id,
            talentId: talent3.id,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })

    describe('addPlayerCharacterTalentSuccess', () => {
      it('should dispatch the correct action', () => {
        const result = addPlayerCharacterTalentSuccess(
          playerCharacter1Id,
          newCharacterTalentResponse,
        )
        const expectedResult = {
          type: ADD_PLAYER_CHARACTER_TALENT_SUCCESS,
          payload: {
            playerCharacterId: playerCharacter1Id,
            talent: newCharacterTalentResponse,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })

    describe('addPlayerCharacterTalentError', () => {
      it('should dispatch the correct action', () => {
        const result = addPlayerCharacterTalentError(
          playerCharacter1Id,
          genericError,
        )
        const expectedResult = {
          type: ADD_PLAYER_CHARACTER_TALENT_ERROR,
          payload: {
            playerCharacterId: playerCharacter1Id,
            error: genericError,
          },
        }
        expect(result).toEqual(expectedResult)
      })
    })
  })
})
