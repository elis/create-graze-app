import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Routing from './routing'

export { SiteContext } from './routing'

const page = gql`
{
  site (where: {name: "root"}) {
    name
    description
    content
    pages {
      title
      description
      slug
    }
  }
}
`

export default graphql(page, {
  options: {errorPolicy: 'all'}
})(Routing)