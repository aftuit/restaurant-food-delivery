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

const Contact = () => {

    return (
        <div className="contact-content">
            {/*<img src="/assets/img/locate.jpg" className={'bg-img'} alt=""/>*/}
            <Container>
                <div className="contact-card">
                    <h2 className={'font-regular'}>Biz bilan aloqa:</h2>
                    <div className="line"></div>
                    <div className="address d-flex">
                        <LocationOnOutlinedIcon />
                        <div className="info">
                            <span className="font-regular text-dk">Manzil:</span>
                            <p className="font-regular text-dk">г. Ташкент Сергелийский р-н Джун Арык 27-А
                             <br />   Р/С 2020 8000 3050 4775 4001
                             <br />   в АТИБ Ипотека банк Яккасарайский ф-л
                             <br />   МФО 010017 ИНН: 306 275 341 ОКЭД: 25120
                                <br/>
                                <Link to={"delivery-term#location"}>
                                    xaritadan ko'rish
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className="mail d-flex">
                        <EmailOutlinedIcon />
                        <div className="info">
                            <span className="font-regular text-wh-50">Pochta:</span>
                            <p className="font-regular mail">auto.wash@gmail.com</p>
                        </div>
                    </div>
                    <div className="line"></div>

                    <div className="booking__ d-flex j-between a-center">
                        <a href='tel:+998333533033'>
                            <Button>Biz bilan aloqa</Button>
                        </a>
                        <div className="tel-number">
                            <h3 className="font-regular">+998 (33) 353-30-33</h3>
                            <p className="font-regular">Qo'ng'iroq qiling yoki so'rov qoldiring</p>
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