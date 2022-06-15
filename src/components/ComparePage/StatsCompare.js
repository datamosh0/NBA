import BarUtil from "./BarUtil";
import "../style.css";
const StatsCompare = ({
  playerOneObj,
  playerTwoObj,
  comparisonObj,
  showStatsObj,
}) => {
  return (
    <div className="h-full pb-20 mt-12" style={{ minHeight: "45vh" }}>
      <div className=" statsGrid w-full ">
        <div>
          {Object.entries(playerOneObj).map((key) => {
            if (!showStatsObj[key[0]]) return <></>;
            if (key[1] > playerTwoObj[key[0]]) {
              return (
                <div
                  key={key}
                  className="ml-1  md:ml-12 pr-2 border-r-4 border-gray-800"
                >
                  <BarUtil
                    stats={key}
                    isPlayerOne={true}
                    comparisonObj={comparisonObj}
                  />
                </div>
              );
            } else {
              return (
                <div key={key} className="ml-1  md:ml-12 pr-2">
                  <BarUtil
                    stats={key}
                    isPlayerOne={true}
                    comparisonObj={comparisonObj}
                  />
                </div>
              );
            }
          })}
        </div>
        <div className="flex items-center justify-center text-xl md:text-2xl  ">
          <div>
            {Object.keys(playerOneObj).map((key) => {
              if (!showStatsObj[key]) return <></>;
              return (
                <div
                  key={key}
                  className="h-16 py-1 flex justify-center items-center "
                >
                  {key}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          {Object.entries(playerTwoObj).map((key) => {
            if (!showStatsObj[key[0]]) return <></>;
            if (key[1] > playerOneObj[key[0]]) {
              return (
                <div
                  key={key}
                  className="mr-1 md:mr-12 pl-2 border-l-4 border-gray-800"
                >
                  <BarUtil
                    stats={key}
                    isPlayerOne={false}
                    comparisonObj={comparisonObj}
                  />
                </div>
              );
            } else {
              return (
                <div key={key} className="mr-1 md:mr-12 pl-2 ">
                  <BarUtil
                    stats={key}
                    isPlayerOne={false}
                    comparisonObj={comparisonObj}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default StatsCompare;
