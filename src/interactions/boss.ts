import game from "..";
import { Position } from "../types";
import { getMapObjectById } from "../utils/objects";

export const bossObjectId = 'Bulletin (Note) - BgaTeaDUwpoAobpTSTwOU_80989e70-91e8-4503-9806-0f0713c2223f'
export const blankImage = 'https://cdn.gather.town/v0/b/gather-town-dev.appspot.com/o/objects%2Fblank.png?alt=media&token=6564fd34-433a-4e08-843a-5c4b50d6f9e5';
export const bossImage = 'https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/internal-dashboard/images/hZSWr066RzaCkkv8uIR-l'

export const plate1Location = { x: 21, y: 29 }
export const plate2Location = { x: 25, y: 29 }

export const bossActivation: Record<string, boolean> = {
  plate1: false,
  plate2: false,
  boss: false
}

function hasMatchingCoordinates(playerCoord: Position, targetCoord: Position) {
  if (playerCoord.x !== targetCoord.x) return false
  if (playerCoord.y !== targetCoord.y) return false
  if (targetCoord.direction && playerCoord.direction !== targetCoord.direction) return false
  return true
}

export function setBossObject(mapId: string, active: boolean) {
  const { key } = getMapObjectById(bossObjectId, mapId)
  game.engine.sendAction({
    $case: "mapSetObjects",
    mapSetObjects: {
      mapId,
      objects: {
        [key as number]: {
          type: active ? 6 : 0,
          previewMessage: 'Press X to challenge the boss',
          highlighted: active ? bossImage : blankImage,
          normal: active ? bossImage : blankImage,
          propertiesJson: JSON.stringify({
            message: 'Grr'
          }),
          _tags: []
        }
      }
    },
  });
}

export function activateBossObject(mapId: string) {
  bossActivation.boss = true
  setBossObject(mapId, true)
  setTimeout(() => {
    deactivateBossObject(mapId)
  }, 5000)
}

export function deactivateBossObject(mapId: string) {
  setBossObject(mapId, false)
  bossActivation.plate1 = false
  bossActivation.plate2 = false
  bossActivation.boss = false
}

export function setBossActivation(key: string, active: boolean, mapId: string) {
  bossActivation[key] = active

  if (bossActivation.plate1 && bossActivation.plate2 && !bossActivation.boss) {
    activateBossObject(mapId)
    return
  }

  if (!bossActivation.boss) {
    setTimeout(() => bossActivation[key] = false, 1000)
    return
  }
} 

export function detectAndRegisterBossTrigger(playerNewPosition: Position, mapId: string) {
  if (hasMatchingCoordinates(playerNewPosition, plate1Location)) {
    setBossActivation('plate1', true, mapId)
  } 
  
  if (hasMatchingCoordinates(playerNewPosition, plate2Location)) {
    setBossActivation('plate2', true, mapId)
  } 
}
