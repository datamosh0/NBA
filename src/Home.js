import React, { useState, useEffect } from "react";
import Players from "./Players";
import data2021 from "./data2021";
import axios from "axios";
import first5 from "./first5";

const Home = () => {
  const [playerInfo, setPlayerInfo] = useState([]);
  const [showPlayer, setShowPlayer] = useState(false);
  const [input, setInput] = useState("");

  const playersSearchUrl = "https://www.balldontlie.io/api/v1/players?search=";
  const avgsUrl =
    "https://www.balldontlie.io/api/v1/season_averages?player_ids[]=";
  const teamUrl = "https://www.balldontlie.io/api/v1/teams/";
  const getImgId = (first, last) => {
    let data = data2021.league;
    let nbaData = [];
    data.forEach((person) => {
      if (person.firstName === first && person.lastName === last) {
        nbaData.push(person);
      }
    });
    return nbaData;
  };

  const filterArr = (nbaData) => {
    let formattedArr = [];
    nbaData.forEach((person) => {
      if (person.length === 0) return;
      formattedArr.push(person[0]);
    });
    return formattedArr;
  };

  const getPlayerId = () => {
    let url = playersSearchUrl + input;
    let response = apiCall(url);

    Promise.resolve(response).then((value) => {
      let playerDatas = [...value.data];
      let nbaData = [];
      playerDatas.forEach((playerData) => {
        let res = getImgId(playerData.first_name, playerData.last_name);
        nbaData.push(res);
      });
      let filteredArr = filterArr(nbaData);
      getPlayerStats(playerDatas, filteredArr);
    });
  };
  const getPlayerStats = async (playerDatas, filteredArr) => {
    let promises = Promise.all(
      playerDatas.map(async (playerData) => {
        const playerAvgs = await apiCall(avgsUrl + playerData.id);

        return playerAvgs.data;
      })
    );
    Promise.resolve(promises).then((value) => {
      let playerAvgs = [];
      value.forEach((avgs, index) => {
        if (avgs[0] === undefined) {
          playerDatas.splice(index, 1);
          return;
        }
        playerAvgs.push(avgs[0]);
      });

      let players = [];
      playerDatas.forEach((_, index) => {
        let player = [
          playerDatas[index],
          playerAvgs[index],
          filteredArr[index],
        ];
        let merged = Object.assign.apply(Object, player);
        players.push(merged);
      });
      setPlayerInfo(players);
      setShowPlayer(true);
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (input === "") return;
    getPlayerId();
  };

  const apiCall = async (url) => {
    return axios
      .get(url)
      .then((response) => response.data)
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // let first50 = [];
    // let first50NamesForSearch = [];
    // for (let i = 0; i < 5; i++) {
    //   let name =
    //     data2021.league[i].firstName + " " + data2021.league[i].lastName;
    //   first50NamesForSearch.push(name);
    // }
    // for (let i = 0; i < 5; i++) {
    //   first50.push(data2021.league[i]);
    // }
    // let promises = Promise.all(
    //   first50NamesForSearch.map(async (playerName) => {
    //     const player = await apiCall(playersSearchUrl + playerName);
    //     return player.data;
    //   })
    // );
    // Promise.resolve(promises).then((value) => {
    //   let promises2 = Promise.all(
    //     value.map(async (player) => {
    //       const playerInfo = await apiCall(avgsUrl + player[0].id);
    //       const teamInfo = await apiCall(teamUrl + player[0].team.id);
    //       let infoArr = [playerInfo.data[0], teamInfo];
    //       let merged = Object.assign.apply(Object, infoArr);
    //       return playerInfo.data;
    //     })
    //   );
    //   Promise.resolve(promises2).then((value2) => {
    //     let players = [];
    //     value.forEach((_, index) => {
    //       let player = [...value[index], ...value2[index], first50[index]];
    //       let merged = Object.assign.apply(Object, player);
    //       players.push(merged);
    //     });
    // setPlayerInfo(players);
    // setShowPlayer(true);
    //   });
    // });
    setPlayerInfo(first5);

    setShowPlayer(true);
  }, []);

  return (
    <main className="w-full">
      <form
        onSubmit={handleClick}
        className="flex flex-col justify-center items-center"
      >
        <h1 className="text-2xl font-bold underline">
          Enter Current NBA Player's Name
        </h1>
        <div>
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            className="border-2 border-gray-800"
          />
          <button
            type="submit"
            className="border-2 border-gray-800 outline-none"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="flex flex-col items-center">
        {showPlayer ? <Players playerInfo={playerInfo} /> : ""}
      </div>
    </main>
  );
};

export default Home;
