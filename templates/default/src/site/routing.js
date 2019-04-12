import React, { createContext, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import onDemand, { preload } from './on-demand'

export const SiteContext = createContext({})
const isSSR = typeof window === 'undefined'

export default props => {
  const { site, error } = props.data
  const { pages } = site || {}

  // Preload pages
  useEffect(() => {
    const preloadTimeout = setTimeout(() => {
      if (!isSSR && pages && pages.length) {
        for (const page of pages) {
          preload(page.slug)
        }
      }
    }, 1500)
    return () => clearTimeout(preloadTimeout)
  }, [pages])

  if (error) {
    const ErrorMsg = require('../components/error').default
    console.error(error)
    return <ErrorMsg error={error} />
  }

  return (
    <SiteContext.Provider value={site}>
      <Switch>
        {pages && !!pages.length && pages.map((page, index) => (
          <Route key={`site page ${index}`} path={`/${page.slug !== 'index' ? page.slug : ''}`} exact={page.slug === 'index'} component={onDemand(page.slug, `/${page.slug !== 'index' ? page.slug : ''}`)} />
        ))}
      </Switch>
    </SiteContext.Provider>
  )
}