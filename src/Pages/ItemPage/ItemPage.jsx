import React, { useState } from 'react';

// import { useFood } from "../../Context/foodsContext";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Container, Button } from '@mui/material';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import FoodContainer from "../../components/FoodContainer/FoodContainer";
import { useNavigate, useParams } from 'react-router-dom';
import { routeContext } from "../../Context/routeContext";
import axios from "axios";
import "./style.scss";
import { API_URL } from '../../util/const';

const ItemPage = () => {

  const { route } = React.useContext(routeContext)

  const { id } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState(JSON.parse(window.localStorage.getItem("product")) || null)
  const [foodList, setFoodList] = useState(JSON.parse(window.localStorage.getItem("foodList")) || null)

  React.useEffect(() => {
    axios.get(`${API_URL}/taomlar/${route.routePath}/${id}/`)
      .then(res => {
        setState(res?.data)
        setFoodList(route.foodData)
        window.localStorage.setItem("product", JSON.stringify(res.data))
        window.localStorage.setItem("foodList", JSON.stringify(route.foodData))
        console.log(res)
      })
      .catch(err => console.log(err))
  }, [])


  return (
    <div className='item-content'>

      <Container className='item-container'>
        <div
          className='back-link d-flex a-center'
          onClick={() => navigate(-1)}
        >
          <KeyboardArrowLeftIcon />
          <span>Вернуться назад</span>
        </div>
        <div className="grid-container">
          <div className="grid-item">
            <img src={state?.image} className="w-100" alt="" />
          </div>
          <div className="grid-item info">
            <div className="grid-item-content">
              <div>
                <h2 className='text-wh'>{state?.name}</h2>
                <p className='text-wh-50'>{state?.description}</p>
              </div>
              <div className="info-part">
                <span className='text-wh font-regular'>
                  {
                    state?.weight ?
                      `Вес: ${state?.weight}` :
                      state?.size
                  }
                </span>
                <div className="buttons">
                  <Button className='text-wh'>
                    <span>Корзина</span>
                    <LocalMallOutlinedIcon />
                  </Button>
                  <span className='text-wh font-semibold'>{state?.price} ₽ </span>
                </div>
                <table className='item-table'>
                  <thead>
                    <tr className='table-tr'>
                      <th className='text-wh-50 font-regular'>Белки</th>
                      <th className='text-wh-50 font-regular'>Жиры</th>
                      <th className='text-wh-50 font-regular'>Углеводы</th>
                      <th className='text-wh-50 font-regular'>Ккал</th>
                      <th className='text-wh-50 font-regular'>Вес</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='text-wh font-regular'>17.23</td>
                      <td className='text-wh font-regular'>7.63</td>
                      <td className='text-wh font-regular'>22.35</td>
                      <td className='text-wh font-regular'>234</td>
                      <td className='text-wh font-regular'>{state?.weight ?? state?.size}</td>
                    </tr>
                  </tbody>
                </table>
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
            title={"с этим товаром покупают"}
            parentData={foodList}
            data={foodList.data??foodList.results}
          />
        }


      </div>
    </div>
  )
}

export default ItemPage