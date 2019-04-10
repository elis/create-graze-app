import React from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import './Home.css';

const Home = ({data: { site, loading, error }, ...props}) => {
  return (
    <div className="Home">
      <div className="Home-header">
        <BrandIcon dark className="Home-logo" alt="logo" width={256} height={256} />
        <h2>Welcome to Graze</h2>
      </div>
      <p className="Home-intro">
        To get started, edit <code>src/App.js</code> or{' '}
        <code>src/Home.js</code> and save to reload.
      </p>
      {site && (<h1>{site.name}</h1>)}
      {site && (<p>{site.description}</p>)}
      <ul className="Home-resources">
        <li>
          <a href="https://github.com/elis/graze">Docs</a>
        </li>
        <li>
          <a href="https://github.com/elis/graze/issues">Issues</a>
        </li>
      </ul>
    </div>
  );
}

const page = gql`
  query {
    site (where: {
      name: "root"
    }) {
      updatedAt
      createdAt
      id
      name
      description
    }
  }


`

export default graphql(page)(Home)

const BrandIcon = ({dark, ...props}) => typeof dark !== 'undefined'
  ? <svg {...props} viewBox="0 0 599 599" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M549.663 394.093L549.631 203.911L549.627 176.964C549.623 163.027 542.188 150.151 530.116 143.184L318.792 21.2234C306.723 14.2567 291.852 14.2589 279.783 21.23L68.4995 143.26C56.431 150.23 48.9989 163.109 49 177.046L49.0044 203.91L49.0365 394.092L49.0409 421.039C49.0431 434.975 56.4796 447.852 68.5503 454.818L279.874 576.78C291.946 583.747 306.814 583.742 318.883 576.773L530.167 454.741C542.235 447.771 549.668 434.892 549.666 420.954L549.663 394.093Z" fill="#F5F5F5"/>
    <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="49" y="16" width="501" height="567">
    <path d="M549.663 394.093L549.631 203.911L549.627 176.964C549.623 163.027 542.188 150.151 530.116 143.184L318.792 21.2234C306.723 14.2567 291.852 14.2589 279.783 21.23L68.4995 143.26C56.431 150.23 48.9989 163.109 49 177.046L49.0044 203.91L49.0365 394.092L49.0409 421.039C49.0431 434.975 56.4796 447.852 68.5503 454.818L279.874 576.78C291.946 583.747 306.814 583.742 318.883 576.773L530.167 454.741C542.235 447.771 549.668 434.892 549.666 420.954L549.663 394.093Z" fill="#324A5E"/>
    </mask>
    <g mask="url(#mask0)">
    <path d="M461.5 15.9995L352.19 15.9995L181.5 299.574L352.534 582L460.81 582L290.81 299.574L461.5 15.9995Z" fill="#324A5E"/>
    </g>
  </svg>
  : <svg {...props} viewBox="0 0 599 599" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M549.663 394.093L549.631 203.911L549.627 176.964C549.623 163.027 542.188 150.151 530.116 143.184L318.792 21.2234C306.723 14.2567 291.852 14.2589 279.783 21.23L68.4995 143.26C56.431 150.23 48.9989 163.109 49 177.046L49.0044 203.91L49.0365 394.092L49.0409 421.039C49.0431 434.975 56.4796 447.852 68.5503 454.818L279.874 576.78C291.946 583.747 306.814 583.742 318.883 576.773L530.167 454.741C542.235 447.771 549.668 434.892 549.666 420.954L549.663 394.093Z" fill="#324A5E"/>
  <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="49" y="16" width="501" height="567">
  <path d="M549.663 394.093L549.631 203.911L549.627 176.964C549.623 163.027 542.188 150.151 530.116 143.184L318.792 21.2234C306.723 14.2567 291.852 14.2589 279.783 21.23L68.4995 143.26C56.431 150.23 48.9989 163.109 49 177.046L49.0044 203.91L49.0365 394.092L49.0409 421.039C49.0431 434.975 56.4796 447.852 68.5503 454.818L279.874 576.78C291.946 583.747 306.814 583.742 318.883 576.773L530.167 454.741C542.235 447.771 549.668 434.892 549.666 420.954L549.663 394.093Z" fill="#324A5E"/>
  </mask>
  <g mask="url(#mask0)">
  <path d="M461.5 15.9997L352.19 15.9996L181.5 299.574L352.534 582L460.81 582L290.81 299.574L461.5 15.9997Z" fill="#F5F5F5"/>
  </g>
  </svg>