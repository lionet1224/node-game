import { emitControl } from "./networking";

function onKeydown(ev){
  let code = ev.keyCode;
  switch(code){
    case 65:
      emitControl({
        action: 'move-left',
        data: false
      })
      break;
    case 68:
      emitControl({
        action: 'move-right',
        data: true
      })
      break;
    case 87:
      emitControl({
        action: 'move-top',
        data: false
      })
      break;
    case 83:
      emitControl({
        action: 'move-bottom',
        data: true
      })
      break;
  }
}

function onKeyup(ev){
  let code = ev.keyCode;
  switch(code){
    case 65:
      emitControl({
        action: 'move-left',
        data: 0
      })
      break;
    case 68:
      emitControl({
        action: 'move-right',
        data: 0
      })
      break;
    case 87:
      emitControl({
        action: 'move-top',
        data: 0
      })
      break;
    case 83:
      emitControl({
        action: 'move-bottom',
        data: 0
      })
      break;
  }
}

function getMouseDir(ev){
  const dir = Math.atan2(ev.clientX - window.innerWidth / 2, ev.clientY - window.innerHeight / 2);
  return dir;
}

function onMousemove(ev){
  if(ev.button === 0){
    emitControl({
      action: 'dir',
      data: getMouseDir(ev)
    })
  }
}

function onMousedown(ev){
  if(ev.button === 0){
    emitControl({
      action: 'bullet',
      data: true
    })
  }
}

function onMouseup(ev){
  if(ev.button === 0){
    emitControl({
      action: 'bullet',
      data: false
    })
  }
}

export function startCapturingInput(){
  window.addEventListener('keydown', onKeydown);
  window.addEventListener('keyup', onKeyup);
  window.addEventListener('mousedown', onMousedown)
  window.addEventListener('mousemove', onMousemove)
  window.addEventListener('mouseup', onMouseup)
}

export function stopCapturingInput(){
  window.removeEventListener('keydown', onKeydown);
  window.removeEventListener('keyup', onKeyup);
  window.removeEventListener('mousedown', onMousedown)
  window.addEventListener('mousemove', onMousemove)
  window.removeEventListener('mouseup', onMouseup)
}