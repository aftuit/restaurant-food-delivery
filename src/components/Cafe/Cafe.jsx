import React from "react";
import {Container, Grid, Card} from "@mui/material"
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
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora neque blanditiis et
                            ratione1, ad eum sit est non corporis fugit, itaque temporibus architecto, labore in iure
                            earum optio asperiores omnis cumque exercitationem molestiae harum repellendus? Suscipit
                            doloribus omnis error dicta earum. Dolores, eius possimus modi minus quibusdam repudiandae.
                            A dolorum id nihil officia, minima hic? Nostrum illo itaque molestiae dicta.
                        </p>


                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={6}>
                                <Card className="grid-card text-center">
                                    <MeetingRoomIcon/>
                                    <p className={'font-regular'}>Ajoyib tanlov</p>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Card className="grid-card text-center">
                                    <WindowIcon/>
                                    <p className={'font-regular'}>Yuqori sifat</p>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Card className="grid-card text-center">
                                    <HandymanIcon/>
                                    <p className={'font-regular'}>Yaxshi mahsulot</p>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Card className="grid-card text-center">
                                    <ElectricRickshawIcon/>
                                    <p className={'font-regular'}>Yetkazib berish</p>
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