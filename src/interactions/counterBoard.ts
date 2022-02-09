import game from "..";
import { getMapObjectById } from "../utils/objects";

// Change this ID to the objId you get from the console when interacting with the object you wish to change
export const boardObjId = 'Bulletin (Note) - BgaTeaDUwpoAobpTSTwOU_70959c6e-5d49-482f-b07d-74ffb2fd03ec'

let counter = 0

function getNumberWithOrdinalSuffix(number: number) {
  const restOfDivisionBy10 = number % 10
  const restOfDivisionBy100 = number % 100
  if (restOfDivisionBy10 == 1 && restOfDivisionBy100 != 11) return number + "st"
  if (restOfDivisionBy10 == 2 && restOfDivisionBy100 != 12) return number + "nd"
  if (restOfDivisionBy10 == 3 && restOfDivisionBy100 != 13) return number + "rd"
  return number + "th";
}

export function updateCounterBoardObject(objId: string, mapId: string) {
  const { key } = getMapObjectById(game, objId, mapId)
  game.engine.sendAction({
    $case: "mapSetObjects",
    mapSetObjects: {
      mapId,
      objects: {
        [key as number]: {
          previewMessage: 'Press X to increase the counter',
          propertiesJson: JSON.stringify({
            message: `I've got an interaction ${counter} times.\nYou're the ${getNumberWithOrdinalSuffix(counter + 1)}`
          }),
          _tags: []
        }
      }
    },
  });
  counter += 1
}