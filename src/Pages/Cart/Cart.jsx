import React from 'react'
import { Container, Button } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import CartItem from '../../components/CartItem/CartItem';
import { useCartState } from '../../Context/cartContext';
import AddIcon from '@mui/icons-material/Add';
import Title from "../../components/Title/Title";
import { AnimatePresence } from 'framer-motion';
import "./style.scss";
const Cart = () => {

  const [cartStateList] = useCartState();
  const [showModal, setShowModal] = React.useState(false);

  const navigate = useNavigate();

  const orderBtn = () => {
    cartStateList?.length > 0 ?
      navigate("/order") :
      setShowModal(true)
  }

  return (
    <div className="cart-content">
      <Container>
        <Link to='/'
          className='back-link d-flex a-center'
        >
          <KeyboardArrowLeftIcon />
          <span>Вернуться назад</span>
        </Link>

        <Title title="Контакты" />

        <div className={`empty-cart-modal ${showModal && 'show'}`}>
          <div className="modal-card">
            <span onClick={() => setShowModal(false)}><AddIcon /></span>
            <img src="/assets/icn/empty_cart.svg" alt="" />

            <h3>Корзина пустая</h3>

            <Link to="/">
              <Button type="button">
                Посмотреть меню
              </Button>
            </Link>
          </div>
        </div>

        <div className={`fade-m ${showModal && 'active'}`}></div>

        <div className="row mt-2">
          {
            cartStateList.length === 0 ?
              <div className="empty-card">
                <div>
                  <h3>You have no saved Products yet</h3>
                  <p>Go to <Link to="/">Products list</Link></p>
                </div>
              </div> :
              <div className="cart-item-list">
                <AnimatePresence>
                {
                  cartStateList?.map(item => {
                    return (
                      <CartItem key={item.image} item={item} />
                    )
                  })
                }
                </AnimatePresence>
              </div>
          }
        </div>

        <div className="total-price mt-3 d-flex j-between a-center">
          <div className="left-side">
            {
              cartStateList.length > 0 &&
              <p className='total font-regular text-wh-50'>
                Итого: <span>
                  {cartStateList.reduce((a, b) => (+a) + (+b.price), 0)} ₽</span> </p>
            }
            <p className='adding'>До бесплатной доставки не хватет: <span>100 ₽</span></p>
            <p className='minimum'>Минимальная сума заказа 1500 ₽</p>
          </div>

          <div className="right-side">
            {/* <Link to='/order'> */}
            <Button
              onClick={() => orderBtn()}
            >
              Оформить заказ
            </Button>
            {/* </Link> */}
          </div>
        </div>
      </Container>

    </div>
  )
}

export default Cart