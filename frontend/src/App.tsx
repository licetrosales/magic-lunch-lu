import React from 'react';
import './App.css';
import MyMagicLunchApp from "./components/MyMagicLunchApp";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Home from "./components/Home";
import WeekPlanner from "./components/WeekPlanner";


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <nav>
                    <Link to={"/"}>Startseite</Link>
                    <Link to={"/recipes"}>Meine Rezepte</Link>{' '}
                    <Link to={"/weekplan-history"}>Wochenplanchronik</Link>{' '}
                </nav>
                <Routes>
                    <Route path={"/"} element={<Home/>}></Route>
                    <Route path={"/recipes"} element={<MyMagicLunchApp/>}></Route>
                    <Route path={"/weekplan-history"} element={<WeekPlanner/>}></Route>
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;
