const Form = ({ setPlayerInfo, dataByYear }) => {
  const handleChange = (e) => {
    e.preventDefault();

    let input = e.target.value.toLowerCase();
    let result = dataByYear.filter(
      (player) =>
        player.firstName.toLowerCase().includes(input) ||
        player.lastName.toLowerCase().includes(input)
    );
    let result50 = [];
    result.forEach((playerInfo, index) => {
      if (index < 50) {
        result50.push(playerInfo);
      }
    });

    setPlayerInfo(result50);
  };

  return (
    <section className="pt-3">
      <form className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold underline">
          Search Recent NBA Player
        </h1>
        <div>
          <input
            type="text"
            onChange={handleChange}
            className="border-2 border-gray-800 my-2 p-1 rounded"
          />
        </div>
      </form>
    </section>
  );
};

export default Form;
