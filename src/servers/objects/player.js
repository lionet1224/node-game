const Item = require('./item')
const Constants = require('../../shared/constants');
const Bullet = require('./bullet');
const xss = require('xss')

class Player extends Item{
  constructor(data){
    super(data)

    this.move = {
      left: 0, right: 0,
      top: 0, bottom: 0
    };
    this.username = data.username;
    this.hp = Constants.PLAYER.MAX_HP;
    this.speed = Constants.PLAYER.SPEED;
    this.score = 0;
    this.buffs = [];
    // 开火
    this.fire = false;
    this.fireMouseDir = 0;
    this.fireTime = 0;
  }

  update(dt){
    this.x += (this.move.left + this.move.right) * this.speed * dt;
    this.y += (this.move.top + this.move.bottom) * this.speed * dt;

    this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x))
    this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y))

    // 判断buff是否失效
    this.buffs = this.buffs.filter(item => {
      if(item.time > 0){
        return item;
      } else {
        item.remove(this);
      }
    })
    // buff的持续时间每帧都减少
    this.buffs.map(buff => buff.update(dt));

    this.fireTime -= dt;
    if(this.fire != false){
      if(this.fireTime <= 0){
        this.fireTime = Constants.PLAYER.FIRE;
        return new Bullet(this.id, this.x, this.y, this.fireMouseDir);
      }
    }
  }

  pushBuff(prop){
    this.buffs.push(prop);
    prop.add(this);
  }

  takeBulletDamage(){
    this.hp -= 1;
  }

  serializeForUpdate(){
    return {
      ...(super.serializeForUpdate()),
      username: xss(this.username),
      hp: this.hp,
      buffs: this.buffs.map(item => item.serializeForUpdate())
    }
  }
}

module.exports = Player;