
import game from "..";
import { getMapObjectById } from "../utils/objects";

export const jukeboxObjId = 'Jukebox - 4yllX7QCw7gCUJql2H26_d4e15b9b-8623-4567-9ba7-ce05d36afc93'

function getRandomMusicSrc() {
  const musics = [
    'http://www.noiseaddicts.com/samples_1w72b820/1461.mp3',
    'http://www.noiseaddicts.com/samples_1w72b820/2535.mp3',
    'http://www.noiseaddicts.com/samples_1w72b820/2553.mp3',
    'http://www.noiseaddicts.com/samples_1w72b820/2561.mp3',
  ]
  return musics[Math.floor(Math.random()*musics.length)]
}

export async function playRandomMusic(objId: string, mapId: string) {
  const src = getRandomMusicSrc()
  const { key } = getMapObjectById(objId, mapId)
  game.engine.sendAction({
    $case: "mapSetObjects",
    mapSetObjects: {
      mapId,
      objects: {
        [key as number]: {
          sound: {
            src,
            volume: 5,
            loop: true,
            maxDistance: 10
          },          
          _tags: []
        }
      }
    },
  });
}