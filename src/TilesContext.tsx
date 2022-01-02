import React, { createContext, useState } from "react";
import { Tile } from "./types/tile.interface";

interface TilesContextProps {
  stateTiles: Tile[];
  setStateTiles: (tiles: Tile[]) => void;

  deletedTiles: Tile[];
  setDeletedTiles: (tiles: Tile[]) => void;

  addedTiles: Tile[];
  setAddedTiles: (tiles: Tile[]) => void;

  updatedTiles: Tile[];
  setUpdatedTiles: (tiles: Tile[]) => void;
}

export const TilesContext = createContext<TilesContextProps>({
  stateTiles: [],
  setStateTiles: () => {},
  deletedTiles: [],
  setDeletedTiles: () => {},
  addedTiles: [],
  setAddedTiles: () => {},
  updatedTiles: [],
  setUpdatedTiles: () => {},
});

interface TilesProviderProps {}

export const TilesProvider: React.FC<TilesProviderProps> = (props) => {
  const [stateTiles, setStateTiles] = useState<Tile[]>([]);
  const [deletedTiles, setDeletedTiles] = useState<Tile[]>([]);
  const [addedTiles, setAddedTiles] = useState<Tile[]>([]);
  const [updatedTiles, setUpdatedTiles] = useState<Tile[]>([]);

  return (
    <TilesContext.Provider
      value={{
        stateTiles,
        setStateTiles,
        deletedTiles,
        setDeletedTiles,
        addedTiles,
        setAddedTiles,
        updatedTiles,
        setUpdatedTiles,
      }}
    >
      {props.children}
    </TilesContext.Provider>
  );
};
