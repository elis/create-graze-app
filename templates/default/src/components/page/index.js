import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import tachyon from 'tachyons-components'
import 'tachyons/css/tachyons.css'

import { SiteContext } from '../../site'

export default props => (
  <PageEl className='main-view'>
    <Header>
      <BrandIcon />
    </Header>
    {props.children}
  </PageEl>
)

const getNavItems = pages => pages && pages.length && pages
  .filter(({slug}) => slug !== 'index')
  .map(({slug, title}) => ({slug, title}))

const Header = props => {
  const site = useContext(SiteContext)
  const [nav, setNav] = useState(getNavItems(site && site.pages))

  useEffect(() => {
    if (site && site.pages && site.pages.length) {
      setNav(getNavItems(site.pages))
    }
  }, [site && site.pages])

  return (
    <HeaderEl className='sans-serif bg-dark-gray'>
      <NavEl> 
        <BrandCell>
          <NavLink to='/' className='flex items-center'>
            <BrandIcon color='white' dark width={28} height={28} className='dib mr2' />
            <BrandWordmark height={16} color='white' className='dib' />
          </NavLink>
        </BrandCell>
        <NavCell>
          {nav && !!nav.length && nav.map((item, i) => (
            <NavHref key={`nav ${i}`} className='f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3' to={`/${item.slug}`}>{item.title}</NavHref> 
          ))}
          <a className='f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba' href='http://graze.site' >Graze HQ</a> 
        </NavCell>
      </NavEl>
    </HeaderEl>
  )
}
const BrandCell = tachyon('div')`dtc dt w2 v-mid pa3`
const NavCell = tachyon('div')`dtc v-mid tr pa3`

const NavEl = tachyon('nav')`
  dt w-100 mw8 center
`

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

const BrandWordmark = ({color, ...props}) => (
  <svg {...props} viewBox="0 0 796 209" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M74.1719 94.0781H147.016V135.844C146.641 156.375 139.609 173.578 125.922 187.453C112.141 201.234 94.7969 208.312 73.8906 208.688C57.7656 208.312 44.3125 204.375 33.5312 196.875C22.5625 189.656 14.5938 181.312 9.625 171.844C8.125 168.75 6.76562 165.797 5.54688 162.984C4.42188 160.078 3.48438 156.422 2.73438 152.016C1.32812 143.766 0.625 127.922 0.625 104.484C0.625 80.6719 1.32812 64.7344 2.73438 56.6719C4.23438 48.6094 6.53125 42.0938 9.625 37.125C14.5938 27.6562 22.5625 19.2188 33.5312 11.8125C44.3125 4.3125 57.7656 0.46875 73.8906 0.28125C93.6719 0.46875 109.797 6.32812 122.266 17.8594C134.734 29.4844 142.609 43.875 145.891 61.0312H112.984C110.453 52.7812 105.859 45.75 99.2031 39.9375C92.2656 34.4062 83.8281 31.5469 73.8906 31.3594C66.5781 31.5469 60.2969 33 55.0469 35.7188C49.7031 38.5312 45.3906 42.0469 42.1094 46.2656C38.0781 50.6719 35.4062 56.3438 34.0938 63.2812C32.5938 70.5938 31.8438 84.3281 31.8438 104.484C31.8438 124.641 32.5938 138.281 34.0938 145.406C35.4062 152.531 38.0781 158.297 42.1094 162.703C45.3906 166.922 49.7031 170.344 55.0469 172.969C60.2969 176.062 66.5781 177.609 73.8906 177.609C85.9844 177.609 95.9688 173.484 103.844 165.234C111.719 157.359 115.75 147 115.938 134.156V123.469H74.1719V94.0781Z" fill={color || 'black'} />
    <path d="M203.516 91.8281H250.484C262.109 91.6406 270.828 88.2656 276.641 81.7031C282.359 75.6094 285.219 68.1094 285.219 59.2031C285.031 48.5156 281.609 40.7812 274.953 36C269.703 31.7812 262.109 29.6719 252.172 29.6719H203.516V91.8281ZM172.438 1.96875H252.453C269.516 1.96875 283.438 6.46875 294.219 15.4688C307.25 25.6875 314.047 40.2656 314.609 59.2031C314.234 87.0469 301.016 105.984 274.953 116.016L322.484 207H285.5L243.172 119.391H203.516V207H172.438V1.96875Z" fill={color || 'black'}/>
    <path d="M441.406 133.594L411.734 44.0156H411.172L381.5 133.594H441.406ZM450.266 161.156H372.5L356.75 207H323.844L398.375 1.96875H424.391L498.922 207H466.156L450.266 161.156Z" fill={color || 'black'} />
    <path d="M505.625 181.125L598.578 29.6719H509.281V1.96875H636.547V25.3125L543.312 177.609H636.547V207H505.625V181.125Z" fill={color || 'black'} />
    <path d="M664.625 1.96875H795.547V31.3594H695.703V89.8594H780.922V117.422H695.703V177.609H795.547V207H664.625V1.96875Z" fill={color || 'black'} />
  </svg>

)

const NL = props => <NavLink {...props} />
const NavHref = styled(NL)`
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 4px solid;
    border-top-color: inherit;
    opacity: 0;
  }
  &.active {
    &::after {
      opacity: 1;
    }
  }
`

const HeaderEl = styled.header`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background-color: #333;
  min-height: 66px;
  color: #FFF;
`
const PageEl = styled.div`
  ${HeaderEl} + * {
    &::before {
      content: "";
      height: 66px;
      display: block;
    }
  }
`