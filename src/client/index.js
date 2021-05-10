import { connect, play, getDelay } from './networking'
import { $ } from './util'
import { downloadAssets } from './asset'

import './css/bootstrap-reboot.css'
import './css/main.css'
import { startRendering, stopRendering } from './render'
import { startCapturingInput, stopCapturingInput } from './input'

Promise.all([
  connect(gameOver),
  downloadAssets()
]).then(() => {
  $('.connect').classList.add('hidden')
  $('.play').classList.remove('hidden')
  $('#home input').focus();

  $('#play-button').onclick = () => {
    let val = $('#home input').value;
    if(val.replace(/\s*/g, '') === '') {
      alert('名称不能为空')
      return;
    }
    $('#home').classList.add('hidden')
    play(val)

    $('.ranking').classList.remove('hidden')
    $('.delay').classList.remove('hidden')

    startRendering();
    startCapturingInput();
  }

  // 获取实时延迟
  getDelay($('.delay'))
}).catch(console.error)

function gameOver(){
  stopRendering();
  stopCapturingInput();
  $('#home').classList.remove('hidden');
  $('.ranking').classList.add('hidden')
  $('.delay').classList.add('hidden')
  alert('你GG了，重新进入游戏吧。');
}