

import React from "react";
import { Container, Grid, Card } from "@mui/material"
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import WindowIcon from '@mui/icons-material/Window';
import HandymanIcon from '@mui/icons-material/Handyman';
import ElectricRickshawIcon from '@mui/icons-material/ElectricRickshaw';
import "./style.scss";
const Cafe = () => {
    return (
        <div className="cafe-content mt-3">
            <Container>
                <Grid container spacing={5} className="grid-container">
                    <Grid item xs={12} md={6}>
                            <h2 className="font-bold">Bizning xizmatlarimiz</h2>
                            <p className="font-regular info text-wh">
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
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4}>
                                <Grid item xs={12} sm={6}>
                                    <Card className="grid-card text-center" >
                                        <MeetingRoomIcon />
                                        <p>Coffee</p>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Card className="grid-card text-center">
                                        <WindowIcon />
                                        <p>Быстрая доставка</p>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Card className="grid-card text-center">
                                        <HandymanIcon />
                                        <p>Лучшие повора</p>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Card className="grid-card text-center">
                                        <ElectricRickshawIcon />
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