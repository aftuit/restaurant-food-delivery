import React from 'react'
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useCartState } from '../../Context/cartContext';
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
            <div className="trow-img">
                <img src={
                    item.image.includes("http") ?
                        item.image :
                        API_URL + item.image
                } alt="" />
            </div>
            <div className="trow-info">
                <div className='ms-1'>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                </div>
            </div>
            <div className='trow-count d-flex a-center'>
                <IconButton>
                    <RemoveIcon />
                </IconButton>
                <h2>1</h2>
                <IconButton>
                    <AddIcon />
                </IconButton>
            </div>

            <div className="trow-price dd">
                <h2>{item.price} ₽</h2>
            </div>

            <div className="trow-delete dd">
                <IconButton onClick={() => removeFromCart(item.id)}>
                    <ClearOutlinedIcon />

                </IconButton>
            </div>
        </motion.div>
    )
}

export default CartItem