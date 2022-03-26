import React from 'react';
import { Container, Button, TextField, IconButton } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import SendIcon from '@mui/icons-material/Send';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
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
import InputValidMask from '../../components/InputValidMask/InputValidMask';
import "./style.scss";
const Order = () => {

    const [deliveryId, setDeliveryId] = React.useState(1);
    const [deliveryType, setDeliveryType] = React.useState("YETKAZIB BERISH");
    const [address, setAddress] = React.useState('');
    const [paymentId, setPaymentId] = React.useState(1);
    const [paymentType, setPaymentType] = React.useState("KARTA ORQALI");
    const [loading, setLoading] = React.useState(false);
    const [tel, setTel] = React.useState('+998 ');
    const [cardCode, setCardCode] = React.useState('');
    const [isTrueCode, setIsTrueCode] = React.useState(true);
    const [showModal, setShowModal] = React.useState(false);
    const [selectedPay, setSelectedPay] = React.useState(1);
    const [isPaymentDone, setIsPaymentDone] = React.useState(true);

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

        // if(isPaymentDone){

        setLoading(true);

        const {
            user_name,
            street,
            descriptions,
            flat,
            call,
        } = evt.target.elements

        const FD = new FormData();
        
        FD.append("user_name", user_name.value)
        FD.append("phone", tel.split("").filter(e => e !== " " && e !== "(" && e !== ")" && e !== "+").join(""))
        FD.append("delivery_type", deliveryType)
        FD.append("address", address)
        FD.append("street", street.value)
        FD.append("flat", flat.value)
        FD.append("descriptions", descriptions.value)
        FD.append("payment", paymentType)
        FD.append("call", call.value)
        FD.append("product_list", JSON.stringify(cartStateList))

        console.log({
            user_name: user_name.value,
            tel: tel.split("").filter(e => e !== " " && e !== "(" && e !== ")" && e !== "+").join(""),
            deliveryType: deliveryType,
            address: address,
            street: street.value,
            flat: flat.value,
            descriptions: descriptions.value,
            paymentType: paymentType,
            call: call.value,
            cartStateList: cartStateList,
        })

        axios.post(`${API_URL}/buyurtma/buyurtma/`, FD)
            .then(res => {
                setLoading(false);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `Xaridingiz uchun rahmat! ${deliveryId === 1 ? 'Tez orada mahsulotni yetkazib beramiz' : 'Sizni kutamiz'} 😊!`,
                    showConfirmButton: false,
                    timer: "3000"
                })
                setTimeout(() => {
                    window.localStorage.removeItem("saved__cart__items");
                    setCartStateList([])
                    navigate("/");
                }, 3000)
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

        // } else{
        //     setShowModal(true)
        // }
    }

    const getCardCode = (value) => {
        if (value.length <= 16) {
            setCardCode(value)
        }
    }


    return (
        <div className="order-content">
            <Container>
                <Link
                    to="/cart"
                    className='back-link d-flex a-center'
                >
                    <KeyboardArrowLeftIcon />
                    <span>Orqaga qaytish</span>
                </Link>

                <Title title="Buyurtma" />


                <div className={`payment-modal ${showModal && 'show'}`}>
                    <IconButton className="shut-btn" onClick={() => setShowModal(false)}>
                        <ClearOutlinedIcon />
                    </IconButton>
                    <div className="modal-card w-100">
                        <div className="d-flex j-between a-center w-100 mt-2">
                            <p className={'title'}>To'lov</p>

                            <div className={'card-price'}>120 000 so'm</div>
                        </div>

                        <div className="modal-body">
                            <div className="d-flex j-between a-center mt-3 w-100">
                                <div onClick={() => setSelectedPay(1)} className={`pay ${selectedPay === 1 && 'select'}`}>
                                    <img src="/assets/img/payme.jpg" alt="payme" />
                                </div>
                                <div onClick={() => setSelectedPay(2)} className={`pay ${selectedPay === 2 && 'select'}`}>
                                    <img src="/assets/img/uzcard.jpg" alt="click" />
                                </div>
                                <div onClick={() => setSelectedPay(3)} className={`pay ${selectedPay === 3 && 'select'}`}>
                                    <img src="/assets/img/click.jpg" alt="payme" />
                                </div>
                                <div onClick={() => setSelectedPay(4)} className={`pay ${selectedPay === 4 && 'select'}`}>
                                    <img src="/assets/img/humo.jpg" alt="click" />
                                </div>
                            </div>

                            <div className="card-input mt-3">
                                <span className={'error-code'}>{!isTrueCode && 'Kod 16 xonadan oshib ketdi!!!'}</span>
                                <TextField
                                    autoComplete={false}
                                    type="text"
                                    value={cardCode}
                                    onChange={(e) => getCardCode(e.target.value)}
                                    placeholder={'8600000000000000'}
                                    label={"Karta raqami"}
                                    helperText={'16 xonali karta raqamingizni kiriting!'}
                                    className={'w-50 w-100-in mt-3 text-wh '}>
                                </TextField>
                            </div>
                        </div>
                        <Button type={"button"} className={'confirm-btn w-100'} variant={'contained'} color={'success'}>OK</Button>
                    </div>
                </div>

                <div className={`fade-m ${showModal && 'active'}`}></div>

                {/* sendDeliveryRequest */}

                <form onSubmit={sendDeliveryRequest}>
                    <div className="order-card">
                        <h3 className="title">1. Kontakt ma'lumotlari</h3>
                        <div className="d-flex inp">
                            <TextField
                                label="Ismingiz"
                                autoComplete="off"
                                required
                                type="text"
                                name="user_name"
                                className='me-1 w-50 border w-100-in' />
                            <InputValidMask
                                mask="+998 \(99) 999 99 99"
                                maskChar=" "
                                label='Telefon raqam*'
                                value={tel}
                                onChange={evt => setTel(evt.target.value)}
                                className="w-50 border tel-number w-100-in"
                            />

                        </div>
                    </div>

                    <div className="order-card">
                        <h3 className="title">2. Yetkazish:</h3>
                        <div className="order-buttons ss d-flex a-center">
                            <div className="d-flex">
                                <Button type="button" className={`${deliveryId === 1 && "active"}`} onClick={() => getDeliveryType(1)}>Yetkazib berish</Button>
                                <Button type="button" className={`${deliveryId === 2 && "active"}`} onClick={() => getDeliveryType(2)}>Borib olish</Button>
                            </div>
                            {/* <p> <AlarmOnIcon /> Доставим через  1 час 30 минут</p> */}
                        </div>

                        <h3 className="title mt-3">3. Manzilingiz:</h3>
                        <FormControl className="address-select ">
                            <InputLabel id="demo-simple-select-label">Tuman</InputLabel>
                            <Select
                                required
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={address}
                                label="Адрес"
                                className="select me-1 border "
                                onChange={(evt) => setAddress(evt.target.value)}
                                variant={"outlined"}
                            >
                                <MenuItem value={"BEKTEMIR"}>Bektemir</MenuItem>
                                <MenuItem value={"MIROBOD"}>Mirobod</MenuItem>
                                <MenuItem value={"MIRZO ULUGBEK"}>Mirzo Ulug'bek</MenuItem>
                                <MenuItem value={"CHILONZOR"}>Chilonzor</MenuItem>
                                <MenuItem value={"OLMAZOR"}>Olmazor</MenuItem>
                                <MenuItem value={"SERGELI"}>Sergeli</MenuItem>
                                <MenuItem value={"SHAYHONTOHUR"}>Shayhontohur</MenuItem>
                                <MenuItem value={"UCHTEPA"}>Uchtepa</MenuItem>
                                <MenuItem value={"YAKKASAROY"}>Yakkasaroy</MenuItem>
                                <MenuItem value={"YASHNAOBOD"}>Yashnabod</MenuItem>
                                <MenuItem value={"YUNUSOBOD"}>Yunusobod</MenuItem>
                            </Select>
                        </FormControl>
                        <div className="d-flex address mt-2 inp">
                            <TextField
                                className="me-1 w-50 border w-100-in "
                                autoComplete="off"
                                required
                                type="text"
                                label="Ko'cha nomi"
                                name="street" />

                            <TextField
                                className="ms-1 w-50 border w-100-in"
                                autoComplete="off"
                                required
                                type="number"
                                label="Xonadon raqami"
                                name="flat" />
                        </div>
                        <div className="mt-2">
                            <textarea
                                placeholder="Izoh qoldiring"
                                name="descriptions"
                                cols={"100"}
                                rows={"5"}
                                className="border"
                            ></textarea>
                        </div>
                    </div>
                    <div className="order-card">
                        <h3 className="title">3. To'lov</h3>
                        <div className="order-buttons d-flex">
                            <Button type="button"
                                className={`${paymentId === 1 && "active"}`} onClick={() => getPaymentType(1)}
                            >
                                Karta orqali
                            </Button>
                            <Button type="button"
                                className={`${paymentId === 2 && "active"}`} onClick={() => getPaymentType(2)}
                            >
                                Naqd pulda
                            </Button>
                        </div>

                        <h4 className="title mt-3">Qo'ng'rioq qilishimmizni xohlaysizmi?</h4>
                        <div>
                            <input
                                required
                                type="radio"
                                id="want"
                                name="call"
                                value={true}
                                defaultChecked={true} />
                            <label htmlFor="want" className="ms-1">Hodim qo'ng'irog'i talab qilinadi</label>
                        </div>

                        <div className='mt-1'>
                            <input
                                required
                                type="radio"
                                id="dontwant"
                                name="call"
                                value={false} />
                            <label htmlFor="dontwant" className="ms-1">Yo'q shart emas</label>
                        </div>
                    </div>

                    <div className="order-card">
                        <div className="d-flex a-center">

                            <LoadingButton
                                type="submit"
                                // onClick={() => setShowModal(true)}
                                loading={loading}
                                loadingPosition="end"
                                endIcon={<SendIcon />}
                                variant="contained"
                                className="confirm"
                            >
                                Yuborish
                            </LoadingButton>
                        </div>
                    </div>
                </form>
            </Container>
        </div >
    )
}

export default Order