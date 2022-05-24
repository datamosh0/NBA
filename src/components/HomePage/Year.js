import React from "react";
import axiosCall from "../../util/axiosCall";

import { FiRefreshCcw } from "react-icons/fi";
import Arrows from "./Arrows";
const Year = ({
  setDataByYear,
  setPlayerInfo,
  setPlayerIndex,
  setPageIndex,
  dataByYear,
  playerIndex,
  pageIndex,
}) => {
  let yearUrl = "https://data.nba.net/data/10s/prod/v1/";

  const handleClick = () => {
    window.location.reload(false);
  };
  const handleChange = (e) => {
    e.preventDefault();
    let yearStr = e.target.value;
    callLogic(yearStr);
  };

  const callLogic = async (yearStr) => {
    //call data
    let url = yearUrl + yearStr + "/players.json";
    let data = await axiosCall(url);
    let dataByYear = data.league.standard;
    setDataByYear(dataByYear);
    localStorage.setItem("selected", yearStr);

    //set data
    let first50 = [];
    for (let i = 0; i < 50; i++) first50.push(dataByYear[i]);
    setPlayerInfo(first50);
    setPlayerIndex(50);
    setPageIndex(0);
  };

  return (
    <section className="p-2 justify-center flex w-full">
      <div className="w-11/12 flex justify-between items-center ">
        <button onClick={handleClick}>
          <FiRefreshCcw size={28} />
        </button>
        <div className="flex flex-col text-gray-800 ">
          Select Year
          <select
            className="bg-gray-200 p-2 rounded-md text-xl font-bold"
            onChange={handleChange}
            id="select"
          >
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2018">2018</option>
          </select>
        </div>
        <Arrows
          setPlayerInfo={setPlayerInfo}
          setPlayerIndex={setPlayerIndex}
          setPageIndex={setPageIndex}
          dataByYear={dataByYear}
          playerIndex={playerIndex}
          pageIndex={pageIndex}
        />
      </div>
    </section>
  );
};

export default Year;
