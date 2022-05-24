import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CallApi from "../../util/CallApi";
import ShowPlayer from "./ShowPlayer";
import ShowLoading from "./ShowLoading";
const PlayerCard = () => {
  const location = useLocation();
  const { info, dataByYear } = location.state;

  const [showPlayer, setShowPlayer] = React.useState(false);
  const [currentPlayerData, setCurrentPlayerData] = React.useState([]);
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await CallApi(info);

      setCurrentPlayerData([response]);
      setShowPlayer(true);
    }
    fetchMyAPI();
  }, [info]);

  return (
    <div className="h-screen">
      {showPlayer ? (
        <ShowPlayer
          currentPlayerData={currentPlayerData}
          dataByYear={dataByYear}
        />
      ) : (
        <ShowLoading />
      )}
    </div>
  );
};

export default PlayerCard;
