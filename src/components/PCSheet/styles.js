import styled from 'styled-components/macro'

import {
  baseSpacing,
  colours,
  fontFamilies,
  headerHeight,
} from 'styles/constants'

const sectionTitleHeight = 20

export const StyledForm = styled.form`
  display: grid;
  grid-column: 1fr;
  grid-gap: ${(baseSpacing * 3) / 2}px;
  padding: ${baseSpacing}px ${baseSpacing * 2}px;
  padding-top: ${baseSpacing + headerHeight}px;
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
