import styled, { css } from 'styled-components/macro'

import { baseSpacing, colours } from 'styles/constants'
import mq from 'styles/mediaQueries'

import rgbToRgba from 'utils/rgbToRgba'
import rep from 'utils/stringRepeat'

import { ATTRIBUTES, CHARACTERISTICS, INFO } from 'utils/definitions'

const { ARCHETYPE, CAREER, PC_NAME, PLAYER_NAME } = INFO
const { DEFENSE, SOAK, STRAIN, WOUNDS } = ATTRIBUTES
const {
  AGILITY,
  BRAWN,
  CUNNING,
  INTELLECT,
  PRESENCE,
  WILLPOWER,
} = CHARACTERISTICS

const portableGridStyles = css`
  grid-template-columns: repeat(6, 1fr);
  grid-template-areas:
    '${rep(PLAYER_NAME, 6)}'
    '${rep(PC_NAME, 6)}'
    '${rep(ARCHETYPE, 6)}'
    '${rep(CAREER, 6)}'
    '${rep(BRAWN, 2)} ${rep(AGILITY, 2)} ${rep(INTELLECT, 2)}'
    '${rep(CUNNING, 2)} ${rep(WILLPOWER, 2)} ${rep(PRESENCE, 2)}'
    '${rep(WOUNDS, 3)} ${rep(STRAIN, 3)}'
    '${rep(SOAK, 3)} ${rep(DEFENSE, 3)}';
`
const laptopGridStyles = css`
  grid-template-columns: repeat(12, 1fr);
  grid-template-areas:
    '${rep(PLAYER_NAME, 6)} ${rep(ARCHETYPE, 6)}'
    '${rep(PC_NAME, 6)} ${rep(CAREER, 6)}'
    '${rep(BRAWN, 2)} ${rep(AGILITY, 2)} ${rep(INTELLECT, 2)} ${rep(
  CUNNING,
  2,
)} ${rep(WILLPOWER, 2)} ${rep(PRESENCE, 2)}'
    '${rep(WOUNDS, 3)} ${rep(STRAIN, 3)} ${rep(SOAK, 3)} ${rep(DEFENSE, 3)}';
`

export const StyledPCSummary = styled.div`
  padding: ${baseSpacing / 2}px;
  border: 2px solid ${colours.lightOrange};
  background-color: ${rgbToRgba(colours.veryDarkGreen, 0.1)};
  display: grid;
  grid-column-gap: ${baseSpacing / 4}px;
  grid-row-gap: ${baseSpacing / 4}px;
  grid-template-rows: auto;
  ${portableGridStyles}

  @media ${mq.tablet},
  ${mq.desktop},
  ${mq.bigDesktop} {
    ${laptopGridStyles}
  }
`

const cellStyles = css`
  grid-area: ${({ type }) => type};

  h2,
  h4 {
    margin: 0;
  }
`
const characteristicsStyles = css`
  top: 5px;
  margin-left: 1px;
`
const attributesStyles = css`
  top: 25px;
  display: grid;
  grid-template-columns: repeat(
    ${({ type }) => (type === ATTRIBUTES.SOAK ? 1 : 2)},
    1fr
  );
  grid-column-gap: ${baseSpacing / 2}px;
  text-align: right;

  & span:nth-child(2) {
    text-align: left;
  }
`
export const StyledTextCell = styled.div`
  ${cellStyles}
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`
export const StyledCell = styled.div`
  ${cellStyles}
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  h2 {
    color: ${colours.black};
    position: absolute;

    ${({ type }) =>
      Object.values(CHARACTERISTICS).some(
        (characteristic) => characteristic === type,
      )
        ? characteristicsStyles
        : attributesStyles}
  }
`
