import { useState } from "react";
import maxStatValues from "../../util/ComparePage/maxStatValues";
import glossary from "../../util/ComparePage/glossary";

const Menu = ({
  showStatsObj,
  setShowStatsObj,
  setChangeStatObj,
  changeStatObj,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);

  const handleStatClick = (event, selected = true) => {
    event.preventDefault();
    let tempStatsObj = showStatsObj;
    let clickedStat = event.target.innerText;
    for (const stat in tempStatsObj) {
      if (stat === clickedStat) tempStatsObj[stat] = !tempStatsObj[stat];
    }
    event.target.classList.toggle("selectedStat");
    setShowStatsObj(tempStatsObj);
    setChangeStatObj(!changeStatObj);
  };

  return (
    <div className="w-full flex flex-col items-center mt-4  md:grid md:grid-cols-2 md:gap-1 ">
      <div
        onClick={() => setShowFilters(!showFilters)}
        className="mb-1  hover:shadow-lg h-8 w-full bg-border flex items-center justify-center py-4 cursor-pointer "
      >
        Filters
      </div>
      <div
        onClick={() => setShowGlossary(!showGlossary)}
        className="mb-1  hover:shadow-lg h-8 w-full bg-border flex items-center justify-center py-4 cursor-pointer "
      >
        Glossary
      </div>

      <div className="md:col-span-3 w-full">
        {showFilters && (
          <div
            className="mt-6  bg-border-nohover w-full option md:col-span-3 grid grid-cols-4 h-full"
            style={{ boxShadow: "3px 2px 4px 2px  rgba(0,0,0,0.21)" }}
          >
            {Object.keys(maxStatValues).map((key, index) => {
              if (showStatsObj[key]) {
                return (
                  <div
                    onClick={handleStatClick}
                    key={index}
                    className="selectedStat p-1.5 px-2.5  cursor-pointer hover:shadow-md flex justify-center items-center hover-noborder"
                  >
                    {key}
                  </div>
                );
              } else {
                return (
                  <div
                    onClick={(event) => handleStatClick(event, false)}
                    key={index}
                    className="p-1.5 px-2.5  cursor-pointer hover:shadow-md  flex justify-center items-center hover-noborder"
                  >
                    {key}
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
      <div className="md:col-span-3">
        {showGlossary && (
          <div className="mt-6  bg-border-nohover w-full option grid grid-cols-4 ">
            {Object.entries(glossary).map((key) => {
              return (
                <div key={key[0]} className="m-3">
                  {key[0]} - {key[1]}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
