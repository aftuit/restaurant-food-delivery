

import React from "react";
import { Container, Grid, Card } from "@mui/material"
import LocalCafeOutlinedIcon from '@mui/icons-material/LocalCafeOutlined';
import CookieOutlinedIcon from '@mui/icons-material/CookieOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import "./style.scss";
const Cafe = () => {
    return (
        <div className="cafe-content mt-3">
            <Container>
                <Grid container spacing={10} className="grid-container">
                    <Grid item xs={6}>
                            <h2 className="font-bold">НАШЕ КАФЕ</h2>
                            <p className="font-regular info">
                                {`Мы расположены в одном из самых живописных мест города — на 
                        берегу реки, это ваш оазис в черте города, куда можно 
                        сбежать от шумного и пыльного мегаполиса. Мы, действительно 
                        уникальные, ведь все продумано до мелочей: проект построен 
                        из дикого закарпатского сруба, камин в основном зале 
                        ресторана и панорамные окна с видом на реку, уютные беседки 
                        на берегу реки и лучшая видовая террасса, шатер с посадкой 
                        на 200 человек, сказочный детский домик и бассейн.`}
                            </p>

                    </Grid>
                        <Grid item xs={6}>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <Card className="grid-card text-center" >
                                        <LocalCafeOutlinedIcon />
                                        <p>Coffee</p>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <Card className="grid-card text-center">
                                        <BoltOutlinedIcon />
                                        <p>Быстрая доставка</p>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <Card className="grid-card text-center">
                                        <CookieOutlinedIcon />
                                        <p>Лучшие повора</p>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <Card className="grid-card text-center">
                                        <LocalCafeOutlinedIcon />
                                        <p>Coffee</p>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Cafe;