import React from "react";
import { Link } from "react-router-dom"
import "./style.scss";
import { Container, Button } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCartState } from "../../Context/cartContext";
function Navbar() {

    const [cartStateList] = useCartState();

    return (
        <div className="navbar-content">
            <Container className="container">
                <Link to="/admin-panel" className="navbar-brand">
                    <img src="/assets/icn/logo.svg" alt="logo" />
                </Link>

                <div className="search-location">
                    <LocationOnOutlinedIcon className="location" />
                    <input
                        type="text"
                        placeholder={"Введите адрес доставки"}
                    />

                    <button type="button"><SearchOutlinedIcon className="search" /></button>
                </div>

                <a href="tel:+7 (917) 510-57-59" className="contact">
                    <div className="phone-icn">
                        <PhoneInTalkIcon />
                    </div>

                    <div className="ms-1">
                        <p>{"Контакты:"}</p>
                        <h5>+7 (917) 510-57-59</h5>
                    </div>
                </a>
                <Link to="/cart" className="text-dnone">
                    <Button color="success" variant="contained" className="korzinka-box d-flex a-center font-regular">
                        <div className="d-flex a-center text-wh font-regular">
                            <ShoppingCartIcon />
                            {"Корзина"}
                        </div>
                        {
                            cartStateList.length > 0 &&
                            <div className="badge text-wh ms-1">
                                {cartStateList.length}
                            </div>
                        }
                    </Button>
                </Link>

            </Container>
        </div>
    )
}

export default Navbar;