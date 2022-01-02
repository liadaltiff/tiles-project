import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import classes from "./home-page.module.scss";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import ColorsCard from "../../components/ColorsCard/ColorsCard";
import AddCard from "../../components/AddCard/AddCard";
import { Tile } from "../../types/tile.interface";
import Footer from "../../components/Footer/Footer";
import { TilesContext } from "../../TilesContext";

const HomePage = () => {
  const { stateTiles, setStateTiles } = useContext(TilesContext);

  const navigate = useNavigate();

  const [showPlus, setShowPlus] = useState(true);

  useEffect(() => {
    const fetchTiles = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/tiles");
        const result = await res.json();
        const tiles = result.tiles as Tile[];
        setStateTiles(tiles);
      } catch (error) {}
    };

    fetchTiles();
  }, []);

  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  if (loggedInUser) {
    setLoggedInUser(loggedInUser);
  }

  useEffect(() => {}, [stateTiles]);
  console.log("the stateTiles is:", stateTiles);

  return (
    <div className={classes.app}>
      <Header />
      {loggedInUser && (
        <div className={classes.cards}>
          {stateTiles &&
            stateTiles.map((tile, key) => <ColorsCard tile={tile} key={key} />)}
          {loggedInUser.role === "Admin" && <AddCard />}
          {loggedInUser.role === "Moderator" && <AddCard />}
          {loggedInUser.role === "Editor"}
        </div>
      )}

      {loggedInUser && (
        <div>
          {loggedInUser.role === "Admin" && <Footer />}
          {loggedInUser.role === "Moderator" && <Footer />}
          {loggedInUser.role === "Editor" && <Footer />}
        </div>
      )}
    </div>
  );
};

export default HomePage;
