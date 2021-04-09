import { updateRanking } from "./render";

const gameUpdates = [];

export function processGameUpdate(update){
  gameUpdates.push(update)
  
  updateRanking(update.leaderboard) 
}

export function getCurrentState(){
  return gameUpdates[gameUpdates.length - 1]
}