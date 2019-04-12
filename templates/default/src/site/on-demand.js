import React, { useState, useEffect } from 'react'
import Loading from '../components/loading'
import ErrorMsg from '../components/error'

const isSSR = typeof window === 'undefined'

const cache = {}
export const onDemand = (page, path, preload) => {
  const getComp = () => {
    try {
      const module = require('../pages/' + page)

      // Helps debugging
      if (!module.default) {
        throw new Error('Module was empty - Module build failed?')
      }

      return {Loaded: module.default}
    } catch (error) {
      if (error && error.code === 'MODULE_NOT_FOUND') {
        return {Error: props => <ErrorMsg error={{
          ...error,
          message: `Module "src/pages/${page}" not found`
        }} details={{page, path, isSSR}} />}
      }
      return {Error: props => <ErrorMsg error={error} details={{page, path, isSSR}} />}
    }
  }

  if (isSSR || path === window.location.pathname || preload || (cache[page] && cache[page].Error)) {
    cache[page] = getComp()
  }
  
  return props => {
    const [Comp, setComp] = useState(cache[page])
    useEffect(() => {
      if ((!cache[page] && !Comp) || (Comp && Comp.Error)) {
        cache[page] = getComp()
        setComp(cache[page])
      }
    }, [page])

    return (Comp && (Comp.Error || Comp.Loaded))
      ? (Comp.Error ? <Comp.Error {...props} /> : <Comp.Loaded {...props} />)
      : <Loading />
  }
}

export default onDemand

export const preload = page => onDemand(page, '', true)