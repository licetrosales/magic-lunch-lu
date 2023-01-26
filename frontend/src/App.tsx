import React from 'react';
import './App.css';
import MagicLunchMyRecipes from "./components/Recipe/MagicLunchMyRecipes";
import {Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import MagicLunchMyWeekPlans from "./components/WeekMealPlan/MagicLunchMyWeekPlans";
import Login from "./components/Login";

function App() {
    return (
        <div className="App">

            <Header/>

            <Routes>
                <Route path={"/"} element={<Home/>}></Route>
                <Route path={"/recipes"} element={<MagicLunchMyRecipes/>}></Route>
                <Route path={"/mealplans"} element={<MagicLunchMyWeekPlans/>}></Route>
                <Route path={"/impressum"} element={<Home/>}></Route>
                <Route path={"/logout"} element={<Login/>}></Route>
            </Routes>

        </div>
    );
}

export default App;
