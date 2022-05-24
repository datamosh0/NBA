import React, { useState, useEffect } from "react";
import Players from "./components/HomePage/Players";
import Form from "./components/HomePage/Form";
import Arrows from "./components/HomePage/Arrows";
import Year from "./components/HomePage/Year";
import axiosCall from "./util/axiosCall";
import ShowLoading from "./components/PlayerPage/ShowLoading";
const Home = () => {
  const [playerInfo, setPlayerInfo] = useState([]);
  const [dataByYear, setDataByYear] = useState();
  const [playerIndex, setPlayerIndex] = useState(50);
  const [pageIndex, setPageIndex] = useState(0);
  const [loadingPlayers, setLoadingPlayers] = useState(true);
  useEffect(() => {
    let selectedStr = localStorage.getItem("selected");
    if (selectedStr) {
      let select = document.getElementById("select");
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === selectedStr) {
          select.options[i].setAttribute("selected", true);
        }
      }
    } else {
      localStorage.setItem("selected", "2021");
    }

    let first50 = [];
    let yearParam = localStorage.getItem("selected");
    const initLogic = async (yearParam) => {
      let yearUrl = `https://data.nba.net/data/10s/prod/v1/${yearParam}/players.json`;
      let data = await axiosCall(yearUrl);
      let dataByYear = data.league.standard;

      for (let i = 0; i < 50; i++) first50.push(dataByYear[i]);
      setDataByYear(dataByYear);
      setPlayerInfo(first50);
      setLoadingPlayers(false);
      let teamUrl = "https://www.balldontlie.io/api/v1/teams";
      let teamData = await axiosCall(teamUrl);
      sessionStorage.setItem("teamData", JSON.stringify(teamData));
    };
    initLogic(yearParam);
  }, []);

  return (
    <main className="w-full pb-10 bg-gray-200 min-h-screen">
      <Form setPlayerInfo={setPlayerInfo} dataByYear={dataByYear} />
      <Year
        setDataByYear={setDataByYear}
        setPlayerInfo={setPlayerInfo}
        setPlayerIndex={setPlayerIndex}
        setPageIndex={setPageIndex}
        dataByYear={dataByYear}
        playerIndex={playerIndex}
        pageIndex={pageIndex}
      />
      <div>
        {loadingPlayers ? (
          <ShowLoading />
        ) : (
          <Players playerInfo={playerInfo} dataByYear={dataByYear} />
        )}
      </div>

      <Arrows
        setPlayerInfo={setPlayerInfo}
        dataByYear={dataByYear}
        playerIndex={playerIndex}
        pageIndex={pageIndex}
        setPlayerIndex={setPlayerIndex}
        setPageIndex={setPageIndex}
      />
      <a href="#top" className="flex justify-center">
        Jump to top of page
      </a>
    </main>
  );
};

export default Home;
