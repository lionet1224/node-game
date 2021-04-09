import { MAP_SIZE, PLAYER, BULLET, PROP } from '../shared/constants'
import { getAsset } from './asset'
import { getCurrentState } from './state'
import { $ } from './util'

const cnv = $('#cnv')
const ctx = cnv.getContext('2d')

function setCanvasSize(){
  cnv.width = window.innerWidth;
  cnv.height = window.innerHeight;
}

setCanvasSize();

window.addEventListener('resize', setCanvasSize)

function render(){
  const { me, others, bullets, props } = getCurrentState();
  if(!me){
    return;
  }

  renderBackground(me.x, me.y);

  ctx.strokeStyle = 'black'
  ctx.lineWidth = 1;
  // 默认方框左上角在屏幕中心，减去人物的x/y算出相对于人物的偏移
  ctx.strokeRect(cnv.width / 2 - me.x, cnv.height / 2 - me.y, MAP_SIZE, MAP_SIZE)

  bullets.map(renderBullet.bind(null, me))

  // 绘制道具
  props.map(renderProp.bind(null, me))

  // 绘制所有的玩家
  // 第一个参数是对照位置的数据，第二个参数是玩家渲染的数据
  renderPlayer(me, me);
  others.forEach(renderPlayer.bind(null, me));
}

function renderBackground(x, y){
  // 假设背景圆的位置在（0, 0），那么cnv.width / 2就会将这个圆定位在屏幕中心
  // MAP_SIZE / 2 - x/y 地图中心与玩家的距离，这段距离就是背景圆圆心的位置
  // 这样就可以算出背景圆对于人物的相对位置了
  const backgroundX = MAP_SIZE / 2 - x + cnv.width / 2;
  const backgroundY = MAP_SIZE / 2 - y + cnv.height / 2;
  const bgGradient = ctx.createRadialGradient(
    backgroundX,
    backgroundY,
    MAP_SIZE / 10,
    backgroundX,
    backgroundY,
    MAP_SIZE / 2
  )
  bgGradient.addColorStop(0, 'rgb(100, 216, 89)')
  bgGradient.addColorStop(1, 'rgb(154, 207, 223)')
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, cnv.width, cnv.height)
}

function renderProp(me, prop){
  const { x, y, type } = prop;
  ctx.save();
  ctx.drawImage(
    getAsset(`${type}.svg`),
    cnv.width / 2 + x - me.x,
    cnv.height / 2 + y - me.y,
    PROP.RADUIS * 2,
    PROP.RADUIS * 2
  )
  ctx.restore();
}

function renderBullet(me, bullet){
  const { x, y, rotate } = bullet;
  ctx.save();
  ctx.translate(cnv.width / 2 + x - me.x, cnv.height / 2 + y - me.y)
  ctx.rotate(Math.PI / 180 * rotate)
  ctx.drawImage(
    getAsset('bullet.svg'),
    -BULLET.RADUIS,
    -BULLET.RADUIS,
    BULLET.RADUIS * 2,
    BULLET.RADUIS * 2
  )
  ctx.restore();
}

function renderPlayer(me, player){
  const { x, y } = player;
  // 默认将玩家渲染在屏幕中心，然后将真实的定位设置上去，再计算相对于自己的相对位置，就是正确在屏幕的位置了
  const canvasX = cnv.width / 2 + x - me.x;
  const canvasY = cnv.height / 2 + y - me.y;

  ctx.save();
  ctx.translate(canvasX, canvasY);
  ctx.drawImage(
    getAsset('ball.svg'),
    -PLAYER.RADUIS,
    -PLAYER.RADUIS,
    PLAYER.RADUIS * 2,
    PLAYER.RADUIS * 2
  )
  ctx.restore();

  ctx.fillStyle = 'white'
  ctx.fillRect(
    canvasX - PLAYER.RADUIS,
    canvasY - PLAYER.RADUIS - 8,
    PLAYER.RADUIS * 2,
    4
  )

  ctx.fillStyle = 'red'
  ctx.fillRect(
    canvasX - PLAYER.RADUIS,
    canvasY - PLAYER.RADUIS - 8,
    PLAYER.RADUIS * 2 * (player.hp / PLAYER.MAX_HP),
    4
  )

  ctx.fillStyle = 'white'
  ctx.textAlign = 'center';
  ctx.font = "20px '微软雅黑'"
  ctx.fillText(player.username, canvasX, canvasY - PLAYER.RADUIS - 16)

  player.buffs.map((buff, i) => {
    ctx.drawImage(
      getAsset(`${buff.type}.svg`),
      canvasX - PLAYER.RADUIS + i * 22,
      canvasY + PLAYER.RADUIS + 16,
      20, 20
    )
  })
}

let renderInterval = null;
export function startRendering(){
  renderInterval = setInterval(render, 1000 / 60);
}

export function stopRendering(){
  ctx.clearRect(0, 0, cnv.width, cnv.height)
  clearInterval(renderInterval);
}

export function updateRanking(data){
  let str = '';

  data.map((item, i) => {
    str += `
      <tr>
        <td>${i + 1}</td>
        <td>${item.username}</td>
        <td>${item.score}</td>
      <tr>
    `
  })

  $('.ranking table tbody').innerHTML = str;
}