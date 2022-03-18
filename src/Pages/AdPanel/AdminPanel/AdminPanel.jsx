import React from 'react'
// import Login from "../Login/Login";
import ADOrder from "./ADOrder";
import ADShare from "./ADShare";
import ADFoods from "./ADFoods";
import Dashboard from "./Dashboard";
import { Routes, Route, NavLink, Link } from "react-router-dom";
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
import axios from "axios"

import "./style.scss";
const AdminPanel = () => {

  const [stateOrders, setStateOrders] = React.useState([])
  const [foodDatas, setFoodDatas] = React.useState();
  const [countFoods, setCountFoods] = React.useState('')
  const [shares, setShares] = React.useState([])

  const getFoods = () => {
    axios.get(API_URL)
      .then(res => {
        setFoodDatas([...res.data])
        setCountFoods(
          res?.data?.filter((item, index) => index !== 0)
          .reduce((a,b) => +a + +b?.data?.length, 0)
          )
      })
      .catch(err => console.log(err))
  }

  const getOrders = () => {
    axios.get(`${API_URL}/buyurtma/buyurtma/`)
      .then(res => {
        setStateOrders(res.data)
      })
      .catch(err => console.log(err))
  }

  const getShares = () => {
    axios.get(`${API_URL}/advertising/`)
    .then(res => setShares(res.data))
    .catch(err => console.error(err))
  }

  React.useEffect(() => {
    getOrders();
    getFoods();
    getShares();
  }, [])

//getOrders, getFoods, getShares

  const [tabPane, setTabPane] = React.useState(false);

  const inputEl = React.useRef(null);

  const [search, setSearch] = React.useState('');
  const [setToken] = useToken(true);

  const signOut = () => {
    window.localStorage.removeItem("token");
    setToken(false);
  }

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
            <li><NavLink to="/admin-panel/order" className="d-flex a-center">
              <BusinessCenterIcon />
              {!tabPane && <span>Orders</span>}
            </NavLink></li>
            <li><NavLink to="/admin-panel/foods" className="d-flex a-center">
              <FastfoodIcon />

              {!tabPane && <span>Foods</span>}
            </NavLink></li>
            <li><NavLink to="/admin-panel/share" className="d-flex a-center">
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

          <div className={`searching search-filter d-flex a-center`}>

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
                onClick={() => setSearch('')}
              >
                <ClearOutlinedIcon className="cancel" />
              </IconButton>
            }
          </div>

          <div className="administrator d-flex a-center">
            <AccountCircleIcon />
            <div className="admin-info">
              <h4>Administrator</h4>
              <p>Main admin</p>
            </div>
          </div>
        </div>
        <Routes>
          <Route exact={true} path='/dashboard' element={<Dashboard orders={stateOrders} foods={countFoods} shares={shares} />} />
          <Route exact={true} path='/order' element={<ADOrder state={stateOrders} setState={setStateOrders} getOrders={getOrders} />} />
          <Route exact={true} path='/share' element={<ADShare shares={shares} getShares={getShares} />} />
          <Route exact={true} path='/foods' element={<ADFoods state={foodDatas} setState={setFoodDatas} getFoods={getFoods} />} />
        </Routes>
      </div>
    </div>
  )
}

export default AdminPanel