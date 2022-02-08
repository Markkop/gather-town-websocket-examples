import { Game } from "@gathertown/gather-game-client";

export function findObjectInMap(game: Game, objId: string, mapId: string) {
  for (const _key in game.partialMaps[mapId].objects) {
    const key = parseInt(_key);
    const obj = game.partialMaps[mapId]?.objects?.[key];
    if (obj?.id === objId) return { obj, key }
  }
  return {}
}