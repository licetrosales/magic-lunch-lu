import React from 'react';
import './App.css';
import MagicLunchMyRecipes from "./components/Recipe/MagicLunchMyRecipes";
import {Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import WeekPlanner from "./components/WeekPlanner";
import Header from "./components/Header";



function App() {
    return (
        <div className="App">

            <Header/>

            <Routes>
                <Route path={"/"} element={<Home/>}></Route>
                <Route path={"/recipes"} element={<MagicLunchMyRecipes/>}></Route>
                <Route path={"/weekplan-history"} element={<WeekPlanner/>}></Route>
                <Route path={"/impressum"} element={<WeekPlanner/>}></Route>

            </Routes>
        </div>
    );
}

export default App;
