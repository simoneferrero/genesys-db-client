import styled from 'styled-components/macro'
import { colours, fontFamilies } from 'styles/constants'

export const StyledSelect = styled.div`
  font-family: "${fontFamilies.Monkirta}", Helvetica, sans-serif;
  text-transform: uppercase;
  width: 100%;

  & .${({ classNamePrefix }) => classNamePrefix}__value-container,
  .${({ classNamePrefix }) => classNamePrefix}__indicators {
    background-color: transparent;
    color: ${colours.teal};
    cursor: pointer;
  }

  & .${({ classNamePrefix }) => classNamePrefix}__single-value {
    color: ${colours.teal};
  }

  & .${({ classNamePrefix }) => classNamePrefix}__indicator-separator {
    background-color: ${colours.teal};
  }

  & .${({ classNamePrefix }) => classNamePrefix}__dropdown-indicator > svg {
    fill: ${colours.teal};
  }

  & .${({ classNamePrefix }) => classNamePrefix}__control, .${({
  classNamePrefix,
}) => classNamePrefix}__menu {
    background-color: ${colours.veryLightBlue};
    border: 1px solid ${colours.teal};
    padding: 0;
    color: ${colours.teal};

    &:hover {
      border-color: ${colours.lightTeal};
    }
  }

  & .${({ classNamePrefix }) => classNamePrefix}__option {
    background-color: transparent;
    cursor: pointer;

    &:hover {
      background-color: ${colours.teal};
      color: ${colours.veryLightBlue};
    }
  }

  & .${({ classNamePrefix }) => classNamePrefix}__option--is-selected {
    background-color: ${colours.teal};
    color: ${colours.veryLightBlue};

    &:hover {
      background-color: ${colours.teal};
    }
  }

  & .${({ classNamePrefix }) => classNamePrefix}__control--is-disabled {
    opacity: 0.7;
  }
`
