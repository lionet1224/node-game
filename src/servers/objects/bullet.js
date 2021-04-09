const shortid = require('shortid')
const Constants = require('../../shared/constants');
const Item = require('./item')

class Bullet extends Item{
  constructor(parentID, x, y, dir){
    super({
      id: shortid(),
      x, y,
      w: Constants.BULLET.RADUIS,
      h: Constants.BULLET.RADUIS,
    });

    this.rotate = 0;
    this.dir = dir;
    this.parentID = parentID;
    this.isOver = false;
  }

  update(dt){
    this.x += dt * Constants.BULLET.SPEED * Math.sin(this.dir);
    this.y += dt * Constants.BULLET.SPEED * Math.cos(this.dir);

    this.rotate += dt * 360;

    if(this.x < 0 || this.x > Constants.MAP_SIZE
      || this.y < 0 || this.y > Constants.MAP_SIZE){
        this.isOver = true;
      }
  }

  serializeForUpdate(){
    return {
      ...(super.serializeForUpdate()),
      rotate: this.rotate
    }
  }
}

module.exports = Bullet;