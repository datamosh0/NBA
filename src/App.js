import React from "react";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import PlayerCard from "./components/PlayerPage/PlayerCard";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/player/:name/" element={<PlayerCard />}></Route>
      </Routes>
    </>
  );
}

export default App;
