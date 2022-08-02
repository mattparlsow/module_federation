import React, { useMemo } from 'react'

export function lazyWithPreload(factory) {
  const component = React.lazy(factory)
  component.preload = factory
  return component
}
