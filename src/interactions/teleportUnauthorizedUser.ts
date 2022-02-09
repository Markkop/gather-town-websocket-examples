import game from ".."
import { Position } from "../types"
import { playersWithAccessKeys } from "./getAccessKey"

export function detectAndTeleportUnauthorizedUser(playerNewPosition: Position, mapId: string, playerId: string) {
  const isOnTeleportTileX = (playerNewPosition.x! >= 10) && (playerNewPosition.x! <= 16)
  const isOnTeleportTileY = (playerNewPosition.y! >= 7) && (playerNewPosition.y! <= 16)
  if (!isOnTeleportTileX || !isOnTeleportTileY) return

  const hasAccessKey = playersWithAccessKeys.some(playerIdWithKey => playerIdWithKey === playerId)
  if (hasAccessKey) return

  game.engine.sendAction({
    $case: 'teleport',
    teleport: {
      mapId,
      x: 18,
      y: 18,
      targetId: playerId
    }
  })
}