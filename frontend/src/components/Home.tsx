import "./Home.style.css"
import {Typography} from "@mui/material";

export default function Home() {
    return (

        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "lavender"
            }}
        >
            <header>
                <Typography variant={"h6"}> Login section</Typography>
            </header>

            <section className={"section-content "}>
                <div>

                </div>
            </section>
        </div>
    )
}