const Constants = require('../../shared/constants')

class Socket{
  constructor(game, io){
    this.game = game;
    this.io = io;
  }

  listen(socket){
    console.log(`Player connected! Socket Id: ${socket.id}`)

    socket.on(Constants.MSG_TYPES.JOIN_GAME, this.game.joinGame.bind(this.game, socket))
    socket.on(Constants.MSG_TYPES.INPUT, this.game.handleInput.bind(this.game, socket))
    socket.on(Constants.MSG_TYPES.GET_DELAY, () => {
      socket.emit(Constants.MSG_TYPES.GET_DELAY);
    })
    socket.on('disconnect', this.game.disconnect.bind(this.game, socket))
  }
}

module.exports = Socket