import React from 'react'
import { isImmutable } from 'immutable'

const ImmutableConverter = (WrappedComponent) => (wrappedComponentProps) => {
  const KEY = 0
  const VALUE = 1

  const propsJS = Object.entries(wrappedComponentProps).reduce(
    (newProps, wrappedComponentProp) => {
      newProps[wrappedComponentProp[KEY]] = isImmutable(
        wrappedComponentProp[VALUE],
      )
        ? wrappedComponentProp[VALUE].toJS()
        : wrappedComponentProp[VALUE]
      return newProps
    },
    {},
  )

  return <WrappedComponent {...propsJS} />
}

export default ImmutableConverter
