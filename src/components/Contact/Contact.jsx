import React from 'react';
import { Container, Button } from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import "./style.scss";


const Contact = () => {


    return (
        <div className="contact-content">
            <Container>
                <div className="contact-card">
                    <h2>КОНТАКТЫ</h2>
                    <div className="line"></div>
                    <div className="address d-flex">
                        <LocationOnOutlinedIcon />
                        <div className="info">
                            <span className="font-regular text-wh-50">Наш адрес:</span>
                            <p className="font-regular">МО, городской округ Красногорск, село Ильинкое,
                                Экспериментальная улица, 10</p>
                        </div>
                    </div>
                    <div className="mail d-flex">
                        <EmailOutlinedIcon />
                        <div className="info">
                            <span className="font-regular text-wh-50">Наша почта:</span>
                            <p className="font-regular mail">auto.wash@gmail.com</p>
                        </div>
                    </div>
                    <div className="line"></div>

                    <div className="booking__ d-flex j-between a-center">
                        <a href='tel:+7 (917) 510-57-59'>
                            <Button>ЗАБРОНИРОВАТЬ СТОЛ</Button>
                        </a>
                        <div className="tel-number">
                            <h3 className="font-regular">+7 (917) 510-57-59</h3>
                            <p className="font-regular">Звоните или оставляйте заявку</p>
                        </div>
                    </div>
                    <div className="social d-flex j-center a-center">
                        <span className="font-regular ">Мы в соц сетях:</span>

                        <div className="social-net d-flex">
                            <a href="/">
                                <FacebookIcon />
                            </a>
                            <a href="http://t.me/Farrux_Aktamov">
                                <TelegramIcon />
                            </a>
                            <a href="https://www.instagram.com/farrux__aktamov/">
                                <InstagramIcon />
                            </a>
                            <a href="/">
                                <YouTubeIcon />
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Contact;