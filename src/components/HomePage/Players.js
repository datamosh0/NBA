import { useEffect } from "react";
import { Link } from "react-router-dom";
import teamIds from "../../util/JSONdata/teamIds";
import "../style.css";

const Players = ({ playerInfo, dataByYear }) => {
  useEffect(function setupListener() {
    const handleReload = () => {
      sessionStorage.removeItem("lastSearch");
      localStorage.removeItem("selected");
    };
    window.addEventListener("beforeunload", handleReload);

    return function removeEvent() {
      window.removeEventListener("beforeunload", handleReload);
    };
  });

  return (
    <div
      className="flex flex-col items-center mb-10 mr-3 ml-3 md:mr-12 md:ml-12 bg-white"
      style={{ boxShadow: "3px 2px 10px 2px  rgba(0,0,0,0.41)" }}
    >
      <div className=" w-full ">
        <div className=" p-6 grid grid-cols-5 place-items-center bg-slate-200 md:grid-cols-8">
          <div className="col-span-2">Player</div>
          <div className="pr-4">Team</div>
          <div>Number</div>
          <div className="ml-2">Position</div>

          <div className="hidden md:flex justify-center ml-3">
            <div>Height</div>
            <div className="ml-2"> Weight</div>
          </div>

          <div className="hidden md:block">College</div>
          <div className="hidden md:block">Country</div>
        </div>

        {playerInfo.map((info) => {
          let name = info.firstName + " " + info.lastName;
          if (info.teams.length === 0) return null;
          let teamId = info.teams.slice(-1)[0].teamId;
          let teamAbbreviation;
          for (const IDNumber in teamIds) {
            if (IDNumber === teamId) teamAbbreviation = teamIds[IDNumber];
          }

          if (!info.teamSitesOnly) return null;
          let position = info.teamSitesOnly.posFull;
          let weight = info.weightPounds;
          let height = info.heightFeet + "'" + info.heightInches;
          let college = info.collegeName;
          let country = info.country;
          if (country === "") country = "USA";
          let number = info.jersey;
          let id = info.personId;

          let imgSrc = `https://cdn.nba.com/headshots/nba/latest/1040x760/${id}.png`;
          let yearParam = localStorage.getItem("selected");
          return (
            <Link
              to={{ pathname: `/player/${yearParam}/${id}/` }}
              state={{
                info: info,
                dataByYear: dataByYear,
                pageID: "PlayerPage",
              }}
              key={name}
              className="no-underline"
            >
              <div className="playerDiv py-4  text-black border-slate-200 border-b-2 grid grid-cols-5 place-items-center md:grid-cols-8">
                <img
                  className=" w-12 h-12 rounded-full  m-y-auto bg-slate-200 object-cover"
                  src={imgSrc}
                  alt="img not
                  available"
                />

                <div>{name}</div>

                <div>{teamAbbreviation}</div>
                <div>{number}</div>
                <div className="ml-2">{position}</div>
                <div className="hidden md:flex">
                  <div>{height}</div>
                  <div className="ml-2">{weight ? weight : "--"}</div>
                </div>

                <div className="hidden md:block">{college}</div>
                <div className="hidden md:block">{country}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Players;
