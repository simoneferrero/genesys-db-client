import styled, { css } from 'styled-components/macro'

import rgbToRgba from 'utils/rgbToRgba'

import { baseSpacing, borderRadius, colours } from 'styles/constants'
import mq from 'styles/mediaQueries'

export const StyledPCSummary = styled.div`
  padding: ${baseSpacing / 2}px;
  border: 2px solid ${colours.lightOrange};
  border-radius: ${borderRadius}px;
  display: grid;
  grid-gap: ${baseSpacing / 3}px;
  background-color: ${rgbToRgba(colours.lightTeal, 0.1)};
  grid-template-columns: 1fr;
  position: relative;

  @media ${mq.laptop}, ${mq.desktop} {
    grid-template-columns: 1fr 2fr;
  }

  @media ${mq.bigDesktop} {
    grid-template-columns: repeat(3, 1fr);
  }

  h2,
  h4 {
    margin: 0;
  }
`

const sectionCommonStyles = css`
  display: grid;
  grid-gap: ${baseSpacing / 4}px;
`
export const StyledInfoSection = styled.section`
  ${sectionCommonStyles}
  grid-template-columns: 1fr;

  @media ${mq.tablet}, ${mq.bigDesktop} {
    grid-template-columns: repeat(2, 1fr);

    grid-auto-flow: column;
    grid-template-rows: repeat(2, 1fr);
  }

  @media ${mq.laptop}, ${mq.desktop} {
    grid-row: 1/3;
  }

  & > div {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: baseline;

    span {
      color: ${colours.lightOrange};
      text-shadow: 1px 1px ${colours.veryLightOrange};
    }

    h4 {
      text-shadow: 1px 1px ${colours.veryLightBlue};
    }
  }
`

const sharedBadgeWrapperStyles = css`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  left: 50%;
  transform: translateX(-50%);

  h2 {
    color: ${colours.lightOrange};
    position: absolute;
    margin-left: 1px;
  }

  & > div {
    width: 100%;
    display: inline-flex;
  }
`
export const StyledCharacteristicsSection = styled.section`
  ${sectionCommonStyles}
  grid-template-columns: repeat(3, 1fr);

  @media ${mq.tablet}, ${mq.laptop}, ${mq.desktop}, ${mq.bigDesktop} {
    grid-template-columns: repeat(6, 1fr);
  }

  & > div {
    ${sharedBadgeWrapperStyles}

    h2 {
      top: 5px;
    }

    img {
      height: 60px;
    }
  }
`

export const StyledAttributesSection = styled.section`
  ${sectionCommonStyles}
  grid-template-columns: repeat(2, 1fr);

  @media ${mq.tablet}, ${mq.laptop}, ${mq.desktop}, ${mq.bigDesktop} {
    grid-template-columns: repeat(4, 1fr);
  }

  & > div {
    ${sharedBadgeWrapperStyles}

    h2 {
      top: 19px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: ${(baseSpacing * 2) / 3}px;
      text-align: right;

      & span:nth-child(2) {
        text-align: left;
      }
    }

    img {
      height: 50px;
    }

    &:nth-child(1) > h2 {
      grid-template-columns: 1fr;
    }
  }
`

export const StyledLink = styled.a`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: ${baseSpacing / 3}px;
  margin-right: ${baseSpacing / 3}px;
  cursor: pointer;

  & > svg {
    color: ${colours.lightOrange};
    font-size: 20px;
  }
`
