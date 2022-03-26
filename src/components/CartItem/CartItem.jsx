import React from 'react'
import { IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useCartState } from '../../Context/cartContext';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { motion } from 'framer-motion';
import "./style.scss";
import { API_URL } from '../../util/const';

const CartItem = ({ item }) => {

    const [cartStateList, setCartStateList] = useCartState()

    const removeFromCart = (param) => {
        const newFilteredList = cartStateList.filter(list => list.id !== param);
        setCartStateList(newFilteredList)
    }


    return (
        <motion.div
            className="tr-cart-item"
            layout
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
        >
            <div className="trow-img a">
                <img src={
                    item.image.includes("http") ?
                        item.image :
                        API_URL + item.image
                } alt="" />
            </div>
            <div className="trow-info a">
                <div className='ms-1'>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                </div>
            </div>
            <div className='trow-count a d-flex a-center'>
                <IconButton variant={"contained"}>
                    <RemoveIcon />
                </IconButton>
                <h2>1</h2>
                <IconButton variant={"contained"}>
                    <AddIcon />
                </IconButton>
            </div>

            <div className="d-flex j-between a-center pr">
                <div className="trow-price a dd me-1">
                    <h2>{item.price} ₽</h2>
                </div>

                <div className="trow-delete a dd">
                    <IconButton onClick={() => removeFromCart(item.id)} variant={"contained"} className="icon">
                        <ClearOutlinedIcon />
                    </IconButton>

                    <Button
                        variant="contained"
                        className="korzina delete"
                        onClick={() => removeFromCart(item.id)}
                    >   O'chirish
                        <RemoveShoppingCartIcon />
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}

export default CartItem