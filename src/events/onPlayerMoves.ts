import { ServerClientEventByCase, ServerClientEventContext, SpriteDirectionEnum_ENUM } from "@gathertown/gather-game-client"
import { plate1Location, setBossActivation, plate2Location } from "../interactions/boss"

type Coordinates = {
  x?: number,
  y?: number,
  direction?: SpriteDirectionEnum_ENUM
}

function hasMatchingCoordinates(playerCoord: Coordinates, targetCoord: Coordinates) {
  if (playerCoord.x !== targetCoord.x) return false
  if (playerCoord.y !== targetCoord.y) return false
  if (targetCoord.direction && playerCoord.direction !== targetCoord.direction) return false
  return true
}

export function onPlayerMoves (data: ServerClientEventByCase<'playerMoves'>, context: ServerClientEventContext) {
  const player = context?.player
  const mapId = player?.map as string
  const playerCoordinates = { 
    x: data.playerMoves?.x, 
    y: data.playerMoves?.y,
    direction: data.playerMoves?.direction,
  }

  if (hasMatchingCoordinates(playerCoordinates, plate1Location)) {
    setBossActivation('plate1', true, mapId)
  } 

  if (hasMatchingCoordinates(playerCoordinates, plate2Location)) {
    setBossActivation('plate2', true, mapId)
  } 
}

