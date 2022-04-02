import React from "react";
import {Container, Grid, Card} from "@mui/material"
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import WindowIcon from '@mui/icons-material/Window';
import HandymanIcon from '@mui/icons-material/Handyman';
import ElectricRickshawIcon from '@mui/icons-material/ElectricRickshaw';
import "./style.scss";

const Cafe = ({lang, languageType}) => {
    return (
        <div className="cafe-content mt-3">
            <Container>
                <Grid container spacing={5} className="grid-container">
                    <Grid item xs={12} md={12}>
                        <Grid container spacing={8}>
                            {
                                lang[languageType].service.adding.map(item => {
                                    return (
                                        <Grid item xs={12} sm={6} key={item.id}>
                                            <Card className="grid-card text-center">
                                                {item.icon}
                                                <p className={'font-regular'}>{item.title}</p>
                                            </Card>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Cafe;