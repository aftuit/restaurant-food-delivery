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

const CartItem = ({ item, cartList, setCartList }) => {

    const [count, setCount] = React.useState(1)
    const [price] = React.useState(item?.price)
    const [cartStateList, setCartStateList] = useCartState()

    const removeFromCart = (param) => {
        const newFilteredList = cartStateList.filter(list => list.id !== param);
        setCartStateList(newFilteredList)
        setCartList(newFilteredList)
    }


    const changeCount = (value) => {
        setCount(value)
        setCartList(
            cartList.map(obj => {
                if(obj.id === item.id){
                    return {
                        ...obj,
                        buy_count: count,
                        price: price * value
                    }
                }
                else return obj
            })
        )
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
                    <h3 className={'font-regular'}>{item.name}</h3>
                    <p className={'font-regular'}>{item.description}</p>
                </div>
            </div>
            <div className='trow-count a d-flex a-center'>
                <IconButton disabled={!(count - 1)} variant={"contained"} onClick={() => changeCount(count - 1)}>
                    <RemoveIcon />
                </IconButton>
                <h2 className={'font-regular'}>{count}</h2>
                <IconButton variant={"contained"} onClick={() => changeCount(count + 1)}>
                    <AddIcon />
                </IconButton>
            </div>

            <div className="d-flex j-between a-center pr">
                <div className="trow-price a dd me-1">
                    <h2 className={'font-regular'}>{item.price} so'm</h2>
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