import React from 'react';
import { Container, Button } from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import {Link} from "react-router-dom"
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TelegramIcon from '@mui/icons-material/Telegram';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import YouTubeIcon from '@mui/icons-material/YouTube';
import "./style.scss";

const Contact = ({lang, languageType}) => {

    return (
        <div className="contact-content">
            <Container>
                <div className="contact-card">
                    <h2 className={'font-regular'}>{lang[languageType].contact.title}</h2>
                    <div className="line"></div>
                    <div className="address d-flex">
                        <LocationOnOutlinedIcon />
                        <div className="info">
                            <span className="font-regular text-dk">{lang[languageType].contact.address.title}</span>
                            <p className="font-regular text-dk">
                                {lang[languageType].footer.address}
                            <br />
                                <Link to={"delivery-term#location"} className={'font-semibold'}>
                                    {lang[languageType].contact.address.link}
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className="mail d-flex">
                        <EmailOutlinedIcon />
                        <div className="info">
                            <span className="font-regular text-wh-50">{lang[languageType].contact.email.title}</span>
                            {/*<p className="font-regular mail">auto.wash@gmail.com</p>*/}
                        </div>
                    </div>
                    <div className="line"></div>

                    <div className="booking__ d-flex j-between a-center">
                        <a href='tel:+998333533033'>
                            <Button>{lang[languageType].contact.btn.btn}</Button>
                        </a>
                        <div className="tel-number">
                            <h3 className="font-regular">+998 (33) 353-30-33</h3>
                            <p className="font-regular">{lang[languageType].contact.btn.info}</p>
                        </div>
                    </div>
                    <div className="social d-flex j-center a-center">
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Contact;