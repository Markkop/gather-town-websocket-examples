import { ServerClientEventByCase, ServerClientEventContext } from "@gathertown/gather-game-client"
import { mirrorObjId, updateUserStatusWithRandomTitle } from "../interactions/titleGenerator"
import { boardObjId, updateCounterBoardObject } from "../interactions/counterBoard"
import { jukeboxObjId, playRandomMusic } from "../interactions/jukebox"
import { hologramObjId } from "../interactions/rpgLikeTalking"
import { getAccessKey } from "../interactions/getAccessKey"
import { rankInfoObjectId, updateMovementRanking } from "../interactions/movementRanking"

const actionsByObjectId: Record<string, Function> = {
  [boardObjId]: updateCounterBoardObject,
  [mirrorObjId]: updateUserStatusWithRandomTitle,
  [jukeboxObjId]: playRandomMusic,
  [hologramObjId]: getAccessKey,
  [rankInfoObjectId] : updateMovementRanking
}

export function onPlayerInteraction (data: ServerClientEventByCase<'playerInteracts'>, context: ServerClientEventContext) {
  const player = context?.player
  const playerName = player?.name
  const interactedObjId = data.playerInteracts.objId
  console.log(`${playerName} interacted with objId: ${interactedObjId}`)

  const action = actionsByObjectId[interactedObjId]
  if (!action) return

  action(data, context)
}