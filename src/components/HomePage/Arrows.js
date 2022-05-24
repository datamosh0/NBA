import React from "react";
import { HiArrowSmRight, HiArrowSmLeft } from "react-icons/hi";

const Arrows = ({
  setPlayerInfo,
  dataByYear,
  setPageIndex,
  setPlayerIndex,
  playerIndex,
  pageIndex,
}) => {
  const scrollRight = () => {
    setPlayerIndex(playerIndex + 50);
    setPageIndex(pageIndex + 1);
    let playersToLoad = [];
    for (let i = playerIndex; i < 50 + playerIndex; i++) {
      playersToLoad.push(dataByYear[i]);
    }
    setPlayerInfo(playersToLoad);
  };
  const scrollLeft = () => {
    if (pageIndex === 0) return;
    setPlayerIndex(playerIndex - 50);
    setPageIndex(pageIndex - 1);
    let playersToLoad = [];
    for (let i = playerIndex - 100; i < playerIndex - 50; i++) {
      playersToLoad.push(dataByYear[i]);
    }
    setPlayerInfo(playersToLoad);
  };

  return (
    <section className="flex justify-center ">
      <HiArrowSmLeft
        size={36}
        onClick={scrollLeft}
        style={{ cursor: "pointer" }}
      />
      <HiArrowSmRight
        size={36}
        onClick={scrollRight}
        style={{ cursor: "pointer" }}
      />
    </section>
  );
};

export default Arrows;
