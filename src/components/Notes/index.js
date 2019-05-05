import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components/macro'
import {
  baseSpacing,
  borderRadius,
  colours,
  fontFamilies,
} from 'styles/constants'
import mq from 'styles/mediaQueries'
import rgbToRgba from 'utils/rgbToRgba'

export const StyledNotes = styled.div`
  border: 2px solid ${colours.lightOrange};
  border-radius: ${borderRadius}px;
  background-color: ${rgbToRgba(colours.lightTeal, 0.1)};
  position: relative;
  padding: ${baseSpacing / 2}px;

  p, textarea {
    margin: 0;
    width: 100%;
    height: 100%;
    padding: ${baseSpacing / 4}px;
    font-family: "${fontFamilies.MinionPro}", Times New Roman, serif;
    color: ${colours.teal};
    text-align: justify;
    font-size: 16px;
  }

  textarea {
    border-radius: 5px;
    background-color: ${colours.veryLightBlue};
    border: 1px solid ${colours.teal};
    height: 20em;

    @media ${mq.tablet}, ${mq.laptop} {
      height: 15em;
    }

    @media ${mq.desktop}, ${mq.bigDesktop} {
      height: 10em;
    }
  }
`

const Notes = ({ className, editing, isSubmitting, notes, setFieldValue }) => (
  <StyledNotes className={className} data-testid="notes">
    {editing ? (
      <label htmlFor="notes">
        <textarea
          disabled={isSubmitting}
          id="notes"
          name="notes"
          value={notes}
          onChange={({ target: { value } }) => setFieldValue('notes', value)}
        />
      </label>
    ) : (
      <p data-testid="notes-paragraph">{notes}</p>
    )}
  </StyledNotes>
)

Notes.propTypes = {
  /** Custom styles */
  className: PropTypes.string,
  /** Whether motivations can be edited */
  editing: PropTypes.bool,
  /** Notes about the character */
  notes: PropTypes.string.isRequired,
  /** Whether the player character form is submitting */
  isSubmitting: PropTypes.bool,
  /** Function invoked to change existing favor data */
  setFieldValue: PropTypes.func.isRequired,
}

export default Notes
