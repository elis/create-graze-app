import App from './App'
import React from 'react'
import { StaticRouter } from 'react-router-dom'
import express from 'express'
import { getClient } from './services/graphcms'
import { renderToStringWithData } from 'react-apollo'
import fetch from 'node-fetch'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const context = {}
    
    // Create Apollo client for the request
    const client = getClient({
      ssrMode: true,
      fetch: fetch
    })
    
    renderToStringWithData(
      <StaticRouter context={context} location={req.url}>
        <App client={client} />
      </StaticRouter>
    )
      .then(markup => {
        if (context.url) {
          res.redirect(context.url)
        } else {
          const initialState = client.extract()

          res.status(200).send(
            `<!doctype html>
        <html lang="">
        <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta charset="utf-8" />
            <title>Welcome to Graze</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            ${
              assets.client.css
                ? `<link rel="stylesheet" href="${assets.client.css}">`
                : ''
            }
            ${
              process.env.NODE_ENV === 'production'
                ? `<script src="${assets.client.js}" defer></script>`
                : `<script src="${assets.client.js}" defer crossorigin></script>`
            }
        </head>
        <body>
            <div id="root">${markup}</div>
            <script>window.__APOLLO_STATE__=${JSON.stringify(initialState).replace(/</g, '\\u003c')}</script>
            <!-- Global site tag (gtag.js) - Google Analytics -->
            <!-- Replace GA tag with your own - this one tracks graze installs -->
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-117500261-2"></script>
            <script>
              window.dataLayer = window.dataLayer || []
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date())
              
              gtag('config', 'UA-117500261-2')
              </script>
        </body>
    </html>`
          )
        }

      }) 


  })
  
export default server
