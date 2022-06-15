import { useEffect, useState } from "react";
import { HiArrowSmLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import "../style.css";
import StatsCompare from "./StatsCompare";
import PickPlayer from "./PickPlayer";
import Menu from "./Menu";
import { AiOutlineRollback } from "react-icons/ai";

const ComparePage = ({ info, linkedDataByYear }) => {
  const [dataByYear, setDataByYear] = useState(linkedDataByYear);
  const [search, setSearch] = useState(" ");
  const [showSearch, setShowSearch] = useState(false);
  const [changeFirstPlayer, setChangeFirstPlayer] = useState(false);
  const [changeSecondPlayer, setChangeSecondPlayer] = useState(true);
  const [playerOneInfo, setPlayerOneInfo] = useState(info);
  const [playerTwoInfo, setPlayerTwoInfo] = useState(info);
  const [firstLoad, setFirstLoad] = useState(true);
  const [showCompare, setShowCompare] = useState(false);
  const playerOneDisplay = [
    playerOneInfo.jersey,
    playerOneInfo.first_name + " " + playerOneInfo.last_name,
    playerOneInfo.teamSitesOnly.posFull + "/" + playerOneInfo.team.name,
  ];
  const playerTwoDisplay = [
    playerTwoInfo.jersey,
    playerTwoInfo.first_name + " " + playerTwoInfo.last_name,
    playerTwoInfo.teamSitesOnly.posFull + "/" + playerTwoInfo.team.name,
  ];
  const [playerOneObj, setPlayerOneObj] = useState({});
  const [playerTwoObj, setPlayerTwoObj] = useState({});
  const [comparisonObj, setComparisonObj] = useState({});
  const [showStatsObj, setShowStatsObj] = useState({
    MIN: false,
    FGM: false,
    FGA: false,
    FGP: false,
    FG3M: false,
    FG3A: false,
    FG3P: false,
    OREB: false,
    DREB: false,
    REB: true,
    AST: true,
    STL: true,
    BLK: true,
    TOV: false,
    PF: true,
    PTS: false,
  });
  const [changeStatObj, setChangeStatObj] = useState(true);
  useEffect(() => {
    setShowCompare(false);
    if (!changeFirstPlayer && !changeSecondPlayer) {
      setPlayerOneObj(utilObjFunc(playerOneInfo));
      setPlayerTwoObj(utilObjFunc(playerTwoInfo));
      setComparisonObj(
        utilObjComparison(
          utilObjFunc(playerOneInfo),
          utilObjFunc(playerTwoInfo)
        )
      );
      setShowCompare(true);
    } else setShowCompare(false);
  }, [playerOneInfo, playerTwoInfo, changeFirstPlayer, changeSecondPlayer]);

  useEffect(() => {
    setShowStatsObj({ ...showStatsObj });
  }, [changeStatObj, showStatsObj]);

  const utilObjFunc = (info) => {
    let infoObj = {
      MIN: parseFloat(info.min.replace(":", ".")),
      FGM: info.fgm,
      FGA: info.fga,
      FGP: info.fg_pct,
      FG3M: info.fg3m,
      FG3A: info.fg3a,
      FG3P: info.fg3_pct,
      OREB: info.oreb,
      DREB: info.dreb,
      REB: info.reb,
      AST: info.ast,
      STL: info.stl,
      BLK: info.blk,
      TOV: info.turnover,
      PF: info.pf,
      PTS: info.pts,
    };
    return infoObj;
  };
  const utilObjComparison = (p1, p2) => {
    const isPlayerOneMoreObj = {};
    for (const value in p1) {
      if (p1[value] >= p2[value]) {
        isPlayerOneMoreObj[value] = true;
      } else {
        isPlayerOneMoreObj[value] = false;
      }
    }
    return isPlayerOneMoreObj;
  };

  const handleInput = (event) => {
    event.preventDefault();

    let input = event.target.value.toLowerCase();
    let result = dataByYear.filter(
      (player) =>
        player.firstName.toLowerCase().includes(input) ||
        player.lastName.toLowerCase().includes(input)
    );
    let result30 = [];
    result.forEach((playerInfo, index) => {
      if (index < 30) {
        result30.push(playerInfo);
      }
    });
    setSearch(result30);
    setShowSearch(true);
    if (input === "") setShowSearch(false);
  };

  let imgSrc = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerOneInfo.personId}.png`;
  let imgSrc2 = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerTwoInfo.personId}.png`;

  return (
    <div className="h-full pt-12" style={{ background: "#e5e7eb" }}>
      <div className="absolute z-100 left-5 top-3 cursor-pointer ">
        <Link to={{ pathname: "/" }}>
          <div className="tooltip ">
            <HiArrowSmLeft color="black" size={30} />
            <div className="tooltiptext">Home</div>
          </div>
        </Link>
      </div>
      <h2 className="ml-3 md:ml-12 my-3">Compare {info.season} stats</h2>
      <div className=" flex flex-col margin md:mx-12 ">
        <div
          style={{
            boxShadow: "3px 2px 5px 2px  rgba(0,0,0,0.41)",
          }}
        >
          <div className="grid grid-cols-2 ">
            <div className="bg-white ">
              {changeFirstPlayer ? (
                <div className="pt-20 flex flex-col items-center justify-between h-full">
                  <AiOutlineRollback
                    size={40}
                    className=" cursor-pointer"
                    onClick={() => setChangeFirstPlayer(false)}
                  />
                  <div className="bg-white flex justify-center items-end h-full ">
                    <h2>Enter a Player</h2>
                  </div>
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => {
                      setShowSearch(false);
                      setChangeFirstPlayer(true);
                    }}
                    className="bg-gray-400 rounded m-2 p-2 text-black cursor-pointer"
                  >
                    Change
                  </button>
                  <div className="flex justify-center ">
                    <img alt="" src={imgSrc} className=" md:w-80 "></img>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-white ">
              {changeSecondPlayer ? (
                <div className="pt-20 flex flex-col items-center justify-between h-full">
                  {!firstLoad && (
                    <AiOutlineRollback
                      size={40}
                      className=" cursor-pointer"
                      onClick={() => setChangeSecondPlayer(false)}
                    />
                  )}

                  <div className="flex justify-center items-end h-full">
                    <h2>Enter a Player</h2>
                  </div>
                </div>
              ) : (
                <div className=" w-full ">
                  <button
                    onClick={() => {
                      setShowSearch(false);
                      setChangeSecondPlayer(true);
                    }}
                    className="bg-gray-400 rounded m-2 p-2  float-right text-black cursor-pointer"
                  >
                    Change
                  </button>
                  <div className="flex justify-center items-end h-full w-full">
                    <img alt="" src={imgSrc2} className=" md:w-80 "></img>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 compareGrid text-white font-bold  h-24">
              <div className="flex h-full ">
                {changeFirstPlayer ? (
                  <div
                    style={{ background: "var(--colorTwo) " }}
                    className="w-full flex justify-center items-center"
                  >
                    <form className="flex flex-col justify-center items-center">
                      <div>
                        <input
                          type="text"
                          onChange={(event) => handleInput(event, true)}
                          className="border-2 border-gray-800 my-2 p-1 rounded text-black font-semibold w-36"
                        />
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="w-full flex">
                    <div
                      style={{ background: "var(--colorOne)" }}
                      className="flex items-center justify-center text-xl md:text-3xl w-10  md:w-20"
                    >
                      #{playerOneDisplay[0]}
                    </div>
                    <div
                      style={{ background: "var(--colorTwo)" }}
                      className="w-full flex flex-col  p-2 items-start sm:items-end  justify-center md:px-6 "
                    >
                      <div className="text-xl md:text-2xl">
                        {playerOneDisplay[1]}
                      </div>
                      <div className="text-xs md:text-md">
                        {playerOneDisplay[2]}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div
                className=" items-center justify-center text-md md:text-2xl hidden sm:flex"
                style={{ background: "var(--colorThree)" }}
              >
                VS
              </div>
              {changeSecondPlayer ? (
                <div
                  style={{ background: "var(--colorTwo) " }}
                  className="w-full flex justify-center items-center"
                >
                  <form className="flex flex-col justify-center items-center">
                    <div>
                      <input
                        type="text"
                        onChange={(event) => handleInput(event, true)}
                        className="border-2 border-gray-800 my-2 p-1 rounded text-black font-semibold w-36"
                      />
                    </div>
                  </form>
                </div>
              ) : (
                <div className=" w-full flex">
                  <div
                    style={{ background: "var(--colorTwo)" }}
                    className="w-full flex flex-col  p-2 items-start   justify-center md:px-6 "
                  >
                    <div className="text-xl md:text-2xl">
                      {playerTwoDisplay[1]}
                    </div>
                    <div className="text-xs md:text-md">
                      {playerTwoDisplay[2]}
                    </div>
                  </div>
                  <div
                    style={{ background: "var(--colorOne)" }}
                    className="flex items-center justify-center text-xl md:text-3xl w-10  md:w-20"
                  >
                    #{playerTwoDisplay[0]}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {showSearch && (
          <PickPlayer
            search={search}
            changeFirstPlayer={changeFirstPlayer}
            setChangeFirstPlayer={setChangeFirstPlayer}
            setChangeSecondPlayer={setChangeSecondPlayer}
            setPlayerOneInfo={setPlayerOneInfo}
            setPlayerTwoInfo={setPlayerTwoInfo}
            setShowSearch={setShowSearch}
            setFirstLoad={setFirstLoad}
          />
        )}
      </div>
      <div>
        {showCompare ? (
          <div className="ml-3 mr-3 md:ml-12 md:mr-12">
            <Menu
              showStatsObj={showStatsObj}
              setShowStatsObj={setShowStatsObj}
              changeStatObj={changeStatObj}
              setChangeStatObj={setChangeStatObj}
              dataByYear={dataByYear}
              setDataByYear={setDataByYear}
            />
            <StatsCompare
              playerOneObj={playerOneObj}
              playerTwoObj={playerTwoObj}
              comparisonObj={comparisonObj}
              showStatsObj={showStatsObj}
              setShowStatsObj={setShowStatsObj}
            />
          </div>
        ) : (
          <div style={{ minHeight: "70vh" }}></div>
        )}
      </div>
    </div>
  );
};

export default ComparePage;
