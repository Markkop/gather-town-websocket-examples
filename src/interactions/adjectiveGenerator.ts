
import axios from "axios";
import game from "..";
import { getMapObjectById } from "../utils/objects";

export const mirrorObjId = 'TreasuredMirror - 5bk9-P2G7xjlO0dz4U24s_7f51cdf8-6dcf-4898-9035-ba9356313498'

function capitalize (str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

async function getRandomTitle() {
  const endpoint = 'https://random-word-form.herokuapp.com/random'
  const { data: noums } = await axios(`${endpoint}/noun`)
  const { data: adjectives } = await axios(`${endpoint}/adjective`)
  return `The ${capitalize(adjectives[0])} ${capitalize(noums[0])}`
}

export async function updateUserStatusWithRandomTitle(objId: string, mapId: string) {
  const { key } = getMapObjectById(game, objId, mapId)
  const title = await getRandomTitle()
  game.engine.sendAction({  
    $case: "setTextStatus",
    setTextStatus: {
      textStatus: title,
    }
  })
}