import { useEffect } from "react";
import teamColors from "../../util/JSONdata/teamColors";
import { RiArrowDownSFill } from "react-icons/ri";
import ShowPlayerMore from "./ShowPlayerMore";
import { HiArrowSmLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import teamIds from "../../util/JSONdata/teamIds";
import "../style.css";

const ShowPlayer = ({ info, dataByYear }) => {
  const showMore = () => {
    let icon = document.querySelector(".icon");
    let grid = document.querySelector(".playerInfo");
    let onShowMore = document.querySelectorAll(".onShowMore");
    if (!icon.style.transform) {
      icon.style.transform = "rotateZ(180deg)";
      grid.classList.remove("grid-rows-2");
      grid.classList.add("grid-rows-5");
      onShowMore.forEach((el) => {
        el.classList.remove("hidden");
      });
    } else {
      icon.style.transform = "";
      grid.classList.add("grid-rows-2");
      grid.classList.remove("grid-rows-5");
      onShowMore.forEach((el) => {
        el.classList.add("hidden");
      });
    }
  };

  let playerFullName = info.first_name + " " + info.last_name;
  let teamFullName = info.team.full_name;
  let playerPosition = info.teamSitesOnly.posFull;
  let ppg = Math.round(info.pts * 10) / 10;
  let rpg = Math.round(info.reb * 10) / 10;
  let apg = Math.round(info.ast * 10) / 10;
  let ft_pct = (info.ft_pct * 100).toString().substring(0, 2);
  let weight = info.weightPounds;
  let weightKg = info.weightKilograms;
  let height = info.heightFeet + "'" + info.heightInches;
  let heightM = info.heightMeters;
  let college = info.collegeName;
  let country = info.country;
  let number = info.jersey;
  let experience = info.yearsPro;
  let noExperienceBool = false;
  let birthdate = info.dateOfBirthUTC;
  let birthYear = birthdate.split("-")[0];
  let birthMonth = birthdate.split("-")[1];
  let birthDay = birthdate.split("-")[2];
  let bdayString = new Date(birthYear, birthMonth, birthDay)
    .toDateString()
    .substring(4);
  let jsBirthdate = new Date(birthYear, birthMonth, birthDay);
  let today = new Date();
  let age = parseInt((today - jsBirthdate) / (1000 * 60 * 60 * 24) / 365);
  let id = info.personId;
  let teamId = info.teamId;
  let draft =
    info.draft.seasonYear +
    " R" +
    info.draft.roundNum +
    " Pick " +
    info.draft.pickNum;
  let teamImgSrc = `https://cdn.nba.com/logos/nba/${teamId}/primary/L/logo.svg`;
  let imgSrc = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${id}.png`;
  let currentTeamColor;
  const getTeamColor = () => {
    let yearInt = localStorage.getItem("selected");
    let teamData = sessionStorage.getItem("teamData");
    let teamId;
    info.teams.forEach((team) => {
      if (yearInt >= team.seasonStart && yearInt <= team.seasonEnd) {
        teamId = team.teamId;
      }
    });

    let teamAbbreviation;
    for (let team in teamIds) {
      if (teamId === team) teamAbbreviation = teamIds[team];
    }
    let team;
    JSON.parse(teamData).data.forEach((el) => {
      if (el.abbreviation === teamAbbreviation) team = el;
    });

    currentTeamColor = teamColors[team.name];
  };
  getTeamColor();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, [info]);
  if (!info.teamSitesOnly) return null;
  if (country === "") country = "USA";
  if (parseInt(experience) === 0) {
    noExperienceBool = true;
  }

  return (
    <div>
      <div className="h-auto  " style={{ background: currentTeamColor }}>
        <div className="absolute z-100 left-5 top-3 cursor-pointer ">
          <Link to={{ pathname: "/" }}>
            <div className="tooltip ">
              <HiArrowSmLeft color="white" size={30} />
              <div className="tooltiptext">Home</div>
            </div>
          </Link>
        </div>
        <div className="ml-4 flex md:ml-10 ">
          <div>
            <img
              src={`${teamImgSrc}`}
              alt=""
              className="absolute opacity-10 h-96 pb-28 z-0 pointer-events-none md:pb-0"
            />
            <img
              src={`${teamImgSrc}`}
              alt="team"
              className="h-32 md:h-40  pt-11 relative "
            ></img>
            <img
              src={`${imgSrc}`}
              alt="img unavailable"
              className="relative w-80 md:h-56  "
            ></img>
          </div>
          <div className="flex flex-col justify-center text-white ">
            <div className="text-md md:text-base">
              {teamFullName} | #{number} | {playerPosition}
            </div>
            <div className="text-2xl md:text-4xl font-bold flex w-12">
              {playerFullName}
            </div>
          </div>

          <div className=" m-auto pr-2 flex justify-center">
            <Link
              to={{ pathname: `/compare/${info.season}/` }}
              state={{
                info: info,
                dataByYear: dataByYear,
                pageID: "ComparePage",
              }}
            >
              <button className=" text-md md:text-xl text-white bg p-2 md:p-3 rounded-full compareButton ">
                Compare Players
              </button>
            </Link>
          </div>
        </div>

        <div className="text-white border-y-slate-800 border-y">
          <div className="playerInfo grid grid-cols-12 grid-rows-2 md:grid-rows-2 text-center h-auto  justify-center items-center m-3 ">
            <div className="col-span-2 col-start-3 md:col-span-1 md:col-start-1 md:row-span-2 ">
              <div>PPG</div>
              <div className="font-bold text-2xl">{ppg}</div>
            </div>
            <div className="col-span-2 md:col-span-1 md:row-span-2">
              <div>RPG</div>
              <div className="font-bold text-2xl">{rpg}</div>
            </div>
            <div className="col-span-2 md:col-span-1  md:row-span-2">
              <div>APG</div>
              <div className="font-bold text-2xl">{apg}</div>
            </div>
            <div className="col-span-2 md:col-span-1  md:row-span-2">
              <div>FT</div>
              <div className="font-bold text-2xl">{ft_pct}%</div>
            </div>
            <div className=" col-span-5 row-start-2 col-start-2 md:hidden">
              {height}" | {weight}lb | {age} years
            </div>
            <div
              className="col-start-7 col-span-5 flex justify-center items-center cursor-pointer md:hidden "
              onClick={showMore}
            >
              Player Details <RiArrowDownSFill className="transition icon" />
            </div>
            <div className="hidden md:block  md:col-start-5 md:col-span-2 md:row-start-1 ">
              <div>HEIGHT</div>
              <div>
                {height}" ({heightM}m)
              </div>
            </div>
            <div className="hidden md:block col-span-5 col-start-7  md:col-start-7 md:col-span-2 md:row-start-1">
              <div>WEIGHT</div>
              <div>
                {weight} ({weightKg}kg)
              </div>
            </div>
            <div className="hidden md:block col-span-5 col-start-2 row-start-5 md:col-start-5 md:col-span-2 md:row-start-2">
              <div>AGE</div>
              <div>{age} years</div>
            </div>
            <div className="row-start-3 col-start-2 col-span-5 hidden onShowMore md:block md:col-start-7 md:col-span-2 md:row-start-2">
              <div>BIRTHDAY</div>
              <div>{bdayString}</div>
            </div>

            <div className="row-start-3 col-start-7 col-span-5 hidden onShowMore md:block  md:col-start-9 md:col-span-2 md:row-start-1">
              <div>COUNTRY</div>
              <div>{country}</div>
            </div>
            <div className="row-start-4 col-start-7 col-span-5 hidden onShowMore md:block  md:col-start-9 md:col-span-2 md:row-start-2">
              <div>DRAFT</div>
              <div>{draft} </div>
            </div>
            <div className="row-start-4 col-start-2 col-span-5 hidden onShowMore md:block md:col-start-11 md:col-span-2 md:row-start-1">
              <div>LAST ATTENDED</div>
              <div>{college}</div>
            </div>
            <div className="row-start-5 col-start-6 col-span-2 hidden onShowMore md:block md:col-start-11 md:col-span-2 md:row-start-2">
              <div>EXPERIENCE</div>
              {noExperienceBool ? "Rookie" : experience + " Years"}
            </div>
          </div>
        </div>
      </div>
      <ShowPlayerMore info={info} dataByYear={dataByYear} />
    </div>
  );
};

export default ShowPlayer;
