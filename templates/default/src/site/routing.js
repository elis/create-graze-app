import React, { createContext, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import onDemand, { preload } from './on-demand'

export const SiteContext = createContext({})
const isSSR = typeof window === 'undefined'

export default props => {
  const { site, error } = props.data
  const { grazePages: pages } = site || {}

  // Preload pages
  useEffect(() => {
    const preloadTimeout = setTimeout(() => {
      if (!isSSR && pages && pages.length) {
        for (const page of pages) {
          preload(page.slug)
        }
      }
    }, 2500)
    return () => clearTimeout(preloadTimeout)
  }, [pages])

  if (error) {
    const ErrorMsg = require('../components/error').default
    console.error('Primary routing error:', error)

    return <ErrorMsg error={error} />
  }

  return (
    <SiteContext.Provider value={site}>
      <Switch>
        <Route path='/' exact component={onDemand('index', '/', false, {page: site && site.index, site, error})} />
        {pages && !!pages.length && pages.map((page, index) => (
          <Route
            key={`site page ${index}`}
            path={`/${page.slug}`}
            component={onDemand(page.slug, `/${page.slug}`, false, {page, site, error})} />
        ))}
        <Route path='/__tutorial' component={onDemand('tutorial', '/__tutorial', false, {pages, site, error})} />
        <Route path='/' component={onDemand('404')} />
      </Switch>
    </SiteContext.Provider>
  )
}