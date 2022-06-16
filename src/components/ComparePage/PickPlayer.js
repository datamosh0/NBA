import teamIds from "../../util/JSONdata/teamIds";
import callApi from "../../util/CallApi";
const PickPlayer = ({
  search,
  changeFirstPlayer,
  setChangeFirstPlayer,
  setChangeSecondPlayer,
  setPlayerOneInfo,
  setPlayerTwoInfo,
  setShowSearch,
  setFirstLoad,
}) => {
  const handleClick = async (info) => {
    let response = await callApi(info);

    if (changeFirstPlayer) {
      setPlayerOneInfo(response);
      setChangeFirstPlayer(false);
    } else {
      setPlayerTwoInfo(response);
      setChangeSecondPlayer(false);
    }
    setShowSearch(false);
    setFirstLoad(false);
  };

  return (
    <div
      className="mt-12 bg-white h-full "
      style={{
        boxShadow: "4px 4px 4px 4px  rgba(0,0,0,0.41)",
      }}
    >
      <div className="flex flex-col">
        {search.map((info) => {
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
          return (
            <div
              key={name}
              onClick={() => handleClick(info)}
              className="playerDiv py-4 cursor-pointer text-black border-slate-200 border-b-2 grid grid-cols-5 place-items-center md:grid-cols-8"
            >
              <img
                className=" w-12 h-12 rounded-full  m-y-auto bg-slate-200 object-cover"
                src={imgSrc}
                alt="player"
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
          );
        })}
      </div>
    </div>
  );
};

export default PickPlayer;
