import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./components/HomePage/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/player/:year/:id/" element={<PrivateRoute />}></Route>
        <Route path="/compare/:year/" element={<PrivateRoute />}></Route>
      </Routes>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
