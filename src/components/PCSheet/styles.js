import styled from 'styled-components/macro'

import {
  baseSpacing,
  colours,
  fontFamilies,
  headerHeight,
} from 'styles/constants'

const sectionTitleHeight = 20

export const StyledForm = styled.form`
  width: 100vw;
  padding: ${baseSpacing}px ${baseSpacing * 2}px;
  padding-top: ${baseSpacing + headerHeight}px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-column-gap: ${baseSpacing}px;
  grid-row-gap: ${baseSpacing}px;
  box-sizing: border-box;
`

export const StyledFormButtons = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
`

export const StyledSectionWrapper = styled.div`
  position: relative;
  overflow: visible;

  &::before {
    content: '${({ sectionTitle }) => sectionTitle}';
    position: absolute;
    top: -${sectionTitleHeight}px;
    left: ${sectionTitleHeight}px;
    border-bottom: ${sectionTitleHeight}px solid ${colours.lightOrange};
    border-left: ${sectionTitleHeight / 2}px solid transparent;
    border-right: ${sectionTitleHeight / 2}px solid transparent;
    height: 0;
    width: fit-content;
    z-index: 800;
    color: ${colours.veryLightOrange};
    padding: 0 ${baseSpacing / 6}px;
    font-size: 14px;
    line-height: 18px;
    font-family: '${fontFamilies.Monkirta}', Helvetica, sans-serif;;
    text-transform: uppercase;
  }
`
