import React from 'react'
import { Link } from 'react-router-dom'

export default props => {
  const Page = require('../../components/page').default
  return (
    <Page {...props}>
      <h2>Index - Go to <Link to='/features'>Features</Link></h2>
    </Page>
  )
}