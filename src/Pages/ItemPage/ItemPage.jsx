import React, { useState } from 'react';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Container, Button } from '@mui/material';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import FoodContainer from "../../components/FoodContainer/FoodContainer";
import { useNavigate, useParams } from 'react-router-dom';
import { useCartState } from "../../Context/cartContext";
import { routeContext } from "../../Context/routeContext";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { CartIdsContext } from "../../Context/cartIds";
import axios from "axios";
import "./style.scss";
import { API_URL } from '../../util/const';

const ItemPage = () => {

  const { route } = React.useContext(routeContext)

  const { id } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState(JSON.parse(window.localStorage.getItem("product")) || null)
  const [foodList, setFoodList] = useState(JSON.parse(window.localStorage.getItem("foodList")) || null)


  const [cartStateList, setCartStateList] = useCartState();
  const { cartIdList, setCartIdList } = React.useContext(CartIdsContext)

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


  React.useEffect(() => {
    axios.get(`${API_URL}/taomlar/${route?.routePath}/${id}/`)
      .then(res => {
        setState(res?.data)
        setFoodList(route?.foodData)
        window.localStorage.setItem("product", JSON.stringify(res?.data))
        window.localStorage.setItem("foodList", JSON.stringify(route?.foodData))
      })
      .catch(err => console.log(err))
  }, [id, route.foodData, route.routePath])


  return (
    <div className='item-content'>

      <Container className='item-container'>
        <div
          className='back-link d-flex a-center '
          onClick={() => navigate(-1)}
        >
          <span className="text-wh">
          <KeyboardArrowLeftIcon />

          </span>
          <span>Вернуться назад</span>
        </div>
        <div className="grid-container">
          <div className="grid-item">
            <img src={state?.image} className="w-100" alt="" />
          </div>
          <div className="grid-item info">
            <div className="grid-item-content">
              <div>
                <h2 className='text-dk'>{state?.name}</h2>
                <p className='text-dk'>{state?.description}</p>
              </div>
              <div className="info-part">
                <span className='text-dk font-regular'>
                  {
                    state?.weight ?
                      `Вес: ${state?.weight} г` :
                      state?.size
                  }
                </span>
                <div className="buttons">
                  {
                    cartIdList?.every(id => id !== state.id) ?
                      <Button className='text-dk'
                        onClick={() => saveToCart(state)}
                      >
                        <span>Корзина</span>
                        <LocalMallOutlinedIcon />
                      </Button> :

                      <Button className='text-dk'
                        onClick={() => removeFromCart(state.id)}
                      >
                        <span>удалить из корзины</span>
                        <RemoveShoppingCartIcon />
                      </Button>

                  }
                  <span className='text-wh font-semibold'>{state?.price} ₽ </span>
                </div>
                {/* <table className='item-table'>
                  <thead>
                    <tr className='table-tr'>
                      <th className='text-dk font-regular'>Белки</th>
                      <th className='text-dk font-regular'>Жиры</th>
                      <th className='text-dk font-regular'>Углеводы</th>
                      <th className='text-dk font-regular'>Ккал</th>
                      <th className='text-dk font-regular'>Вес</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='text-dk font-regular'>17.23</td>
                      <td className='text-dk font-regular'>7.63</td>
                      <td className='text-dk font-regular'>22.35</td>
                      <td className='text-dk font-regular'>234</td>
                      <td className='text-dk font-regular'>{`${state?.weight} г` ?? state?.size}</td>
                    </tr>
                  </tbody>
                </table> */}
              </div>
            </div>
          </div>
        </div>

      </Container>
      <div className="line-hr"></div>

      <div className="sold-with-content">

        {
          foodList &&
          <FoodContainer
            title={"Qo'shimcha mahsulotlar"}
            parentData={foodList}
            data={foodList.data ?? foodList.results}
          />
        }


      </div>
    </div>
  )
}

export default ItemPage