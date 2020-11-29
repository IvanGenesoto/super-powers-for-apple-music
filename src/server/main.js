import express from 'express'
import {createServer} from 'http'
import {join} from 'path'

const {env: environment} = process
const {PORT, NODE_ENV} = environment
const isProduction = NODE_ENV === 'production'
const app = express()
const server = createServer(app)
const port = PORT || 3000
const log = () => isProduction || console.info('Listening on port ' + port)

join(__dirname, 'public') // eslint-disable-line @babel/no-unused-expressions -- function call
  |> express.static
  |> app.use

server.listen(port, log)
