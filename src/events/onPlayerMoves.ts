import { ServerClientEventByCase, ServerClientEventContext } from "@gathertown/gather-game-client"
import { plate1Location, setBossActivation, plate2Location, detectAndRegisterBossTrigger } from "../interactions/boss"
import { detectAndRegisterKonamiMovement } from "../interactions/konamiCode"
import { detectAndTriggerRPGLikeTalking } from "../interactions/rpgLikeTalking"
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
  playerPosition[playerId] = playerNewPosition

}

