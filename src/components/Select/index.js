import React from 'react'
import PropTypes from 'prop-types'

import ReactSelect from 'react-select'

import { StyledSelect } from './styles'

const Select = ({
  className,
  config,
  disabled,
  name,
  onChange,
  options,
  placeholder,
  value,
}) => {
  // When <Select /> changes, let formik know which field to update
  const handleChange = ({ value }) => {
    onChange(name, value)
  }

  return (
    <StyledSelect
      as={ReactSelect}
      className={className}
      classNamePrefix={name}
      data-testid={`select-${name}`}
      id={name}
      isDisabled={disabled}
      name={name}
      onBlur={config.handleBlur}
      onChange={handleChange}
      options={options}
      placeholder={placeholder}
      value={value}
      {...config}
    />
  )
}

Select.propTypes = {
  /** Custom styles */
  className: PropTypes.string,
  /** A configuration object to pass direct props to ReactSelect */
  config: PropTypes.object,
  /** Whether the input should be disabled */
  disabled: PropTypes.bool,
  /** The input's name and className prefix */
  name: PropTypes.string.isRequired,
  /** Invoked on element change */
  onChange: PropTypes.func.isRequired,
  /** An array of values to display as options */
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Text to display as a placeholder */
  placeholder: PropTypes.string,
  /** Current element's value */
  value: PropTypes.object.isRequired,
}

Select.defaultProps = {
  config: {},
}

export default Select
