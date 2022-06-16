import React from "react";
import teamIds from "../../util/JSONdata/teamIds";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import "../style.css";

const ShowPlayerMore = ({ info, dataByYear }) => {
  let teamData = sessionStorage.getItem("teamData");

  //for teams grid length
  let teamsLength = info.teams.length;
  if (teamsLength > 2) teamsLength = 2;

  const matchTeamData = (teamId) => {
    let teamAbbreviation;
    for (let team in teamIds) {
      if (teamId === team) teamAbbreviation = teamIds[team];
    }
    let team;
    JSON.parse(teamData).data.forEach((el) => {
      if (el.abbreviation === teamAbbreviation) team = el;
    });
    return team;
  };
  const getTeammates = (teamId) => {
    let teammates = [];
    dataByYear.forEach((nbaPlayer) => {
      if (nbaPlayer.teamId === teamId) teammates.push(nbaPlayer);
    });
    return teammates;
  };
  let teammates = getTeammates(info.teamId);
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
  teammates = shuffle(teammates);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div className=" py-4 h-fit" style={{ background: "#e5e7eb" }}>
      <div className="mr-3 ml-3 md:mr-12 md:ml-12  my-3 text-2xl">
        {info.season} Season Averages
      </div>
      <div
        className="bg-white mr-3 ml-3 md:mr-12 md:ml-12 "
        style={{ boxShadow: "3px 2px 10px 2px  rgba(0,0,0,0.41)" }}
      >
        <div className="grid grid-cols-4 md:grid-cols-8 place-items-center py-3  ">
          <div className="border-b-2 border-blue-600 bg-">
            <div>MIN</div>
            <div>{info.min}</div>
          </div>
          <div className="border-b-2 border-blue-600">
            <div>FGM</div>
            <div>{info.fgm}</div>
          </div>
          <div className="border-b-2 border-blue-600">
            <div>FGA</div>
            <div>{info.fga}</div>
          </div>
          <div className="border-b-2 border-blue-600">
            <div>FG3M</div>
            <div>{info.fg3m}</div>
          </div>
          <div className="border-b-2 border-blue-600">
            <div>FG3A</div>
            <div>{info.fg3a}</div>
          </div>
          <div className="border-b-2 border-blue-600">
            <div>OREB</div>
            <div>{info.oreb}</div>
          </div>
          <div className="border-b-2 border-blue-600">
            <div>DREB</div>
            <div>{info.dreb}</div>
          </div>
          <div className="border-b-2 border-blue-600">
            <div>REB</div>
            <div>{info.reb}</div>
          </div>
          <div className="border-b-2 border-blue-600">
            <div>AST</div>
            <div>{info.ast}</div>
          </div>
          <div className="border-b-2 border-blue-600">
            <div>STL</div>
            <div>{info.stl}</div>
          </div>
          <div className="border-b-2 border-blue-600">
            <div>BLK</div>
            <div>{info.blk}</div>
          </div>
          <div className="border-b-2 border-blue-600">
            <div>TOV</div>
            <div>{info.turnover}</div>
          </div>
          <div className="border-b-2 border-blue-600">
            <div>PF</div>
            <div>{info.pf}</div>
          </div>
          <div className="border-b-2 border-blue-600">
            <div>PTS</div>
            <div>{info.pts}</div>
          </div>
          <div className="border-b-2 border-blue-600">
            <div>FG%</div>
            <div>{info.fg_pct}</div>
          </div>
          <div className="border-b-2 border-blue-600">
            <div>FG3%</div>
            <div>{info.fg3_pct}</div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mr-3 ml-3 md:mr-12 md:ml-12  my-6  ">
        <div
          className=" bg-white  p-2 grid grid-cols-2 "
          style={{
            boxShadow: "3px 2px 10px 2px  rgba(0,0,0,0.41)",
            gridTemplateColumns: "repeat(" + teamsLength + ",1fr)",
          }}
        >
          {info.teams.map((team, index) => {
            let teamId = team.teamId;
            let teamImgSrc = `https://cdn.nba.com/logos/nba/${teamId}/primary/L/logo.svg`;
            let thisTeamData = matchTeamData(teamId);

            return (
              <div
                key={index}
                className="flex items-center mr-3 ml-3 md:mr-12 md:ml-12 "
              >
                <img
                  src={`${teamImgSrc}`}
                  alt=""
                  className="absolute opacity-10 h-32 z-0 pointer-events-none md:pb-0"
                />
                <img
                  src={`${teamImgSrc}`}
                  alt="team"
                  className=" h-28  pt-11  "
                ></img>
                <div>
                  <div className="text-black no-underline">
                    {thisTeamData.full_name}
                  </div>
                  <div className="text-black no-underline">
                    {team.seasonStart} - {parseInt(team.seasonEnd) + 1}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-12 my-3 text-2xl">
        Explore More Players on the {info.season} Team
      </div>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={7000}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        className="h-60 mr-3 ml-3 md:mr-12 md:ml-12 pb-16 "
      >
        {teammates.map((teammate, index) => {
          let teamImgSrc = `https://cdn.nba.com/logos/nba/${teammate.teamId}/primary/L/logo.svg`;
          let imgSrc = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${teammate.personId}.png`;
          let name = teammate.firstName + " " + teammate.lastName;
          if (name === info.firstName + " " + info.lastName) return null;
          return (
            <Link
              to={{ pathname: `/player/${info.season}/${name}/` }}
              state={{
                info: teammate,
                dataByYear: dataByYear,
                pageID: "PlayerPage",
              }}
              key={index}
              href={"#top"}
              className="no-underline text-black"
            >
              <div className="flex place-items-center overflow-hidden cursor-pointer h-40">
                <div>
                  <img
                    src={`${teamImgSrc}`}
                    alt="team"
                    className=" opacity-10 w-40 absolute left-28 top-0 z-0 pointer-events-none "
                    style={{ bottom: "-30px" }}
                  />
                  <img
                    src={`${teamImgSrc}`}
                    alt="team"
                    className="h-14 fixed  right-0 "
                  ></img>
                  <img
                    src={`${imgSrc}`}
                    alt="player"
                    className="relative w-56 "
                  ></img>
                </div>

                <div className="flex flex-col justify-center relative right-2">
                  <div className="text-gray-800">
                    #{teammate.jersey} | {teammate.pos}
                  </div>

                  <div className="text-xl font-bold ">{name}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </Carousel>
    </div>
  );
};

export default ShowPlayerMore;
