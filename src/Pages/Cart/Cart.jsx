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

  const [cartStateList, setCartStateList] = useCartState();
  const [showModal, setShowModal] = React.useState(false);
  const [cartList, setCartList] = React.useState(cartStateList);

  const navigate = useNavigate();

  const orderBtn = () => {
    setCartStateList(cartList)
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
          <span>Orqaga qaytish</span>
        </Link>

        <Title title="Saqlanmalar" />

        <div className={`empty-cart-modal ${showModal && 'show'}`}>
          <div className="modal-card">
            <span onClick={() => setShowModal(false)}><AddIcon /></span>
            <img src="/assets/icn/empty_cart.svg" alt="" />

            <h3>Savatcha bo'sh</h3>

            <Link to="/">
              <Button type="button">
                Menyuga qaytish
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
                  <h3>Savatchaga saqlangan mahsulotlar mavjud emas</h3>
                  <p><Link to="/">Menyu</Link> ga qaytish</p>
                </div>
              </div> :
              <div className="cart-item-list">
                <AnimatePresence>
                {
                  cartList?.map(item => {
                    return (
                      <CartItem 
                        key={item.image} 
                        item={item} 
                        cartList={cartList} 
                        setCartList={setCartList}/>
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
              cartList.length > 0 &&
              <p className='total font-regular text-wh'>
                Jami: <span>
                  {cartList.reduce((a, b) => (+a) + (+b.price), 0)} So'm</span> </p>
            }
          </div>

          <div className="right-side">
            <Button
              onClick={() => orderBtn()}
              color={"primary"}
              
            >
              Buyurtma qilish
            </Button>
          </div>
        </div>
      </Container>

    </div>
  )
}

export default Cart