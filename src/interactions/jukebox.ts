
import { ServerClientEventByCase, ServerClientEventContext } from "@gathertown/gather-game-client";
import game from "..";
import { getMapObjectById } from "../utils/objects";

export const jukeboxObjId = 'Jukebox - 4yllX7QCw7gCUJql2H26_d4e15b9b-8623-4567-9ba7-ce05d36afc93'

function getRandomMusicSrc() {
  const musics = [
    'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/0hrxfzxfOGu85YnW7MrxYF6IKLHKG0Fk8RUnMS3O.mp3',
    'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/hrSAa0ZqCPHYmKqKuOZZB59vBmTBf7A7sGn5ej6p.mp3',
    'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/SzI0hS43cML1U882iSx5GGvIDkOLM9TxTNICMmHv.mp3',
    'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/WiTUV0sMywGDj4tbvEuJl09mmmhu7o18sV2aPWSB.mp3',
  ]
  return musics[Math.floor(Math.random()*musics.length)]
}

export async function playRandomMusic(data: ServerClientEventByCase<'playerInteracts'>, context: ServerClientEventContext) {
  const mapId = context?.player?.map as string
  const interactedObjId = data.playerInteracts.objId
  const { key } = getMapObjectById(interactedObjId, mapId)
  const src = getRandomMusicSrc()
  game.engine.sendAction({
    $case: "mapSetObjects",
    mapSetObjects: {
      mapId,
      objects: {
        [key as number]: {
          sound: {
            src,
            volume: 2,
            loop: true,
            maxDistance: 4
          },          
          _tags: []
        }
      }
    },
  });
}