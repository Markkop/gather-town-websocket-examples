import game from '../index'

export function getMapObjectById(objId: string, mapId: string) {
  for (const _key in game.partialMaps[mapId].objects) {
    const key = parseInt(_key);
    const obj = game.partialMaps[mapId]?.objects?.[key];
    if (obj?.id === objId) return { obj, key }
  }
  return {}
}