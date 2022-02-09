import { ServerClientEventByCase, ServerClientEventContext } from "@gathertown/gather-game-client";

export const playersWithAccessKeys: string[] = []

export function getAccessKey(data: ServerClientEventByCase<'playerInteracts'>, context: ServerClientEventContext) {
  const playerId = context?.playerId
  playersWithAccessKeys.push(playerId!)
}