import React from 'react';
import { Container, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import SendIcon from '@mui/icons-material/Send';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import { Link } from "react-router-dom";
import Title from "../../components/Title/Title";
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useCartState } from '../../Context/cartContext';
import FormControl from '@mui/material/FormControl';
import Swal from 'sweetalert2';
import axios from 'axios';
import { API_URL } from '../../util/const';
import "./style.scss";
const Order = () => {

    const [deliveryId, setDeliveryId] = React.useState(1);
    const [deliveryType, setDeliveryType] = React.useState("YETKAZIB BERISH");
    const [address, setAddress] = React.useState('');    
    const [paymentId, setPaymentId] = React.useState(1);
    const [paymentType, setPaymentType] = React.useState("KARTA ORQALI");
    const [loading, setLoading] = React.useState(false);

    const [cartStateList, setCartStateList] = useCartState();

    const navigate = useNavigate();

    const getDeliveryType = (id) => {
        setDeliveryId(id);
        (id === 1) ?
            setDeliveryType("YETKAZIB BERISH") :
            setDeliveryType("BORIB OLISH")
    }
    const getPaymentType = (id) => {
        setPaymentId(id);
        (id === 1) ?
            setPaymentType("KARTA ORQALI") :
            setPaymentType("NAQD PUL")
    }


    const sendDeliveryRequest = (evt) => {
        evt.preventDefault();
        setLoading(true);

        const {
            user_name,
            phone,
            street,
            descriptions,
            flat,
            call,
        } = evt.target.elements

        const ID = new Date();

        const FD = new FormData();
        FD.append("id", ID.getTime())
        FD.append("user_name", user_name.value)
        FD.append("phone", phone.value)
        FD.append("delivery_type", deliveryType)
        FD.append("address", address)
        FD.append("street", street.value)
        FD.append("flat", flat.value)
        FD.append("descriptions", descriptions.value)
        FD.append("payment", paymentType)
        FD.append("call", call.value)
        FD.append("product_list", JSON.stringify(cartStateList))

        axios.post(`${API_URL}/buyurtma/buyurtma/`, FD)
            .then(res => {
                console.log(res)
                setLoading(false);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `Xaridingiz uchun rahmat! ${deliveryId === 1 ? 'Tez orada mahsulotni yetkazib beramiz' : 'Sizni kutamiz'} 😊!`,
                    showConfirmButton: false,
                    timer: "3000"
                })
                window.localStorage.removeItem("saved__cart__items");
                setCartStateList([])
                navigate("/");
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: "Iltimos ma'lumotlarni tekshiring !!!",
                    showConfirmButton: true
                })
            })
    }
    return (
        <div className="order-content">
            <Container>
                <Link
                    to="/cart"
                    className='back-link d-flex a-center'
                >
                    <KeyboardArrowLeftIcon />
                    <span>в корзину</span>
                </Link>

                <Title title="Оформление заказа" />

                <form onSubmit={sendDeliveryRequest}>
                    <div className="order-card">
                        <h3 className="title">1. Контактная информация</h3>
                        <div className="d-flex">
                            <input autoComplete="off" required type="text" placeholder='Имя*' name="user_name" />
                            <input autoComplete="off" required type="number" placeholder='Телефон*' name="phone" />
                        </div>
                    </div>

                    <div className="order-card">
                        <h3 className="title">2. Доставка</h3>
                        <div className="order-buttons d-flex a-center">
                            <div className="d-flex">
                                <Button type="button" className={`${deliveryId === 1 && "active"}`} onClick={() => getDeliveryType(1)}>Доставка</Button>
                                <Button type="button" className={`${deliveryId === 2 && "active"}`} onClick={() => getDeliveryType(2)}>Самовывоз</Button>
                            </div>
                            <p> <AlarmOnIcon /> Доставим через  1 час 30 минут</p>
                        </div>

                        <h4 className="title mt-3">Адрес доставки</h4>
                        <FormControl className="address-select">
                            <InputLabel id="demo-simple-select-label">Адрес</InputLabel>
                            <Select
                                required
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={address}
                                label="Адрес"
                                className="select"
                                onChange={(evt) => setAddress(evt.target.value)}
                                variant={"standard"}
                            >
                                <MenuItem value={"BEKTEMIR"}>BEKTEMIR</MenuItem>
                                <MenuItem value={"MIROBOD"}>MIROBOD</MenuItem>
                                <MenuItem value={"MIRZO ULUGBEK"}>MIRZO ULUG'BEK</MenuItem>
                                <MenuItem value={"CHILONZOR"}>CHILONZOR</MenuItem>
                                <MenuItem value={"OLMAZOR"}>OLMAZOR</MenuItem>
                                <MenuItem value={"SERGELI"}>SERGELI</MenuItem>
                                <MenuItem value={"SHAYHONTOHUR"}>SHAYHONTOHUR</MenuItem>
                                <MenuItem value={"UCHTEPA"}>UCHTEPA</MenuItem>
                                <MenuItem value={"YAKKASAROY"}>YAKKASAROY</MenuItem>
                                <MenuItem value={"YASHNAOBOD"}>YASHNAOBOD</MenuItem>
                                <MenuItem value={"YUNUSOBOD"}>YUNUSOBOD</MenuItem>
                            </Select>
                        </FormControl>
                        <div className="d-flex address mt-2">
                            <input autoComplete="off" required type="text" placeholder='Укажите улицу*' name="street" />
                            <input autoComplete="off" required type="number" placeholder='Номер дома*' name="flat" />
                        </div>
                        <div className="mt-2">
                            <textarea placeholder="Комментарий" name="descriptions" cols={"100"} rows={"5"}></textarea>
                        </div>
                    </div>
                    <div className="order-card">
                        <h3 className="title">3. Оплатить</h3>
                        <div className="order-buttons d-flex">
                            <Button type="button"
                                className={`${paymentId === 1 && "active"}`} onClick={() => getPaymentType(1)}
                            >
                                Курьеру картой
                            </Button>
                            <Button type="button"
                                className={`${paymentId === 2 && "active"}`} onClick={() => getPaymentType(2)}
                            >
                                Наличными
                            </Button>
                        </div>

                        <h4 className="title mt-3">Хотите мы позвоним?</h4>
                        <div>
                            <input required type="radio" id="want" name="call" value={true} />
                            <label htmlFor="want">Потребуется звонок оператора</label>
                        </div>

                        <div className='mt-1'>
                            <input required type="radio" id="dontwant" name="call" value={false} />
                            <label htmlFor="dontwant">Не перезванивать</label>
                        </div>
                    </div>

                    <div className="order-card">
                        <div className="d-flex a-center">
                            <input type="checkbox" />
                            <p className='text-wh'>Я согласен на обработку моих перс. данных в соответствии
                                <Link to="/delivery-term">с Условиями</Link> 
                            </p>
                            <LoadingButton
                                type="submit"
                                loading={loading}
                                loadingPosition="end"
                                endIcon={<SendIcon />}
                                variant="contained"
                            >
                                Оформить заказ
                            </LoadingButton>
                        </div>
                    </div>
                </form>
            </Container>
        </div >
    )
}

export default Order