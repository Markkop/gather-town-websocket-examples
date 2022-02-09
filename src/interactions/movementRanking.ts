import { ServerClientEventByCase, ServerClientEventContext } from "@gathertown/gather-game-client";
import game from "..";
import { Position } from "../types"
import { getMovement } from "../utils/movement"
import { getMapObjectById } from "../utils/objects";

export const rankInfoObjectId = "CyberpunkKiosk - wpwU72qvETabIw5sz9LVo_9602e39c-f0ac-4cfe-9ffa-7bbcdaf78f3e"
const userMovementCount: Record<string, number> = {}

export function detectAndRegisterMovementRanking(playerNewPosition: Position, playerPosition: Record<string, Position>, mapId: string, playerId: string) {
  if (!playerPosition[playerId]) return
  const userMovement = getMovement(playerNewPosition, playerPosition, playerId)
  if (userMovement === 'Same' || userMovement === 'None') return

  if (!userMovementCount[playerId]) {
    userMovementCount[playerId] = 1
    return
  }

  userMovementCount[playerId] += 1
}

function getStringifiedRanking() {
  const ranking = Object.entries(userMovementCount).map(([ playerId, movements ]) => ({ playerId, movements }))
  ranking.sort((a, b) => a.movements - b.movements)
  return JSON.stringify(ranking).replace(/"/g, '\\"')
}

export function updateMovementRanking(data: ServerClientEventByCase<'playerInteracts'>, context: ServerClientEventContext) {
  const mapId = context?.player?.map as string
  const { obj, key } = getMapObjectById(rankInfoObjectId, mapId)
  const stringifiedJson = getStringifiedRanking()
  game.engine.sendAction({
    $case: "mapSetObjects",
    mapSetObjects: {
      mapId,
      objects: {
        [key as number]: {
          propertiesJson: JSON.stringify({
            url: `https://mark-nest.herokuapp.com/api/json?stringifiedJson="${stringifiedJson}"`
          }),
          _tags: []
        }
      }
    },
  });
}