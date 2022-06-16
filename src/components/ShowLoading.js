import spinningBall from "../util/spinningBall.gif";

const ShowLoading = () => {
  return (
    <div className="w-full flex justify-center h-full items-center bg-gray-200">
      <div className="w-48 h-48">
        <img alt="" src={spinningBall}></img>
      </div>
    </div>
  );
};

export default ShowLoading;
