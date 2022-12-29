import React from 'react';
import './App.css';
import MyMagicLunchApp from "./components/MyMagicLunchApp";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Startseite from "./components/Startseite";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <nav>
                    <Link to={"/"}>Startseite</Link>
                    <Link to={"/recipes"}>Meine Rezepte</Link>{' '}
                </nav>
                <Routes>
                    <Route path={"/"} element={<Startseite/>}></Route>
                    <Route path={"/recipes"} element={<MyMagicLunchApp/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
