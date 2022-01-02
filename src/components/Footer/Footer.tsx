import axios from "axios";
import { useCallback, useContext, useState } from "react";
import { TilesContext } from "../../TilesContext";
import { User } from "../../types/user.interface";
import { Tile } from "../../types/tile.interface";
import classes from "./footer.module.scss";
import { useLocation } from "react-router-dom";
import { UsersContext } from "../../UsersContext";

const Footer = () => {
  const [isError, setIsError] = useState(false);

  const [users, setUsers] = useState<User[]>([]);
  const {
    stateTiles,
    setStateTiles,
    deletedTiles,
    setDeletedTiles,
    addedTiles,
    setAddedTiles,
    updatedTiles,
    setUpdatedTiles,
  } = useContext(TilesContext);

  const { stateUsers, setStateUsers } = useContext(UsersContext);
  setStateTiles(stateTiles);
  setDeletedTiles(deletedTiles);
  setAddedTiles(addedTiles);
  setUpdatedTiles(updatedTiles);
  setStateUsers(stateUsers);
  const location = useLocation();

  const saveBtnTMP = useCallback(() => {
    const sendrequest = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/tiles/state",
          {
            stateTiles,
            deletedTiles,
            addedTiles,
            updatedTiles,
          }
        );

        if (response.status >= 200 && response.status <= 399) {
          setAddedTiles([]);
          setUpdatedTiles([]);
          setDeletedTiles([]);
        } else if (response.status > 399) {
          setIsError(true);
        }
      } catch (error: any) {
        throw new Error(error);
      }
    };

    sendrequest();
  }, [stateTiles]);

  const saveBtnUMP = useCallback(() => {
    const sendrolerequest = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/users/state",
          {
            stateUsers,
          }
        );

        if (response.status >= 200 && response.status <= 399) {
          setStateUsers(response.data.newDBUsers);
        } else if (response.status > 399) {
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
      }
    };
    sendrolerequest();
  }, [stateUsers]);

  const undoBtnTMP = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tiles");
      const result = await res.json();
      const tiles = result.tiles as Tile[];
      setStateTiles(tiles);
    } catch (error) {}
  }, []);

  const undoBtnUMP = useCallback(async () => {}, []);

  const saveBtn = location.pathname === "/home" ? saveBtnTMP : saveBtnUMP;
  const undoBtn = location.pathname === "/home" ? undoBtnTMP : undoBtnUMP;

  return (
    <nav className={classes.navbar}>
      <div className={classes.buttonContainer}>
        <button onClick={undoBtn} className={classes.undoButton}>
          UNDO
        </button>

        <button onClick={saveBtn} className={classes.saveButton}>
          SAVE
        </button>
      </div>
    </nav>
  );
};

export default Footer;
