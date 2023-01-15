import React from "react";

import "./WeekPlanner.style.css"
export default function WeekPlanner(){
    return (
        <div>
            <div className="header">

                <div className={"inputContainer"}>
                    <input type={"date"} placeholder={"Date"}/>
                    <input type={"text"} placeholder={"WochenTagkategorie"}/>
                </div>
                <button>Vorschlag generieren</button>
            </div>
            <div className="lunchGenerator">

            </div>
        </div>
    )
}