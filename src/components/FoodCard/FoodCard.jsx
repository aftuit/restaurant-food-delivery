import React from 'react'
import { Card, CardContent, Button } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { API_URL } from "../../util/const";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { routeContext } from '../../Context/routeContext';
import { useNavigate } from "react-router-dom";
import { useCartState } from '../../Context/cartContext';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import "./style.scss";
const FoodCard = ({
    food,
    path,
    foodDataFromParent }) => {

    const { setRoute } = React.useContext(routeContext);
    const [cartStateList, setCartStateList] = useCartState();

    const [cartItemsId, setCartItemsId] = React.useState([...cartStateList?.map(item => item.id)]);
    const navigate = useNavigate();

    const moveItemPage = (path, id, data) => {
        if (!window.location.href.includes("food")) {
            setRoute({ routePath: path, foodData: foodDataFromParent ?? data });
            navigate(`food/${path}/${id}`);
        }
    }

    const saveToCart = (item) => {
        setCartStateList((e) => [...e, { ...item }])
        setCartItemsId((e) => [...e, item.id])
    }

    const removeFromCart = (param) => {
        const newFilteredList = cartStateList.filter(list => list.id !== param);
        setCartStateList(newFilteredList);
        const newFilteredIDs = cartItemsId.filter(item => item !== param)
        setCartItemsId(newFilteredIDs)
    }

    return (
        <Card
            className="card">
            <img
                onClick={() => moveItemPage(path, food.id)}
                src={
                    food.image.includes("http") ?
                        food.image :
                        API_URL + food.image
                }
                alt=""
            />
            <CardContent className="card-content text-wh font-regular">
                <div className="card-title-w d-flex j-between a-center">
                    <h3>{food.name}</h3>
                    <p className="text-wh-50">
                        {
                            food.weight ?
                                `Вес: ${food.weight} г` :
                                food.size
                        }
                    </p>
                </div>
                <p className='food-text mt-1 text-wh-50 font-light'>
                    <ReactReadMoreReadLess
                        charLimit={60}
                        ellipsis="..."
                        readMoreText=""
                        readLessText=""
                    >
                        {food.description}
                    </ReactReadMoreReadLess>
                </p>
                        <div className="price d-flex j-between a-center mt-1 font-bold">
                            <h4>{food.price} ₽</h4>
                            {
                                cartItemsId?.every(id => id !== food.id) ?
                                    <Button
                                        variant="contained"
                                        className="korzinka"
                                        onClick={() => saveToCart(food)}
                                    >
                                        В корзину
                                        <ShoppingCartOutlinedIcon />
                                    </Button> :
                                    <Button
                                        variant="contained"
                                        className="korzinka delete"
                                        onClick={() => removeFromCart(food.id)}
                                    >
                                        <RemoveShoppingCartIcon />
                                    </Button>
                            }
                        </div>
            </CardContent>
        </Card>
    )
}

export default FoodCard;