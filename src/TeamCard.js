import React from "react";
import { useLocation } from "react-router-dom";
import TeamColors from "./TeamColors";
const TeamCard = () => {
  const location = useLocation();
  const { info } = location.state;
  console.log(info);
  let teamName = info.team.name;
  let current = TeamColors[teamName];
  let teamId = info.teamId;
  let searchTeamId = info.team.id;
  let conference = info.team.conference;
  let division = info.team.division;
  let fullName = info.team.full_name;
  let teamImgSrc = `https://cdn.nba.com/logos/nba/${teamId}/primary/L/logo.svg`;

  return (
    <div
      className="h-80 text-white flex items-center"
      style={{ background: current }}
    >
      <img src={`${teamImgSrc}`} alt="team" className="h-56"></img>
      <div>
        <div className="text-2xl">{fullName}</div>
        <div>{conference} Conference</div>
        <div>{division} Division</div>
      </div>
    </div>
  );
};

export default TeamCard;
