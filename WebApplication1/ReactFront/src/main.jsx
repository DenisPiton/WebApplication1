import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes } from "react-router";
import App from "./app";
import { Route } from "react-router";
import Login from "./Login/Login";
import "./index.css"
import './Login/Login.css';
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login/>}/>
        {/* <Route path="/Tests">
          <Route path="/primeri"/>
          <Route path="/words"/>
        </Route>
        <Route path="/Register" />
        <Route path="/Profile"/>
        <Route path="/Leaderboard"/> */}
    </Routes>
  </BrowserRouter>,
);