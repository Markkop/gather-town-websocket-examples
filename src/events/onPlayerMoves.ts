import { ServerClientEventByCase, ServerClientEventContext } from "@gathertown/gather-game-client"
import { plate1Location, setBossActivation, plate2Location, detectAndRegisterBossTrigger } from "../interactions/boss"
import { detectAndRegisterKonamiMovement } from "../interactions/konamiCode"
import { detectAndRegisterMovementRanking } from "../interactions/movementRanking"
import { detectAndTriggerRPGLikeTalking } from "../interactions/rpgLikeTalking"
import { detectAndTeleportUnauthorizedUser } from "../interactions/teleportUnauthorizedUser"
import { Position } from "../types"

const playerPosition: Record<string, Position> = {}

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
  detectAndRegisterBossTrigger(playerNewPosition, mapId)
  detectAndTriggerRPGLikeTalking(playerNewPosition, mapId)
  detectAndTeleportUnauthorizedUser(playerNewPosition, mapId, playerId)
  detectAndRegisterMovementRanking(playerNewPosition, playerPosition, mapId, playerId)
  playerPosition[playerId] = playerNewPosition

}

