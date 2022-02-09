import { ServerClientEventByCase, ServerClientEventContext } from "@gathertown/gather-game-client";
import game from "..";
import { Position } from "../types";
import { getMapObjectById } from "../utils/objects";

export const hologramObjId = "HologramAvatar - e86LVs7JpcL3lbuK85oz_feecb91a-d414-49e6-9c18-4e3e41811ad8"
const text = "It's dangerous to go alone! Take this."
let isTalking = false
let i = 1

function updateObjectPreviewMessage(key: number, mapId: string, message: string) {
  game.engine.sendAction({
    $case: "mapSetObjects",
    mapSetObjects: {
      mapId,
      objects: {
        [key as number]: {
          previewMessage: message,
          _tags: []
        }
      }
    },
  });
}

export function detectAndTriggerRPGLikeTalking(playerNewPosition: Position, mapId: string) {
  const { obj, key } = getMapObjectById(hologramObjId, mapId)
  const objectPosition = {
    x: obj?.x!,
    y: obj?.y!
  }
  const isNearObjectX = (playerNewPosition.x! >= objectPosition.x - 2) && (playerNewPosition.x! <= objectPosition.x + 2)
  const isNearObjectY = (playerNewPosition.y! >= objectPosition.y - 2) && (playerNewPosition.y! <= objectPosition.y + 2)
  if (!isNearObjectX || !isNearObjectY) return
  if (isTalking) return

  isTalking = true

  const interval = setInterval(() => {
    const message = text.slice(0, i) || '...'
    updateObjectPreviewMessage(key!, mapId, message)
    i++
    if (i === text.length + 1) {
      clearInterval(interval)
      i = 0
      setTimeout(() => updateObjectPreviewMessage(key!, mapId, '...'), 5000)
      isTalking = false
    }
  }, 200)
}