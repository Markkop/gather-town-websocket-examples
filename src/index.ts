import { Game } from "@gathertown/gather-game-client";
import IsomorphicWS from "isomorphic-ws"
import { onPlayerInteraction } from "./events/onPlayerInteraction";
import { onPlayerMoves } from "./events/onPlayerMoves";
import { initializeInteractionStates } from "./initialize";
require('dotenv').config()

const apiKey = process.env.GATHER_API_KEY as string
const mapId = process.env.GATHER_MAP_ID as string
const spaceId = process.env.GATHER_SPACE_ID?.replace('/', '\\')

global.WebSocket = IsomorphicWS;
const game = new Game(spaceId, () => Promise.resolve({ apiKey }));
game.connect();
game.subscribeToConnection((connected) => {
  if (!connected) {
    console.log('Connection unsuccessful')
    return
  }

  console.log('Connected!')
  initializeInteractionStates(mapId)
  game.subscribeToEvent("playerInteracts", onPlayerInteraction);
  game.subscribeToEvent("playerMoves", onPlayerMoves);
});

export default game