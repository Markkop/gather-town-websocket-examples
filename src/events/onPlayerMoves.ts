import { ServerClientEventByCase, ServerClientEventContext } from "@gathertown/gather-game-client"
import { plate1Location, setBossActivation, plate2Location } from "../interactions/boss"
import { detectAndRegisterKonamiMovement } from "../interactions/konamiCode"
import { Position } from "../types"

const playerPosition: Record<string, Position> = {}

function hasMatchingCoordinates(playerCoord: Position, targetCoord: Position) {
  if (playerCoord.x !== targetCoord.x) return false
  if (playerCoord.y !== targetCoord.y) return false
  if (targetCoord.direction && playerCoord.direction !== targetCoord.direction) return false
  return true
}

export function onPlayerMoves (data: ServerClientEventByCase<'playerMoves'>, context: ServerClientEventContext) {
  const player = context?.player
  const playerId = context?.playerId!
  const mapId = player?.map as string
  const playerNewPosition = { 
    x: data.playerMoves?.x, 
    y: data.playerMoves?.y,
    direction: data.playerMoves?.direction,
  }

  detectAndRegisterKonamiMovement(playerNewPosition, playerPosition, playerId)
  playerPosition[playerId] = playerNewPosition

  if (hasMatchingCoordinates(playerNewPosition, plate1Location)) {
    setBossActivation('plate1', true, mapId)
  } 

  if (hasMatchingCoordinates(playerNewPosition, plate2Location)) {
    setBossActivation('plate2', true, mapId)
  } 
}

