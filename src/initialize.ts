import game from ".";
import { deactivateBossObject } from "./interactions/boss";

let hasInitialized = false

export function initializeInteractionStates(mapId: string) {
  game.subscribeToEvent("mapSetObjects", (data, _context) => {
		if (data.mapSetObjects.mapId !== mapId || hasInitialized) return
    console.log(`Initializing interaction states for mapId: ${mapId}`)
    deactivateBossObject(mapId)
    hasInitialized = true
  })
}