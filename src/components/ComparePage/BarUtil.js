import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import maxStatValues from "../../util/ComparePage/maxStatValues";

const BarUtil = ({ stats, isPlayerOne }) => {
  let playerValue = stats[1];
  let maxValue;
  for (const value in maxStatValues) {
    if (value === stats[0]) maxValue = maxStatValues[value];
  }
  let playerAvg = (playerValue / maxValue) * 120;

  return (
    <div className="my-2">
      {isPlayerOne ? (
        <div>
          <div className="flex justify-end">
            <div className="font-semibold text-xl"> {playerValue}</div>
          </div>
          <ProgressBar
            now={playerAvg}
            style={{
              height: 28,
              transform: "scale(-1, 1)",
              backgroundColor: "#e5e7eb",
            }}
            className="here"
          />
        </div>
      ) : (
        <div>
          <div className="flex justify-start">
            <div className="font-semibold text-xl"> {playerValue}</div>
          </div>
          <ProgressBar
            now={playerAvg}
            style={{ height: 28, backgroundColor: "#e5e7eb" }}
            className="here"
          />
        </div>
      )}
    </div>
  );
};

export default BarUtil;
