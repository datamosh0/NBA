import { useEffect, useState } from "react";
import callApi from "../../util/CallApi";
import ShowPlayer from "./ShowPlayer";
import ShowLoading from "../ShowLoading";

const PlayerPage = ({ info, dataByYear }) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const [currentPlayerData, setCurrentPlayerData] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await callApi(info);

      setCurrentPlayerData(response);
      setShowPlayer(true);
    }
    fetchMyAPI();
  }, [info]);

  return (
    <div className="h-screen">
      {showPlayer ? (
        <ShowPlayer info={currentPlayerData} dataByYear={dataByYear} />
      ) : (
        <ShowLoading />
      )}
    </div>
  );
};

export default PlayerPage;
