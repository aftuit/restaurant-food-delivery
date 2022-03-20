import React from 'react';
import {Link} from "react-router-dom";
import {Container, Grid} from "@mui/material";
import "./style.scss";
const Footer = () => {
  return (
    <div className='footer-content'>
        <Container>
             <Grid container spacing={5} className="grid-container">
                 <Grid item xs={3} className="grid-item">
                    <h1>LOGOS</h1>
                    <p>© ООО СК «АПШЕРОН» 
                    Все права защищены. 2010-2020</p>
                    <ul>
                        <li><Link to="/" className='font-regular'>Пользовательское соглашение</Link></li>
                        <li><Link to="/" className='font-regular'>Карта сайта</Link></li>
                        <li><Link to="/" className='font-regular'>Политика конфиденциальности</Link></li>
                    </ul>
                 </Grid>

                 <Grid item xs={9} className="grid-item-links">
                     <ul>                                             
                         <li><Link to="/delivery-term" className='font-regular'>Условия доставки</Link></li>
                         <li><Link to="/cart" className='font-regular'>Корзина</Link></li>
                         <li><Link to="/share">Акции</Link></li>
                         <li><Link to="/admin-panel/dashboard">ADMIN PANEL</Link></li>
                     </ul>
                 </Grid>
             </Grid>
        </Container>
    </div>
  )
}

export default Footer