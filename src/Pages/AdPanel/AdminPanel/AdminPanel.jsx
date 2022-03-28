import React from 'react'
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
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import FilterListIcon from '@mui/icons-material/FilterList';
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
  const [isFiltering, setIsFiltering] = React.useState(false);

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
  }

  const getOrders = () => {
    axios.get(`${API_URL}/buyurtma/buyurtma/`)
      .then(res => {
        setStateOrders(res.data)
        setFilteredOrder(res.data)
      })
  }

  const getShares = () => {
    axios.get(`${API_URL}/advertising/`)
      .then(res => setShares(res.data))
      .catch(err => console.error(err))
  }

  const signOut = () => {
    window.localStorage.removeItem("_token_access_");
    setToken(false);
  }

  React.useEffect(() => {
    getOrders();
    getFoods();
    getShares();
  }, [])

  const filterOrders = () => {

    setStateOrders(filteredOrder.filter(e => e.address.toLowerCase().includes(address.toLowerCase()))
      .filter(k => k.delivery_type.toLowerCase().includes(delivery_type.toLowerCase()))
      .filter(g => g.payment.toLowerCase().includes(payment.toLowerCase()))
    )
  }

  return (
    <div className='admin-panel-content d-flex'>
      <div className={`left-side ${tabPane && "tab"}`}>
        <h2 className="logo">ACSESS 300</h2>
        <div className="links-content mt-3">
          <ul>
            <li><NavLink to="/admin-panel/dashboard" className="d-flex a-center">
              <PaletteRoundedIcon />
              {!tabPane && <span>Dashboard</span>}
            </NavLink></li>
            <li><NavLink to="/admin-panel/orders" className="d-flex a-center">
              <BusinessCenterIcon />
              {!tabPane && <span>Buyurtmalar</span>}
            </NavLink></li>
            <li><NavLink to="/admin-panel/foods" className="d-flex a-center">
              <FastfoodIcon />

              {!tabPane && <span>Xomashiyo</span>}
            </NavLink></li>
            <li><NavLink to="/admin-panel/advertice" className="d-flex a-center">
              <AddTaskRoundedIcon />

              {!tabPane && <span>Reklama</span>}
            </NavLink></li>
            <li><NavLink to="/" className="d-flex a-center">
              <HomeIcon />

              {!tabPane && <span>Bosh sahifa</span>}
            </NavLink></li>         
            <li className="nav-item" onClick={() => signOut()}>
              <Link to="/admin-panel" className={"nav-link"}>
                <ExitToAppIcon /> {!tabPane && <span>Chiqish</span>}
              </Link>
            </li>
          </ul>
        </div>

      </div>

      <div className={`right-side ${tabPane && "tab"}`}>
        {
          !location.pathname.includes('account') &&
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
                  placeholder={"qidiruv..."}
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
              isFiltering &&
              <div className="filter-div d-flex a-center j-between">
                <div className="select-group">
                  <div>
                    <p>Manzil</p>
                    <select
                      value={address}
                      onChange={(evt) => setAddress(evt.target.value)}
                    >
                      <option value="">Hammasi</option>
                      <option value="BEKTEMIR">BEKTEMIR</option>
                      <option value="MIROBOD">MIROBOD</option>
                      <option value="MIRZO">MIRZO ULUG'BEK</option>
                      <option value="CHILONZOR">CHILONZOR</option>
                      <option value="OLMAZOR">OLMAZOR</option>
                      <option value="SERGELI">SERGELI</option>
                      <option value="SHAYHONTOHUR">SHAYHONTOHUR</option>
                      <option value="UCHTEPA">UCHTEPA</option>
                      <option value="YAKKASAROY">YAKKASAROY</option>
                      <option value="YASHNAOBOD">YASHNAOBOD</option>
                      <option value="YUNUSOBOD">YUNUSOBOD</option>
                    </select>
                  </div>
                  <div>
                    <p>Yetkazish turi</p>
                    <select
                      value={delivery_type}
                      onChange={(evt) => setDelivery(evt.target.value)}
                    >
                      <option value="">Hammasi</option>
                      <option value="BORIB OLISH">Borib olish</option>
                      <option value="YETKAZIB BERISH">Yetkazib berish</option>
                    </select>
                  </div>
                  <div>
                    <p>To'lov</p>
                    <select
                      value={payment}
                      onChange={(evt) => setPayment(evt.target.value)}
                    >
                      <option value="">Hammasi</option>
                      <option value="KARTA ORQALI">Karta orqali</option>
                      <option value="NAQD PUL">Naqd pul</option>
                    </select>
                  </div>
                </div>
                <Button type="button" onClick={() => filterOrders()}><TrendingFlatIcon /> </Button>
              </div>

            }

            <div className="administrator d-flex a-center">
              {

                location.pathname.includes("order") &&
                <>
                  {isFiltering ?
                  <IconButton
                    type="button"
                    variant="outlined"
                    aria-label="delete"
                    className="me-1 filter"
                    onClick={() => setIsFiltering(!isFiltering)}
                  >
                    <ClearOutlinedIcon />
                  </IconButton> :
                  <Button 
                    onClick={() => setIsFiltering(!isFiltering)} 
                    title="filter" 
                    variant="outlined" 
                    color="secondary">
                    <FilterListIcon />
                    Saralash
                  </Button>}
                  </>

              }
              <div className='d-flex a-center'>
                <AccountCircleIcon />
                <div className="admin-info">
                  <h4>Administrator</h4>
                  <p>Main admin</p>
                </div>
              </div>
            </div>
          </div>
        }
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
            setShares={setShares}
            search={search}
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
    </div >
  )
}

export default AdminPanel