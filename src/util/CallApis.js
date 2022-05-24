// import axiosCall from "./axiosCall";

// const playersSearchUrl = "https://www.balldontlie.io/api/v1/players?search=";
// const avgsUrl =
//   "https://www.balldontlie.io/api/v1/season_averages?player_ids[]=";

// const CallApis = (dataArr, namesForSearch, setPlayerInfo) => {
//   let players = [];
//   let promises = Promise.all(
//     namesForSearch.map(async (playerName) => {
//       const player = await axiosCall(playersSearchUrl + playerName);
//       return player.data;
//     })
//   );
//   Promise.resolve(promises).then((value) => {
//     let promises2 = Promise.all(
//       value.map(async (player) => {
//         let selectedStr = localStorage.getItem("selected");
//         const playerInfo = await axiosCall(
//           avgsUrl + player[0].id + "&season=" + selectedStr
//         );
//         return playerInfo.data;
//       })
//     );
//     Promise.resolve(promises2).then((value2) => {
//       value.forEach((_, index) => {
//         let player = [...value[index], value2[index], dataArr[index]];
//         let merged = Object.assign.apply(Object, player);
//         players.push(merged);
//       });
//       sessionStorage.setItem("lastSearch", JSON.stringify(players));
//       setPlayerInfo([...players]);
//     });
//   });
// };

// export default CallApis;

//I phased this code out but didnt want to delete it
