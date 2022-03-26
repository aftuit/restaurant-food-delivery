import React from "react";
import { Link } from "react-router-dom"
import "./style.scss";
import { Container, Button } from '@mui/material';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCartState } from "../../Context/cartContext";
function Navbar() {

    const [cartStateList] = useCartState();

    return (
        <div className="navbar-content">
            <Container className="container">
                <Link to="/" className="navbar-brand text-dk">
                    LOGO
                </Link>
<div className="d-flex a-center">
                <a href="tel:+998909411323" className="contact me-2">
                    <div className="phone-icn">
                        <PhoneInTalkIcon />
                    </div>

                    <div className="ms-1">
                        <p>{"Aloqa:"}</p>
                        <h5>+998  (90) 941-13-23</h5>
                    </div>
                </a>
                <Link to="/cart" className="text-dnone">
                    <Button color="success" variant="contained" className="korzinka-box d-flex a-center font-regular">
                        <div className="d-flex a-center text-wh font-regular">
                            <ShoppingCartIcon />
                            {"Savatcha"}
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