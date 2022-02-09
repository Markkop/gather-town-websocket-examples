import game from "..";
import { Position } from "../types";
import { getMovement } from "../utils/movement";

const playerKonamiCount: Record<string, number> = {}

const konamiCode = [ "Up", "Up", "Down", "Down", "Left", "Right", "Left", "Right"];

function setEmote(emote: string, targetId: string) {
  game.engine.sendAction({  
    $case: "setEmoteV2",
    setEmoteV2: {
      emote: emote || undefined,
      targetId
    }
  })
}

export function detectAndRegisterKonamiMovement(playerPosition: Position, previousPlayerPosition: Record<string, Position>, playerId: string) {
  try {
    if (!previousPlayerPosition[playerId]) return

    const movement = getMovement(playerPosition, previousPlayerPosition, playerId)

    if (movement === 'Same') return

    if (movement !== konamiCode[playerKonamiCount[playerId]]) {
      playerKonamiCount[playerId] = 0
      return
    }

    if (playerKonamiCount[playerId] + 1 === konamiCode.length) {
      console.log(`Konami Code was activated by player with playerId: ${playerId}!`)
      setEmote('🕹️', playerId)
      setTimeout(() => setEmote('', playerId), 5000)
      playerKonamiCount[playerId] = 0
      return
    }
    
    playerKonamiCount[playerId] += 1
  } catch (error) {
    console.log(error)
  }
}