const Constants = require('../../shared/constants')
const Item = require('./item')

class Prop extends Item{
  constructor(type){
    const x = (Math.random() * .5 + .25) * Constants.MAP_SIZE;
    const y = (Math.random() * .5 + .25) * Constants.MAP_SIZE;
    super({
      x, y,
      w: Constants.PROP.RADUIS,
      h: Constants.PROP.RADUIS
    });

    this.isOver = false;
    // 什么类型的buff
    this.type = type;
    // 持续10秒
    this.time = 10;
  }

  add(player){
    switch(this.type){
      case 'speed':
        player.speed += 500;
        break;
    }
  }

  remove(player){
    switch(this.type){
      case 'speed':
        player.speed -= 500;
        break;
    }
  }

  update(dt){
    this.time -= dt;
  }

  serializeForUpdate(){
    return {
      ...(super.serializeForUpdate()),
      type: this.type,
      time: this.time
    }
  }
}

module.exports = Prop;