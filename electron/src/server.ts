import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import * as core from 'express-serve-static-core'
import * as http from 'http'

let app: core.Express | null = null
let appServer: http.Server
const PORT = 6062

function getNewApp() {
  app = express()

  app.use(bodyParser.json({ type: '*/json' }))

  app.use(cors())

  app.post('/', (req, res) => {
    const msg = req.body
    console.log(`Server message received: ${JSON.stringify(msg)}`, 'server')
    res.json({ ...msg, extra: 'context' })
  })

  app.post('/invoice-order', (req, res) => {
    const msg = req.body
    console.log(`Server message received: ${JSON.stringify(msg)}`, 'server')
    res.json(msg)
  })

  appServer = app.listen(PORT, () => {
    console.log(`inStore server app listening on ${PORT}!`, 'server')
  })

  return app
}

function close() {
  appServer.close()
}

function getApp() {
  if (app) {
    console.log(`Returning same app ${app}`)
    return app
  }

  console.log('Creating new app...')

  return getNewApp()
}

function getDefaultEndpoint() {
  return `http://localhost:${PORT}`
}

const server = {
  close,
  getApp,
  getDefaultEndpoint,
  getNewApp,
}

export default server
