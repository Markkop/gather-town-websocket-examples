import { Game, ServerClientEventContext } from "@gathertown/gather-game-client";
import { findObjectInMap } from './utils/objects'
import IsomorphicWS from "isomorphic-ws"
require('dotenv').config()

const apiKey = process.env.GATHER_API_KEY as string
const spaceId = process.env.GATHER_SPACE_ID?.replace('/', '\\')

// Change this ID to the objId you get from the console when interacting with the object you wish to change
const boardObjId = 'Bulletin (Note) - BgaTeaDUwpoAobpTSTwOU_70959c6e-5d49-482f-b07d-74ffb2fd03ec'

global.WebSocket = IsomorphicWS;
const game = new Game(spaceId, () => Promise.resolve({ apiKey }));
game.connect();
game.subscribeToConnection((connected) => console.log("connected?", connected));

// game.subscribeToEvent("playerMoves", (data, context) => {
//   console.log(context?.player?.name, "moved!");
// });

game.subscribeToEvent("playerInteracts", (data, context: ServerClientEventContext) => {
  const player = context?.player
  const playerName = player?.name
  const mapId = player?.map as string
  const interactedObjId = data.playerInteracts.objId
  console.log(`${playerName} interacted with objId: ${interactedObjId}`)

  if (boardObjId !== boardObjId) return
  const { obj, key } = findObjectInMap(game, interactedObjId, mapId)

  game.engine.sendAction({
    $case: "mapSetObjects",
    mapSetObjects: {
      mapId,
      objects: {
        [key as number]: {
          previewMessage: 'Aperte x para dar um mortal carpado',
          propertiesJson: JSON.stringify({
            message: `E aí maluco, olha só o segundo que o último cara interagiu comigo: ${new Date(Date.now()).getSeconds()}`
          }),
          _tags: []
        }
      }
    },
  });
});