import React from 'react'
import { Card, CardContent, Button } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { API_URL } from "../../util/const";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { routeContext } from '../../Context/routeContext';
import { LangContext } from "../../Context/localization";
import { useNavigate } from "react-router-dom";
import { useCartState } from '../../Context/cartContext';
import { CartIdsContext } from "../../Context/cartIds"
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import "./style.scss";
const FoodCard = ({
    food,
    path,
    foodDataFromParent }) => {

    const {lang, languageType} = React.useContext(LangContext);

    const { setRoute } = React.useContext(routeContext);
    const [cartStateList, setCartStateList] = useCartState();
    const { cartIdList, setCartIdList } = React.useContext(CartIdsContext);

    const navigate = useNavigate();

    const moveItemPage = (path, id, data) => {
        if (!window.location.href.includes("access")) {
            setRoute({ routePath: path, foodData: foodDataFromParent ?? data });
            setTimeout(() => {
                navigate(`access/${path}/${id}`);
            }, 500)
        }
    }

    React.useEffect(() => {
        setCartIdList([...cartStateList?.map(item => item.id)])
    }, [cartStateList, setCartIdList])

    const saveToCart = (item) => {
        setCartStateList((e) => [...e, { ...item }])
        setCartIdList((e) => [...e, item.id])
    }

    const removeFromCart = (param) => {
        const newFilteredList = cartStateList.filter(list => list.id !== param);
        setCartStateList(newFilteredList);
        const newFilteredIDs = cartIdList.filter(item => item !== param)
        setCartIdList(newFilteredIDs)
    }

    return (

        <Card
            className="card">
            <img
                onClick={() => moveItemPage(path, food.id)}
                src={
                    food?.image?.includes("http") ?
                        food.image :
                        API_URL + food.image
                }
                alt=""
            />
            <CardContent className="card-content text-wh font-regular">
                <div className="card-title-w d-flex j-between a-center text-dk">
                    <h3>{food.name}</h3>
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
                <div className="price d-flex j-between a-center mt-1 font-bold text-dk">
                    <h4>{food.price} {lang[languageType].cart.soum}</h4>
                    {
                        cartIdList?.every(id => id !== food.id) ?
                            <Button
                                variant="contained"
                                className="korzinka"
                                onClick={() => saveToCart(food)}
                            >
                                {lang[languageType].card.save}
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