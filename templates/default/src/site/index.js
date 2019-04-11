import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Routing from './routing'

const page = gql`
{
  site (where: {name: "root"}) {
    name
    description
    content
    pages {
      title
      description
      content
      slug
    }
  }
}
`

export default graphql(page)(Routing)