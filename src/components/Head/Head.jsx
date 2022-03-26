import React from "react";
import { Grid, Container } from "@mui/material";
import "./style.scss";
const Head = () => {
    return (
        <div className="head-content">
            <Container className="head-container">
                <Grid container>
                    <Grid item xs={10} md={8} sm={12} className="container-item mt-3">
                            <img src="/assets/img/headtext1.png" className="head-text1" alt="" />
                            <img src="/assets/img/headtext.png" className="head-text w-100" alt="" />
                            <img src="/assets/img/btn-shadow.png" className="head-btn" alt="" />
                            <button className="bg-green mt-2 font-semibold">Ещё не пробовал?</button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Head;