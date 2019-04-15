import React, { useMemo } from 'react'
import { graphql, Query } from 'react-apollo'
import gql from 'graphql-tag'

export { SiteContext } from './routing'

const SiteBuild = props => {
  const { makeQS, parseTypes, schemaIssues } = require('./schema')
  const { types } = props.data['__schema'] || {}
  const { default: Routing } = require('./routing')

  const parsedTypes = parseTypes(types)
  const issues = schemaIssues(parsedTypes)
  if (issues && issues.length) {
    console.log('SCHEME ISSUES')
    console.log('issues:', issues)
  }

  if (issues && issues.length) {
    const { default: Tutorial } = require('../components/graze-tutorial')
    return <Tutorial types={types} issues={issues} {...props} />
  }

  const pageQuery = useMemo(() => {
    const parsedTypes = parseTypes(types)
    // console.log(`🍝`, 'parsedTypes:', parsedTypes)
    const QS = makeQS(parsedTypes, 'Site', '  ')
    const queryString = `{
      site (where: {name: "root"}) {
        ${QS}
      }
    }`
    return gql`${queryString}`
  }, [types])

  return (
    <Query query={pageQuery} errorPolicy={'all'}>
      {({loading, error, data}) => <Routing data={{site: data && data.site, error}} />}
    </Query>
  )
}

const typesSchema = gql`
{
  __schema {
    types {
      name
      kind
      fields {
        name
        type {
          name
          kind
          ofType {
            name
            kind
            ofType {
              name
            }
          }
        }
      }
    }
  }
}
`

export default graphql(typesSchema, {
  options: { errorPolicy: 'all' }
})(SiteBuild)
