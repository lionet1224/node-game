import io from 'socket.io-client'
import Constants from '../shared/constants';
import { $ } from './util'

import { processGameUpdate } from './state'

const socketProtocal = (window.location.protocol.includes('https') ? 'wss' : 'ws');
const socket = io(`${socketProtocal}://${window.location.host}`, { reconnection: false })

const connectPromise = new Promise(resolve => {
  socket.on('connect', () => {
    console.log('Connect to server!')
    resolve();
  })
})

export const connect = onGameOver => {
  connectPromise.then(() => {
    socket.on(Constants.MSG_TYPES.UPDATE, processGameUpdate);
    socket.on(Constants.MSG_TYPES.GAME_OVER, onGameOver)
    socket.on('disconnect', () => {
      $('.disconnect').classList.remove('hidden')
      console.log('Disconnected from server.')
    })
  })
}

export const play = username => {
  socket.emit(Constants.MSG_TYPES.JOIN_GAME, username);
}

export const emitControl = data => {
  socket.emit(Constants.MSG_TYPES.INPUT, data);
}

export const getDelay = dom => {
  let prev = 0;
  setInterval(() => {
    prev = new Date().getTime()
    socket.emit(Constants.MSG_TYPES.GET_DELAY);
  }, 1000);
  socket.on(Constants.MSG_TYPES.GET_DELAY, () => {
    let now = new Date().getTime();
    dom.innerHTML = (now - prev) / 2 + 'ms'
  })
}