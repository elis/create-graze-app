import React, { useContext, createContext, useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
// import Loading from './components/loading'
import onDemand from './on-demand'

const SiteContext = createContext({})


export default props => {
  const { site } = props.data
  return (
    <SiteContext.Provider value={site}>
      <Switch>
        {site && site.pages && site.pages.length && site.pages.map((page, index) => console.log('rendering path:', {
          path: `/${page.slug !== 'index' ? page.slug : ''}`,
          slug: page.slug
        }) || (
          <Route key={`site page ${index}`} path={`/${page.slug !== 'index' ? page.slug : ''}`} exact={page.slug === 'index'} component={onDemand(page.slug, `/${page.slug !== 'index' ? page.slug : ''}`)} />
        ))}
      </Switch>
    </SiteContext.Provider>
  )
}