import { useContext } from "react";
import { Tile } from "../../types/tile.interface";
import { UserContext } from "../../UserContext";
import classes from "./colors-card.module.scss";
import { colorValues } from "../../utils/colorValues";
import { TilesContext } from "../../TilesContext";

interface ProtectedCardProps {
  tile: Tile;
}

const ColorsCard: React.VFC<ProtectedCardProps> = ({ tile }) => {
  const { loggedInUser } = useContext(UserContext);
  const { stateTiles, setStateTiles } = useContext(TilesContext);
  const { deletedTiles, setDeletedTiles } = useContext(TilesContext);
  const { updatedTiles, setUpdatedTiles } = useContext(TilesContext);

  function changeColor(color: string) {
    if (stateTiles) {
      setStateTiles(
        stateTiles.map((currentTile) => {
          if (currentTile._id === tile._id) {
            return { _id: tile._id, color: color };
          } else {
            return currentTile;
          }
        })
      );

      let updatedItem = stateTiles.find((val) => val._id === tile._id);
      // const clickedColor = colors.toString();

      updatedItem = { _id: tile._id, color: color };
      if (updatedItem !== undefined) {
        setUpdatedTiles([...updatedTiles, updatedItem]);
      }
    }
  }

  function deleteCard() {
    if (stateTiles) {
      const items = stateTiles.filter((val) => val._id !== tile._id);
      setStateTiles(items);

      const deletedItem = stateTiles.find((val) => val._id === tile._id);

      if (deletedItem !== undefined) {
        setDeletedTiles([...deletedTiles, deletedItem]);
      }
    }
  }

  const colors = Object.values(colorValues);

  if (loggedInUser?.role === "Moderator" || loggedInUser?.role === "Admin") {
    return (
      <div className={classes.root} style={{ backgroundColor: tile.color }}>
        <div className={classes.footerCardContainer}>
          {colors
            .filter((color) => color.toLowerCase() !== tile.color.toLowerCase())
            .map((color, key) => {
              return (
                <button
                  key={key}
                  style={{ backgroundColor: color }}
                  className={classes.colorBtn}
                  onClick={() => changeColor(color)}
                ></button>
              );
            })}
          <button
            type="button"
            onClick={deleteCard}
            className={classes.deleteButton}
          >
            Del
          </button>
        </div>
      </div>
    );
  }

  if (loggedInUser?.role === "Editor") {
    return (
      <div className={classes.root} style={{ backgroundColor: tile.color }}>
        <div className={classes.footerCardContainer}>
          {colors
            .filter((color) => color.toLowerCase() !== tile.color.toLowerCase())
            .map((color, key) => {
              return (
                <button
                  key={key}
                  style={{ backgroundColor: color }}
                  className={classes.colorBtn}
                  onClick={() => changeColor(color)}
                ></button>
              );
            })}
        </div>
      </div>
    );
  }

  if (loggedInUser?.role === "Viewer") {
    return (
      <div
        className={classes.root}
        style={{ backgroundColor: tile.color }}
      ></div>
    );
  }

  return <div></div>;
};

export default ColorsCard;
