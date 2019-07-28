import PropTypes from 'prop-types'

const basicEquipmentType = {
  /** Character's armor */
  armor: PropTypes.string.isRequired,
  /** Character's gear */
  gear: PropTypes.string.isRequired,
}

export const equipmentType = PropTypes.shape({
  ...basicEquipmentType,
  /** Character's money */
  money: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
})

export const adversaryEquipmentType = PropTypes.shape(basicEquipmentType)
