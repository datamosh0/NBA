import React from "react";
import { Link } from "react-router-dom";

const Players = ({ playerInfo }) => {
  return (
    <div className="mt-2 w-11/12">
      <div className=" p-6 grid grid-cols-5 text-center bg-slate-200">
        <div className="col-span-2">Player</div>
        <div className="pr-4">Team</div>
        <div>Number</div>
        <div className="ml-2">Position</div>

        <div className="hidden">
          <div>Height</div>
          <div className="ml-2">Weight</div>
        </div>

        <div className="hidden">College</div>
        <div className="hidden">Country</div>
      </div>

      {playerInfo.map((info) => {
        let name = info.first_name + " " + info.last_name;
        let team = info.team.abbreviation;
        let teamFullName = info.team.full_name;
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
        return (
          <div
            key={name}
            className=" py-4 border-slate-200 border-b-2 grid grid-cols-5 place-items-center"
          >
            <img
              className=" w-12 h-12 rounded-full  m-y-auto bg-slate-200"
              src={`${imgSrc}`}
              alt="player"
            />

            <Link to={{ pathname: `/player/${name}/` }} state={{ info: info }}>
              {name}
            </Link>
            <Link
              to={{ pathname: `/team/${teamFullName}/` }}
              state={{ info: info }}
            >
              {team}
            </Link>

            <div>{number}</div>
            <div className="ml-2">{position}</div>
            <div className="hidden">
              <div>{height}</div>
              <div className="ml-2">{weight ? weight : "--"}</div>
            </div>

            <div className="hidden">{college}</div>
            <div className="hidden">{country}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Players;
