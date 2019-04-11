import React from 'react'
import { Link } from 'react-router-dom'
import Page from '../../components/page'

export default props => {
  return (
    <Page>
      <h2>Index - Go to <Link to='/features'>Features</Link></h2>
    </Page>
  )
}