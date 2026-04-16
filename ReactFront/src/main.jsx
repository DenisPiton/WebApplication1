import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes } from "react-router";
import { Route } from "react-router";
import Login from "./Login/Login";
import "./index.css"
import './Login/Login.css';
import { AuthProvider } from "./AuthMech/AuthContext";
import Registration from "./Login/Registration";
import Tests_main from "./Tests/Main";
import Solvings from "./Tests/Solvings";
import WordsTest from "./Tests/WordsTest";
import Chart_F from "./Profile/Profile";



const root = document.getElementById("root");


ReactDOM.createRoot(root).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/Registration" element={<Registration/>}/>
          <Route path="/Test" element={<Tests_main/>}>
            
          </Route>
          <Route path="/Solvings" element={<Solvings/>}/>
          <Route path="/Words" element={<WordsTest/>}/>
          <Route path="/Profile" element={<Chart_F/>}/>
          {/* <Route path="/Tests">
            <Route path="/primeri"/>
            <Route path="/words"/>
          </Route>
          <Route path="/Register" />
          <Route path="/Profile"/>
          <Route path="/Leaderboard"/> */}
      </Routes>
    </BrowserRouter>
  </AuthProvider>

);