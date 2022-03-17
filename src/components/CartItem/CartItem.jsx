import React from 'react'
import { IconButton } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useCartState } from '../../Context/cartContext';
import "./style.scss";
import { API_URL } from '../../util/const';

const CartItem = ({ item }) => {

    const [cartStateList, setCartStateList] = useCartState()

    const removeFromCart = (param) => {
        const newFilteredList = cartStateList.filter(list => list.id !== param);
        setCartStateList(newFilteredList)
    }


    return (
        <tr className="tr-cart-item">
            <td className="trow-img">
                <img src={
                    item.image.includes("http") ?
                        item.image :
                        API_URL + item.image
                } alt="" />
            </td>
            <td className="trow-info">
                <div className='ms-1'>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                </div>
            </td>

            <td className="trow-price dd">
                <h2>{item.price} ₽</h2>
            </td>

            <td className="trow-delete dd">
                <IconButton onClick={() => removeFromCart(item.id)}>
                    <ClearOutlinedIcon />
                    
                </IconButton>
            </td>
        </tr>
    )
}

export default CartItem