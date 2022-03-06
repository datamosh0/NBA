import React from "react";
import { useLocation } from "react-router-dom";
import TeamColors from "./TeamColors";
import { RiArrowDownSFill } from "react-icons/ri";

const PlayerCard = () => {
  const location = useLocation();
  const { info } = location.state;
  console.log(info);

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

  let name = info.first_name + " " + info.last_name;
  let teamFullName = info.team.full_name;
  if (!info.teamSitesOnly) return null;
  let position = info.teamSitesOnly.posFull;
  let ppg = Math.round(info.pts * 10) / 10;
  let rpg = Math.round(info.reb * 10) / 10;
  let apg = Math.round(info.ast * 10) / 10;
  let ft_pct = (info.ft_pct * 100).toString().substring(0, 2);
  let weight = info.weightPounds;
  let weightKg = info.weightKilograms;
  let height = info.heightFeet + "'" + info.heightInches;
  let heightMeters = info.heightMeters;
  let college = info.collegeName;
  let country = info.country;
  if (country === "") country = "USA";
  let number = info.jersey;
  let experience = info.yearsPro;

  let exp;
  if (experience !== "0") {
    exp = <div>{experience} years</div>;
  } else {
    exp = <div>Rookie</div>;
  }
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
  let teamName = info.team.name;
  let current = TeamColors[teamName];
  let id = info.personId;
  let teamId = info.teamId;
  let draft =
    info.draft.seasonYear +
    " R" +
    info.draft.roundNum +
    " Pick " +
    info.draft.pickNum;
  let teamImgSrc = `https://cdn.nba.com/logos/nba/${teamId}/primary/L/logo.svg`;
  let imgSrc = `https://cdn.nba.com/headshots/nba/latest/1040x760/${id}.png`;

  return (
    <div className=" h-screen">
      <div className="h-auto" style={{ background: current }}>
        <div className="ml-3 flex">
          <div>
            <img
              src={`${teamImgSrc}`}
              alt=""
              className="absolute opacity-10 h-80 pb-28 z-0"
            />
            <img src={`${teamImgSrc}`} alt="team" className="h-28 pt-11"></img>
            <img src={`${imgSrc}`} alt="player" className="relative h-28"></img>
          </div>
          <div className="flex flex-col justify-center text-white">
            <div className="text-xs">
              {teamFullName} | #{number} | {position}
            </div>
            <div className="text-2xl">{name}</div>
            <div></div>
          </div>
        </div>
        <div className="text-white border-y-slate-800 border-y">
          <div className="playerInfo grid grid-cols-12 grid-rows-2 text-center h-auto mt-3 justify-items-center items-center">
            <div className="col-span-2 col-start-3">
              <div>PPG</div>
              <div className="font-bold text-2xl">{ppg}</div>
            </div>
            <div className="col-span-2">
              <div>RPG</div>
              <div className="font-bold text-2xl">{rpg}</div>
            </div>
            <div className="col-span-2">
              <div>APG</div>
              <div className="font-bold text-2xl">{apg}</div>
            </div>
            <div className="col-span-2">
              <div>FT</div>
              <div className="font-bold text-2xl">{ft_pct}%</div>
            </div>
            <div className=" col-span-5 row-start-2 col-start-2">
              {height}" | {weight}lb | {age} years
            </div>
            <div
              className="col-start-7 col-span-5 flex items-center"
              onClick={showMore}
            >
              Player Details <RiArrowDownSFill className="transition icon" />
            </div>
            <div className="hidden ">
              <div>HEIGHT</div>
              <div>
                {height}" ({heightMeters}m)
              </div>
            </div>
            <div className="hidden">
              <div>AGE</div>
              <div>{age} years</div>
            </div>
            <div className="hidden">
              <div>WEIGHT</div>
              <div>
                {weight} ({weightKg}kg)
              </div>
            </div>
            <div className="row-start-3 col-start-2 col-span-5 hidden onShowMore">
              <div>BIRTHDAY</div>
              <div>{bdayString}</div>
            </div>
            <div className="row-start-3 col-start-7 col-span-5 hidden onShowMore">
              <div>COUNTRY</div>
              <div>{country}</div>
            </div>
            <div className="row-start-4 col-start-7 col-span-5 hidden onShowMore">
              <div>DRAFT</div>
              <div>{draft} </div>
            </div>
            <div className="row-start-4 col-start-2 col-span-5 hidden onShowMore">
              <div>LAST ATTENDED</div>
              <div>{college}</div>
            </div>
            <div className="row-start-5 col-start-6 col-span-2 hidden onShowMore">
              <div>EXPERIENCE</div>
              {exp}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
