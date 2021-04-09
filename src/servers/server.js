const express = require('express')
const socketio = require('socket.io')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const webpackConfig = require('../../webpack.dev')

const app = express();
app.use(express.static('public'))

if(process.env.NODE_ENV === 'development'){
  const compiler = webpack(webpackConfig)
  app.use(webpackDevMiddleware(compiler))
} else {
  app.use(express.static('dist'))
}

const Socket = require('./core/socket')
const Game = require('./core/game')

const port = process.env.PROT || 3000;
const server = app.listen(3000, () => {
  console.log('Server Listening on port: ' + port);
})

const game = new Game;

const io = socketio(server)
const socket = new Socket(game, io);

io.on('connect', item => {
  socket.listen(item)
})