import React from 'react'
import styled from 'styled-components'
import * as typo from '../../typography'
import { Button } from 'react-md'

export default ({ className, ...props }) => {
  let classes = `fp-button ${className || ''}`

  return <ButtonEl className={classes} {...props} />
}

const ButtonEl = styled(Button)`
  &.md-btn {
    border-radius: 10px;
    box-shadow: none;
    text-transform: none;

    font-weight: 600;
    height: 39px;
    text-align: center;
    line-height: 22px;
    padding-left: 2rem;
    padding-right: 2rem;
    width: auto;
    flex: 0 0 auto;

    font-family: ${typo.fontFamily};
    font-size: 15px;
    &--raised {
      background: #FFF;
      color: ${typo.colors.primcol};
      border-radius: 10px;
      box-shadow: none;
      &:hover {
        background: darken(#FFF, 7.5%);
      }
    }
  }
  &.md-background {
    &--primary {
      background: ${typo.colors.primcol};
      color: #FFF;
      &:hover {
        background: lighten(${typo.colors.primcol}, 7.5%);
      }
    }
  }
`
