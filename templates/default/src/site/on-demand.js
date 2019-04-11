import React, { useState, useEffect } from 'react'
import Loading from '../components/loading'
import Error from '../components/error'

const isSSR = typeof window === 'undefined'

export const onDemand = (page, path) => {
  const cache = {}

  if (isSSR || path === window.location.pathname) {
    try {
      if (!cache[page]) {
        const module = require('../pages/' + page)
        const Comp = module.default || module
        cache[page] = {Loaded: module.default || module}
    
        return Comp
      } else {
        return cache[page].Loaded
      }
    } catch (error) {
      console.error('Error SERVER in onDemand', error)
      return props => <Error error={error} details={{page, path, isSSR}} />
    }
  }
  
  return props => {
    const [Comp, setComp] = useState(cache[page])

    useEffect(() => {
      if (!cache[page]) {
        try {
          const module = require('../pages/' + page)
          setComp({Loaded: module.default || module})
          cache[page] = {Loaded: module.default || module}
        } catch (error) {
          console.log('Error CLIENT in onDemand', error)
          setComp({Loaded: props => <Error error={error} details={{page, path, isSSR}} />
          })
        }
      }
    }, [page])
    return (Comp && Comp.Loaded)
      ? <Comp.Loaded {...props} />
      : <Loading />
  }
}

export default onDemand