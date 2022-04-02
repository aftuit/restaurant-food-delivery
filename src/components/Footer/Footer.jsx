import React from 'react';
import { Link } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import "./style.scss";
import {LangContext} from "../../Context/localization";
const Footer = () => {

    const {lang, languageType} = React.useContext(LangContext);

    return (
        <div className='footer-content w-100'>
            <Container>
                <Grid container spacing={5} className="grid-container w-100">
                    <Grid item xs={12} md={3} sm={6} className="grid-item">
                       
                        <p className="font-regular">
                            {lang[languageType].footer.address}
                            </p>

                    </Grid>

                    <Grid item xs={12} md={9} sm={6} className="grid-item-links">
                        <ul>
                            <li><Link to="/delivery-term" className='font-regular'>{lang[languageType].footer.links[0]}</Link></li>
                            <li><Link to="/cart" className='font-regular'>{lang[languageType].footer.links[1]}</Link></li>
                            <li><Link to="/admin-panel/dashboard" style={{color: "yellow"}}>ADMIN PANEL</Link></li>
                        </ul>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Footer