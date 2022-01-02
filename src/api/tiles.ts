import { Tile } from "../types/tile.interface";

export async function getTile(id: string) {
  const response = await fetch(`http://localhost:5000/api/tiles/${id}`);

  if (response.ok) {
    return (await response.json()) as Tile;
  } else {
    return null;
  }
}
