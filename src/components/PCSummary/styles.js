import styled, { css } from 'styled-components/macro'

import { baseSpacing, colours } from 'styles/constants'
import mq from 'styles/mediaQueries'

import { ATTRIBUTES, CHARACTERISTICS, INFO } from 'utils/definitions'

const { ARCHETYPE: arc, CAREER: car, PC_NAME: pcn, PLAYER_NAME: pln } = INFO
const { DEFENSE: def, SOAK: soa, STRAIN: str, WOUNDS: wou } = ATTRIBUTES
const {
  AGILITY: agi,
  BRAWN: bra,
  CUNNING: cun,
  INTELLECT: int,
  PRESENCE: pre,
  WILLPOWER: wil,
} = CHARACTERISTICS

// Shows column style for mobile and laptop (2 columns)
const portableGridStyles = css`
  grid-template-columns: repeat(6, 1fr);
  grid-template-areas:
    '${pln} ${pln} ${pln} ${pln} ${pln} ${pln}'
    '${pcn} ${pcn} ${pcn} ${pcn} ${pcn} ${pcn}'
    '${arc} ${arc} ${arc} ${arc} ${arc} ${arc}'
    '${car} ${car} ${car} ${car} ${car} ${car}'
    '${bra} ${bra} ${agi} ${agi} ${int} ${int}'
    '${cun} ${cun} ${wil} ${wil} ${pre} ${pre}'
    '${soa} ${soa} ${soa} ${wou} ${wou} ${wou}'
    '${str} ${str} ${str} ${def} ${def} ${def}';
`
// Shows row style for tablet, desktop (2 columns) and desktopBig (3 columns)
const laptopGridStyles = css`
  grid-template-columns: repeat(12, 1fr);
  grid-template-areas:
    '${pln} ${pln} ${pln} ${pln} ${pln} ${pln} ${arc} ${arc} ${arc} ${arc} ${arc} ${arc}'
    '${pcn} ${pcn} ${pcn} ${pcn} ${pcn} ${pcn} ${car} ${car} ${car} ${car} ${car} ${car}'
    '${bra} ${bra} ${agi} ${agi} ${int} ${int} ${cun} ${cun} ${wil} ${wil} ${pre} ${pre}'
    '${soa} ${soa} ${soa} ${wou} ${wou} ${wou} ${str} ${str} ${str} ${def} ${def} ${def}';
`

export const StyledPCSummary = styled.div`
  padding: ${baseSpacing / 2}px;
  border: 2px solid ${colours.lightOrange};
  display: grid;
  grid-column-gap: ${baseSpacing / 3}px;
  grid-row-gap: ${baseSpacing / 3}px;
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
  top: 19px;
  display: grid;
  grid-template-columns: repeat(${({ type }) => (type === soa ? 1 : 2)}, 1fr);
  grid-column-gap: ${(baseSpacing * 2) / 3}px;
  text-align: right;

  & span:nth-child(2) {
    text-align: left;
  }
`
export const StyledTextCell = styled.div`
  ${cellStyles}
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: baseline;
`
export const StyledCell = styled.div`
  ${cellStyles}
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  h2 {
    color: ${colours.lightOrange};
    position: absolute;

    ${({ type }) =>
      Object.values(CHARACTERISTICS).some(
        (characteristic) => characteristic === type,
      )
        ? characteristicsStyles
        : attributesStyles}
  }
`
