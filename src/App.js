import React from "react";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import PlayerCard from "./PlayerCard";
import TeamCard from "./TeamCard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/player/:name/" element={<PlayerCard />}></Route>
        <Route path="/team/:name/" element={<TeamCard />}></Route>
      </Routes>
    </>
  );
}

export default App;
