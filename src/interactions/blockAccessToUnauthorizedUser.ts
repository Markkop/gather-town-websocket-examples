import game from "..";
import { Position } from "../types";
import { playersWithAccessKeys } from "./getAccessKey";
import { getMapObjectById } from "../utils/objects";

const doorObjectId =
  "Trapdoor - RP-B6wQv3MPJ5QJ6IljWQ_f3a0a2f8-3639-4dbe-98c6-8a0cb8a4ad61";

export function blockAccessToUnauthorizedUser(
  playerNewPosition: Position,
  mapId: string,
  playerId: string
) {
  const isInFrontOfDoorX = playerNewPosition.x! == 26;
  const isInFrontOfDoorY = playerNewPosition.y! == 18;
  if (!isInFrontOfDoorX || !isInFrontOfDoorY) return;

  const hasAccessKey = playersWithAccessKeys.some(
    (playerIdWithKey) => playerIdWithKey === playerId
  );
  if (!hasAccessKey) return;

  const { key } = getMapObjectById(doorObjectId, mapId);

  game.engine.sendAction({
    $case: "mapSetObjects",
    mapSetObjects: {
      mapId,
      objects: {
        [key as number]: {
          previewMessage: "Acesso liberado!",
          _tags: [],
        },
      },
    },
  });

  // TO-DO: ver como teleportar para outra sala, caso ele tenha autorização, talvez até tirar o "impassable" que tem em cima do objeto pra não ficar tão esquisito.

  game.engine.sendAction({
    $case: "teleport",
    teleport: {
      mapId,
      x: 18,
      y: 18,
      targetId: playerId,
    },
  });
}
