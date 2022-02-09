import { ServerClientEventByCase, ServerClientEventContext } from "@gathertown/gather-game-client"
import { boardObjId, updateCounterBoardObject } from "../interactions/counterBoard"

const actionsByObjectId: Record<string, Function> = {
  [boardObjId]: updateCounterBoardObject
}

export function onPlayerInteraction (data: ServerClientEventByCase<'playerInteracts'>, context: ServerClientEventContext) {
  const player = context?.player
  const playerName = player?.name
  const mapId = player?.map as string
  const interactedObjId = data.playerInteracts.objId
  console.log(`${playerName} interacted with objId: ${interactedObjId}`)

  const action = actionsByObjectId[interactedObjId]
  if (!action) return

  action(interactedObjId, mapId)
}