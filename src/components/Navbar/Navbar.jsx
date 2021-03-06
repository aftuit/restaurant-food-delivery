import React from "react";
import { Link } from "react-router-dom"
import "./style.scss";
import { Container, Button } from '@mui/material';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCartState } from "../../Context/cartContext";
import { LangContext } from "../../Context/localization";
function Navbar() {

    const {lang, languageType, setLanguageType} = React.useContext(LangContext);
    const [cartStateList] = useCartState();


    return (
        <div className="navbar-content">
            <Container className="container">
                <Link to="/" className="navbar-brand text-dk">
                    <img src="/assets/img/logo_preview.png"  alt="Logo" className="w-100"/>
                </Link>
<div className="d-flex a-center">
    <div className="d-flex lang">
        <img src={`/assets/img/${languageType}.png`}/>
        <select value={languageType} onChange={evt => setLanguageType(evt.target.value)}>
            <option value="uz">uz</option>
            <option value="ru">ru</option>
        </select>
    </div>
                <a href="tel:+998333533033" className="contact me-2">
                    <div className="phone-icn">
                        <PhoneInTalkIcon />
                    </div>

                    <div className="ms-1">
                        <p>{lang[languageType].navbar.contact}</p>
                        <h5>+998 (33) 353-30-33</h5>
                    </div>
                </a>
                <Link to="/cart" className="text-dnone">
                    <Button color="success" variant="contained" className="korzinka-box d-flex a-center font-regular">
                        <div className="d-flex a-center text-wh font-regular">
                            <ShoppingCartIcon />
                            {lang[languageType].navbar.cart}
                        </div>
                        {
                            cartStateList.length > 0 &&
                            <div className="badge text-wh ms-1">
                                {cartStateList.length}
                            </div>
                        }
                    </Button>
                </Link>
                </div>
            </Container>
        </div>
    )
}

export default Navbar;