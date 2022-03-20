import React from 'react'
// import Login from "../Login/Login";
import ADOrder from "./ADOrder";
import ADShare from "./ADShare";
import ADFoods from "./ADFoods";
import Dashboard from "./Dashboard";
import { Routes, Route, NavLink, Link, useLocation } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { IconButton } from '@mui/material';
import { useToken } from '../../../Context/loginContext';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { Button } from "@mui/material";
import { API_URL } from '../../../util/const';
import axios from "axios";
import "./style.scss";

const AdminPanel = () => {

  const [stateOrders, setStateOrders] = React.useState([])
  const [filteredOrder, setFilteredOrder] = React.useState([])
  const [foodDatas, setFoodDatas] = React.useState();
  const [countFoods, setCountFoods] = React.useState('')
  const [shares, setShares] = React.useState([])
  const [tabPane, setTabPane] = React.useState(false);

  const [search, setSearch] = React.useState('');
  const [filtered, setFiltered] = React.useState('all');
  const [address, setAddress] = React.useState('');
  const [delivery_type, setDelivery] = React.useState('');
  const [payment, setPayment] = React.useState('');
  const [call, setCall] = React.useState('');

  const inputEl = React.useRef(null);

  const [setToken] = useToken(true);

  const location = useLocation();

  const getFoods = () => {
    axios.get(API_URL)
      .then(res => {
        setFoodDatas([...res.data])
        setCountFoods(
          res?.data?.filter((item, index) => index !== 0)
            .reduce((a, b) => +a + +b?.data?.length, 0)
        )
      })
      .catch(err => console.log(err))
  }

  const getOrders = () => {
    axios.get(`${API_URL}/buyurtma/buyurtma/`)
      .then(res => {
        setStateOrders(res.data)
        setFilteredOrder(res.data)
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }

  const getShares = () => {
    axios.get(`${API_URL}/advertising/`)
      .then(res => setShares(res.data))
      .catch(err => console.error(err))
  }

  const signOut = () => {
    window.localStorage.removeItem("token");
    setToken(false);
  }

  React.useEffect(() => {
    getOrders();
    getFoods();
    getShares();
  }, [])


  // function filterOrders(filterItem){
  //   setStateOrders(filteredOrder.filter(e => e[filterItem] === filterItem))
  // }

  React.useEffect(() => {
    // if (address !== '' || delivery_type !== '' || payment !== '' || call !== '') {
    //   setStateOrders(filteredOrder.filter(e => e.address === address))
    //   setStateOrders(filteredOrder.filter(e => e.delivery_type === delivery_type))
    //   setStateOrders(filteredOrder.filter(e => e.payment === payment))
    //   setStateOrders(filteredOrder.filter(e => e.call === call))
    // } else {
    //   setStateOrders(filteredOrder)
    // }
  }, [address, delivery_type, payment, call, filteredOrder])




  return (
    <div className='admin-panel-content d-flex'>
      <div className={`left-side ${tabPane && "tab"}`}>
        <h1 style={{ textAlign: "center" }}>LOGO</h1>

        <div className="links-content mt-3">
          <ul>
            <li><NavLink to="/admin-panel/dashboard" className="d-flex a-center">
              <PaletteRoundedIcon />
              {!tabPane && <span>Dashboard</span>}
            </NavLink></li>
            <li><NavLink to="/admin-panel/orders" className="d-flex a-center">
              <BusinessCenterIcon />
              {!tabPane && <span>Orders</span>}
            </NavLink></li>
            <li><NavLink to="/admin-panel/foods" className="d-flex a-center">
              <FastfoodIcon />

              {!tabPane && <span>Foods</span>}
            </NavLink></li>
            <li><NavLink to="/admin-panel/advertice" className="d-flex a-center">
              <AddTaskRoundedIcon />

              {!tabPane && <span>Advertice</span>}
            </NavLink></li>
            <li><NavLink to="/" className="d-flex a-center">
              <HomeIcon />

              {!tabPane && <span>Home</span>}
            </NavLink></li>
            <li className="nav-item" onClick={() => signOut()}>
              <Link to="/admin-panel" className={"nav-link"}>
                <ExitToAppIcon /> {!tabPane && <span>Log out</span>}
              </Link>
            </li>
          </ul>

        </div>

      </div>

      <div className={`right-side ${tabPane && "tab"}`}>
        <div className="admin-panel-navbar d-flex j-between">
          <Button type="button" onClick={() => setTabPane(!tabPane)}><MenuSharpIcon /> </Button>

          <div className={`searching search-filter d-flex a-center ${location.pathname.includes("order") && "ord"}`}>
            <div className='w-100 d-flex a-center'>
              <SearchOutlinedIcon className="search" />
              <input
                ref={inputEl}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                type="text"
                placeholder={"search..."}
              />
              {
                search.length > 0 &&
                <IconButton aria-label="delete"
                  className='del'
                  onClick={() => setSearch('')}
                >
                  <ClearOutlinedIcon className="cancel" />
                </IconButton>
              }
            </div>
            {
              location.pathname.includes("food") &&
              <select value={filtered} onChange={(evt) => setFiltered(evt.target.value)}>
                <option value="all">Hammasi</option>
                <option value="yaxnataomlar">Yaxna taomlar</option>
                <option value="suyuqtaomlar">Suyuq taomlar</option>
                <option value="qaynoqtaomlar">Qaynoq taomlar</option>
                <option value="baliqlitaomlar">Baliqli taomlar</option>
                <option value="pizza">Pitsa</option>
                <option value="goshtlitaomlar">Go'shtli taomlar</option>
                <option value="ichimliklar">Ichimliklar</option>
              </select>
            }
          </div>
          {
            location.pathname.includes("order") &&

            <div className="select-group">
              <div>
                <p>Address</p>
                <select
                  value={address}
                  onChange={(evt) => setAddress(evt.target.value)}
                >
                  <option value={""}>Hammasi</option>
                  <option value={"BEKTEMIR"}>BEKTEMIR</option>
                  <option value={"MIROBOD"}>MIROBOD</option>
                  <option value={"MIRZO ULUGBEK"}>MIRZO ULUG'BEK</option>
                  <option value={"CHILONZOR"}>CHILONZOR</option>
                  <option value={"OLMAZOR"}>OLMAZOR</option>
                  <option value={"SERGELI"}>SERGELI</option>
                  <option value={"SHAYHONTOHUR"}>SHAYHONTOHUR</option>
                  <option value={"UCHTEPA"}>UCHTEPA</option>
                  <option value={"YAKKASAROY"}>YAKKASAROY</option>
                  <option value={"YASHNAOBOD"}>YASHNAOBOD</option>
                  <option value={"YUNUSOBOD"}>YUNUSOBOD</option>
                </select>
              </div>
              <div>
                <p>Delivery</p>
                <select
                  value={delivery_type}
                  onChange={(evt) => setDelivery(evt.target.value)}
                >
                  <option value="">Hammasi</option>
                  <option value="BORIB OLISH">Borib olish</option>
                  <option value="YETKAZIBBERISH">Yetkazib berish</option>
                </select>
              </div>
              <div>
                <p>Payment</p>
                <select
                  value={payment}
                  onChange={(evt) => setPayment(evt.target.value)}
                >
                  <option value="">Hammasi</option>
                  <option value="KARTA ORQALI">Karta orqali</option>
                  <option value="NAQD PUL">Naqd pul</option>
                </select>
              </div>
              <div>
                <p>Call</p>
                <select
                  value={call}
                  onChange={(evt) => setCall(evt.target.value)}
                >
                  <option value="">Hammasi</option>
                  <option value="true">Ha</option>
                  <option value="false">Yo'q</option>
                </select>
              </div>
            </div>
          }

          <div className="administrator d-flex a-center">
            <AccountCircleIcon />
            <div className="admin-info">
              <h4>Administrator</h4>
              <p>Main admin</p>
            </div>
          </div>
        </div>
        <Routes>
          <Route exact={true} path='/dashboard' element={<Dashboard
            orders={stateOrders}
            foods={countFoods}
            shares={shares} />}
          />
          <Route exact={true} path='/orders' element={<ADOrder
            state={stateOrders}
            setState={setStateOrders}
            getOrders={getOrders} />}
            search={search}
          />
          <Route exact={true} path='/advertice' element={<ADShare
            shares={shares}
            getShares={getShares} />}
          />
          <Route exact={true} path='/foods' element={<ADFoods
            search={search}
            filtered={filtered}
            state={foodDatas}
            setState={setFoodDatas}
            getFoods={getFoods}
          />} />
        </Routes>
      </div>
    </div>
  )
}

export default AdminPanel