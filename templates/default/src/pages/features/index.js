import React from 'react'
import { Link } from 'react-router-dom'

export default props => {
  const Page = require('../../components/page').default
  return (
    <Page {...props}>
      <h2>Featureses - Go to <Link to='/'>Home</Link></h2>
    </Page>
  )
}
