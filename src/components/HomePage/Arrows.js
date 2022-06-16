import { HiArrowSmRight, HiArrowSmLeft } from "react-icons/hi";

const Arrows = ({ setPlayerInfo, dataByYear, setPlayerIndex, playerIndex }) => {
  const scrollRight = () => {
    setPlayerIndex(Math.min(playerIndex + 50, dataByYear.length));
    let playersToLoad = [];
    for (
      let i = Math.min(playerIndex, dataByYear.length - 50);
      i < Math.min(playerIndex + 50, dataByYear.length);
      i++
    ) {
      playersToLoad.push(dataByYear[i]);
    }
    setPlayerInfo(playersToLoad);
  };

  const scrollLeft = () => {
    if (playerIndex <= 50) return;
    setPlayerIndex(playerIndex - 50);
    let playersToLoad = [];
    for (let i = Math.max(playerIndex - 100, 0); i < playerIndex - 50; i++) {
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
