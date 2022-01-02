import { Dispatch, SetStateAction, useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import classes from "./add-card.module.scss";
import { uid } from "uid";
import { colorValues } from "../../utils/colorValues";
import { TilesContext } from "../../TilesContext";

type CardType = "Add" | "Set";

interface ProtectedAddCardProps {}

const AddCard: React.VFC<ProtectedAddCardProps> = () => {
  const { loggedInUser } = useContext(UserContext);
  const [cardType, setCardType] = useState<CardType>("Add");

  return (
    <div className={classes.cardContainer}>
      {cardType === "Add" ? (
        <AddVariation cardType={cardType} setCardType={setCardType} />
      ) : (
        <SetVariation cardType={cardType} setCardType={setCardType} />
      )}
    </div>
  );
};

interface AddVariationProps {
  cardType: CardType;
  setCardType: Dispatch<SetStateAction<CardType>>;
}

const AddVariation: React.VFC<AddVariationProps> = ({
  cardType,
  setCardType,
}) => {
  const handleAdd = () => {
    setCardType("Set");
  };

  return (
    <button onClick={handleAdd} className={classes.addBtn}>
      +
    </button>
  );
};

interface SetVariationProps {
  cardType: CardType;
  setCardType: Dispatch<SetStateAction<CardType>>;
}

const SetVariation: React.VFC<SetVariationProps> = ({
  cardType,
  setCardType,
}) => {
  const { stateTiles, setStateTiles } = useContext(TilesContext);
  const { addedTiles, setAddedTiles } = useContext(TilesContext);
  const handleColorChange = (color: string) => {
    const x = uid(24); //generates an id for the new tile
    setStateTiles([...stateTiles, { _id: x, color: color }]);
    setAddedTiles([...addedTiles, { _id: x, color: color }]);
    setCardType("Add");
  };

  return (
    <div className={classes.colorBtnContainer}>
      {Object.values(colorValues).map((color, key) => {
        return (
          <button
            key={key}
            onClick={() => handleColorChange(color)}
            style={{ backgroundColor: color }}
            className={classes.colorBtn}
          ></button>
        );
      })}
    </div>
  );
};

export default AddCard;
