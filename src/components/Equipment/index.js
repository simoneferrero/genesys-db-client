import React from 'react'
import PropTypes from 'prop-types'
import { equipmentType } from 'types/equipment'

import { StyledEquipment } from './styles'

const Equipment = ({
  className,
  editing,
  isSubmitting,
  equipment: { armor, gear, money },
  setFieldValue,
}) => (
  <StyledEquipment className={className} data-testid="equipment">
    {editing ? (
      <>
        <label htmlFor="money">
          <h3>Money:</h3>
          <input
            disabled={isSubmitting}
            id="money"
            name="money"
            value={money}
            onChange={({ target: { value } }) =>
              setFieldValue('equipment.money', value)
            }
          />
          <p>credits</p>
        </label>
        <label htmlFor="armor">
          <h3>Armor:</h3>
          <textarea
            disabled={isSubmitting}
            id="armor"
            name="armor"
            value={armor}
            onChange={({ target: { value } }) =>
              setFieldValue('equipment.armor', value)
            }
          />
        </label>
        <label htmlFor="gear">
          <h3>Gear:</h3>
          <textarea
            disabled={isSubmitting}
            id="gear"
            name="gear"
            value={gear}
            onChange={({ target: { value } }) =>
              setFieldValue('equipment.gear', value)
            }
          />
        </label>
      </>
    ) : (
      <>
        <div data-testid="money">
          <h3>Money:</h3>
          <p>{money} credits</p>
        </div>
        <div data-testid="armor">
          <h3>Armor:</h3>
          <p>{armor}</p>
        </div>
        <div data-testid="gear">
          <h3>Gear:</h3>
          <p>{gear}</p>
        </div>
      </>
    )}
  </StyledEquipment>
)

Equipment.propTypes = {
  /** Custom styles */
  className: PropTypes.string,
  /** Whether motivations can be edited */
  editing: PropTypes.bool,
  /** Character's money, armor and gear */
  equipment: equipmentType.isRequired,
  /** Whether the player character form is submitting */
  isSubmitting: PropTypes.bool,
  /** Function invoked to change existing favor data */
  setFieldValue: PropTypes.func.isRequired,
}

export default Equipment
