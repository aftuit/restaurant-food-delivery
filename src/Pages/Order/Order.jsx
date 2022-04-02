import React from 'react';
import {Container, Button, TextField, IconButton} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import SendIcon from '@mui/icons-material/Send';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import {Link} from "react-router-dom";
import Title from "../../components/Title/Title";
import {useNavigate} from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {useCartState} from '../../Context/cartContext';
import FormControl from '@mui/material/FormControl';
import Swal from 'sweetalert2';
import axios from 'axios';
import {API_URL} from '../../util/const';
import {LangContext} from "../../Context/localization"
import InputValidMask from '../../components/InputValidMask/InputValidMask';
import "./style.scss";

const Order = () => {

    const {lang, languageType} = React.useContext(LangContext);

    const [deliveryId, setDeliveryId] = React.useState(1);
    const [deliveryType, setDeliveryType] = React.useState("YETKAZIB BERISH");
    const [address, setAddress] = React.useState('');
    const [paymentId, setPaymentId] = React.useState(1);
    const [paymentType, setPaymentType] = React.useState("NAQD PUL");
    const [loading, setLoading] = React.useState(false);
    const [tel, setTel] = React.useState('+998 ');
    const [cardCode, setCardCode] = React.useState('');
    const [showModal, setShowModal] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [street, setStreet] = React.useState('');
    const [descriptions, setDescriptions] = React.useState('');
    const [flat, setFlat] = React.useState('');
    const [call, setCall] = React.useState(true);
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
            setPaymentType("NAQD PUL") :
            setPaymentType("KARTA ORQALI")
    }
    const sendDeliveryRequest = (evt) => {
        evt.preventDefault();
        setLoading(true);
        const FD = new FormData();
        FD.append("user_name", username)
        FD.append("phone", tel.split("").filter(e => e !== " "
            && e !== "("
            && e !== ")"
            && e !== "+").join(""))
        FD.append("delivery_type", deliveryType)
        FD.append("address", address)
        FD.append("street", street)
        FD.append("flat", flat)
        FD.append("descriptions", descriptions)
        FD.append("payment", paymentType)
        FD.append("call", call)
        FD.append("product_list", JSON.stringify(cartStateList))

        axios.post(`${API_URL}/buyurtma/buyurtma/`, FD)
            .then(res => {
                setLoading(false);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `Xaridingiz uchun rahmat! ${deliveryId === 1 ? '\nTez orada mahsulotni yetkazib beramiz' : '\nSizni kutamiz'} 😊!`,
                    showConfirmButton: false,
                    timer: "3000"
                })
                setShowModal(false)
                setTimeout(() => {
                    window.localStorage.removeItem("saved__cart__items");
                    setCartStateList([])
                    navigate("/");
                }, 3000)
            })
            .catch(() => {
                setLoading(false)
                setShowModal(false)
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: "Iltimos ma'lumotlarni tekshiring !!!",
                    showConfirmButton: true
                })
            })
    }

    const getCardCode = (value) => {
        if (value.length <= 16) {
            setCardCode(value)
        }
    }
    const GetFilled = () => {
        if (
            address.length === 0 ||
            tel.split("").filter(e => e !== " "
                && e !== "("
                && e !== "_"
                && e !== ")"
                && e !== "+").join("").length < 12 ||
            username.length === 0 ||
            street.length === 0 ||
            descriptions.length === 0 ||
            flat.length === 0
        ) return false;
        else return true
    }
    return (
        <div className="order-content">
            <Container>
                <Link
                    to="/cart"
                    className='back-link d-flex a-center'
                >
                    <KeyboardArrowLeftIcon/>
                    <span className={'font-regular'}>{lang[languageType].goBack}</span>
                </Link>
                <Title title={lang[languageType].order.title}/>
                <div className={`fade-m ${showModal && 'active'}`}></div>
                <form onSubmit={sendDeliveryRequest}>
                    <div className={`payment-modal ${showModal && 'show'}`}>
                        <IconButton className="shut-btn" onClick={() => setShowModal(false)}>
                            <ClearOutlinedIcon/>
                        </IconButton>
                        <div className="modal-card w-100">
                            <div className="d-flex j-between a-center w-100 mt-2">
                                <p className={'title font-semibolditalic'}>{lang[languageType].order.modal.title}</p>
                            </div>
                            <div className="modal-body">
                                <div className="card-input mt-3">
                                    <TextField
                                        autoComplete="off"
                                        type="text"
                                        value={cardCode}
                                        onChange={(e) => getCardCode(e.target.value)}
                                        placeholder={'8600000000000000'}
                                        label={lang[languageType].order.modal.input}
                                        helperText={lang[languageType].order.modal.label}
                                        className={'w-50 w-100-in mt-3 text-wh '}>
                                    </TextField>
                                </div>
                            </div>
                            <Button type={"submit"}
                                    className={'confirm-btn w-100'}
                                    variant={'contained'}
                                    color={'success'}
                                    disabled={cardCode.length === 16 ? false : true}
                            >OK</Button>
                        </div>
                    </div>
                    <div className="order-card">
                        <h3 className="title font-semibolditalic">1. {lang[languageType].order.contact.title}</h3>
                        <div className="d-flex inp">
                            <TextField
                                label={lang[languageType].order.contact.name}
                                autoComplete="off"
                                required
                                type="text"
                                value={username}
                                onChange={(evt) => setUsername(evt.target.value)}
                                name="user_name"
                                className='me-1 w-50 border w-100-in'/>
                            <InputValidMask
                                mask="+998 \(99) 999 99 99"
                                maskChar=" "
                                label={`${lang[languageType].order.contact.tel}*`}
                                value={tel}
                                onChange={evt => setTel(evt.target.value)}
                                className="w-50 border tel-number w-100-in"
                            />
                        </div>
                    </div>

                    <div className="order-card">
                        <h3 className="title font-semibolditalic">2. {lang[languageType].order.deliver.title}</h3>
                        <div className="order-buttons ss d-flex a-center">
                            <div className="d-flex">
                                <Button type="button" className={`${deliveryId === 1 && "active"}`}
                                        onClick={() => getDeliveryType(1)}>{lang[languageType].order.deliver.btn1}</Button>
                                <Button type="button" className={`${deliveryId === 2 && "active"}`}
                                        onClick={() => getDeliveryType(2)}>{lang[languageType].order.deliver.btn2}</Button>
                            </div>
                        </div>

                        <h3 className="title mt-3 font-semibolditalic">3. {lang[languageType].order.address.title}</h3>
                        <FormControl className="address-select ">
                            <InputLabel id="demo-simple-select-label">{lang[languageType].order.address.dist.title}</InputLabel>
                            <Select
                                required
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={address}
                                label="Адрес"
                                className="select mee-1 border"
                                onChange={(evt) => setAddress(evt.target.value)}
                                variant={"outlined"}
                            >
                                {
                                    lang[languageType].order.address.dist.obl.map(item => <MenuItem value={item.val}>{item.name}</MenuItem>)
                                }
                                {/*<MenuItem value={"BEKTEMIR"}>Bektemir</MenuItem>*/}
                                {/*<MenuItem value={"MIROBOD"}>Mirobod</MenuItem>*/}
                                {/*<MenuItem value={"MIRZO ULUGBEK"}>Mirzo Ulug'bek</MenuItem>*/}
                                {/*<MenuItem value={"CHILONZOR"}>Chilonzor</MenuItem>*/}
                                {/*<MenuItem value={"OLMAZOR"}>Olmazor</MenuItem>*/}
                                {/*<MenuItem value={"SERGELI"}>Sergeli</MenuItem>*/}
                                {/*<MenuItem value={"SHAYHONTOHUR"}>Shayhontohur</MenuItem>*/}
                                {/*<MenuItem value={"UCHTEPA"}>Uchtepa</MenuItem>*/}
                                {/*<MenuItem value={"YAKKASAROY"}>Yakkasaroy</MenuItem>*/}
                                {/*<MenuItem value={"YASHNAOBOD"}>Yashnabod</MenuItem>*/}
                                {/*<MenuItem value={"YUNUSOBOD"}>Yunusobod</MenuItem>*/}
                            </Select>
                        </FormControl>
                        <div className="d-flex address mt-2 inp">
                            <TextField
                                className="me-1 w-50 border w-100-in "
                                autoComplete="off"
                                required
                                type="text"
                                value={street}
                                onChange={(evt) => setStreet(evt.target.value)}
                                label={lang[languageType].order.address.street} />

                            <TextField
                                className="ms-1 w-50 border w-100-in"
                                autoComplete="off"
                                required
                                value={flat}
                                onChange={(evt) => setFlat(evt.target.value)}
                                type="number"
                                label={lang[languageType].order.address.flat}
                                name="flat"/>
                        </div>
                        <div className="mt-2">
                            <textarea
                                placeholder={lang[languageType].order.address.comment}
                                name="descriptions"
                                cols={"100"}
                                rows={"5"}
                                value={descriptions}
                                onChange={(evt) => setDescriptions(evt.target.value)}
                                className="border text-wh"
                                required
                            ></textarea>
                        </div>
                    </div>
                    <div className="order-card">
                        <h3 className="title font-semibolditalic">4. {lang[languageType].order.payment.title}</h3>
                        <div className="order-buttons d-flex">
                            <Button type="button"
                                    className={`${paymentId === 1 && "active"}`} onClick={() => getPaymentType(1)}
                            >
                                {lang[languageType].order.payment.btn1}
                            </Button>
                            <Button type="button"
                                    className={`${paymentId === 2 && "active"}`} onClick={() => getPaymentType(2)}
                            >
                                {lang[languageType].order.payment.btn2}
                            </Button>
                        </div>

                        <h4 className="title mt-3 font-semibolditalic">{lang[languageType].order.call.title}</h4>
                        <div>
                            <input
                                required
                                type="radio"
                                id="want"
                                name="call"
                                onChange={() => setCall(true)}
                                defaultChecked={true}/>
                            <label htmlFor="want" className="ms-1">{lang[languageType].order.call.opt1}</label>
                        </div>

                        <div className='mt-1'>
                            <input
                                required
                                type="radio"
                                id="dontwant"
                                name="call"
                                onChange={() => setCall(false)}
                            />
                            <label htmlFor="dontwant" className="ms-1">{lang[languageType].order.call.opt2}</label>
                        </div>
                    </div>

                    <div className="order-card">
                        <div className="d-flex a-center">
                            <LoadingButton
                                type={paymentType === "KARTA ORQALI" ? "button" : "submit"}
                                onClick={() => setShowModal(paymentType === "KARTA ORQALI" ? true : false)}
                                loading={loading}
                                loadingPosition="end"
                                endIcon={<SendIcon/>}
                                variant="contained"
                                className={`confirm ${GetFilled() === false && 'disabled'}`}
                                disabled={!GetFilled()}
                            >
                                {lang[languageType].order.btn}
                            </LoadingButton>
                        </div>
                    </div>
                </form>
            </Container>
        </div>
    )
}

export default Order