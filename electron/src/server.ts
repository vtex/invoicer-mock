import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import * as core from 'express-serve-static-core'
import * as http from 'http'

let app: core.Express | null = null
let appServer: http.Server
const PORT = 6062

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function getNewApp() {
  app = express()

  app.use(bodyParser.json({ type: '*/json' }))

  app.use(cors())

  app.post('/', (req, res) => {
    const msg = req.body
    console.log(`Server message received: ${JSON.stringify(msg)}`, 'server')
    res.json({ ...msg, extra: 'context' })
  })

  app.post('/invoice-order', async (req, res) => {
    const context = req.body
    console.log(`Server invoice order received: ${JSON.stringify(context)}`, 'server')

    await sleep(1000) // simulate going to server

    const exampleInvoiceLink =
      'https://instore.vteximg.com.br/assets/vtex.instore/files/nfce___1662c41872c9667a5e31f64248af4d8e.pdf'

    // Fake invoice response
    res.json({
      invoiceNumber: Math.floor(Math.random() * 100000000000).toString(),
      invoiceUrl: exampleInvoiceLink, // To save on order
      printUrl: exampleInvoiceLink, // Optional parameter if wanted to change the printing url
    })
  })

  app.post('/invoice-order-error', async (req, res) => {
    const context = req.body
    console.log(`Server invoice order received: ${JSON.stringify(context)}`, 'server')

    await sleep(1000) // simulate going to server

    // Fake invoice response
    res.status(500).json({
      message: 'Invoice mock error',
    })
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
