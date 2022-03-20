import React from 'react'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
const Dashboard = ({orders, foods, shares}) => {


  return (
    <div className="dashboard">
        <div className="main">
            <div className="item">
              <div className="counts">
                <h2>{foods}</h2>
                <p>Foods</p>
              </div>
              <FastfoodIcon />   
            </div>
            <div className="item">
              <div className="counts">
                <h2>{orders?.length}</h2>
                <p>Orders</p>
              </div>
              <BusinessCenterIcon />   
            </div>
            <div className="item">
              <div className="counts">
                <h2>{shares.length}</h2>
                <p>Advertice</p>
              </div>
              <AddTaskRoundedIcon />   
            </div>
            <div className="item">
              <div className="counts">
                <h2>{`${'20003 545'.substr(0,4)}.00`}$</h2>
                <p>Earnings</p>
              </div>
              <MonetizationOnIcon />   
            </div>
        </div>

    </div>
  )
}

export default Dashboard