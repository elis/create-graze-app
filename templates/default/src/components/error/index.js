import React from 'react'
import styled from 'styled-components'

export default ({error, details, ...props}) => <ErrorEl>
  <h1>Error</h1>
  {error && error.code && (
    <h4>Code: {error.code}</h4>
  )}
  {error && error.message && (
    <p>{error.message}</p>
  )}
  {details && (
    <React.Fragment>
      <h4>Details</h4>
      <pre>{JSON.stringify(details, 1, 1)}</pre>
    </React.Fragment>
  )}
  {error.stack && (
    <React.Fragment>
      <h4>Stack Trace</h4>
      <pre>{error.stack}</pre>
    </React.Fragment>
  )}
</ErrorEl>

const ErrorEl = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  background: rgba(255,255,255, 0.6);

  padding: 24px;
`