import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ComparePage from "./ComparePage/ComparePage";
import PlayerPage from "./PlayerPage/PlayerPage";

const PrivateCompareRoute = () => {
  let info = undefined;
  let dataByYear = undefined;
  let pageID = undefined;
  try {
    const location = useLocation();
    info = location.state.info;
    dataByYear = location.state.dataByYear;
    pageID = location.state.pageID;
  } catch (error) {}
  let component;
  if (pageID === "PlayerPage")
    component = <PlayerPage info={info} dataByYear={dataByYear} />;
  else if (pageID === "ComparePage")
    component = <ComparePage info={info} linkedDataByYear={dataByYear} />;

  return info ? component : <Navigate to="/" />;
};

export default PrivateCompareRoute;
