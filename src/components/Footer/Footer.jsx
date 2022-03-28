import React from 'react';
import { Link } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import "./style.scss";
const Footer = () => {
    return (
        <div className='footer-content w-100'>
            <Container>
                <Grid container spacing={5} className="grid-container w-100">
                    <Grid item xs={12} md={3} sm={6} className="grid-item">
                       
                        <p className="font-regular">
                            OOO «BILLUR BURGUT PARVOZI» <br />
                            г. Ташкент Сергелийский р-н Джун Арык 27-А <br />
                            в АТИБ Ипотека банк Яккасарайский ф-л <br />
                            Р/С 2020 8000 3050 4775 4001 <br />
                            МФО 010017 ИНН: 306 275 341 ОКЭД: 25120
                            </p>

                    </Grid>

                    <Grid item xs={12} md={9} sm={6} className="grid-item-links">
                        <ul>
                            <li><Link to="/delivery-term" className='font-regular'>Yetkazib berish tartibi</Link></li>
                            <li><Link to="/cart" className='font-regular'>Savatcha</Link></li>
                            <li><Link to="/admin-panel/dashboard" style={{color: "yellow"}}>ADMIN PANEL</Link></li>
                        </ul>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Footer