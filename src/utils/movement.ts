import { Position } from "../types"

export function getMovement(playerPosition: Position, previousPlayerPosition: Record<string, Position>, playerId: string) {
  const x = playerPosition.x
  const previousX = previousPlayerPosition[playerId!].x!
  const y = playerPosition.y
  const previousY = previousPlayerPosition[playerId!].y!
  if (y === (previousY - 1)) return "Up"
  if (y === (previousY + 1)) return "Down"
  if (x === (previousX + 1)) return "Right"
  if (x === (previousX - 1)) return "Left"
  if (x === previousX && y === previousY) return "Same"
  return 'None'
}