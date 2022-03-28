import React from 'react'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import FastfoodIcon from '@mui/icons-material/Fastfood';
const Dashboard = ({orders, foods, shares}) => {


  return (
    <div className="dashboard">
        <div className="main">
            <div className="item">
              <div className="counts">
                <h2>{foods}</h2>
                <p>Xomashiyolar</p>
              </div>
              <FastfoodIcon />   
            </div>
            <div className="item">
              <div className="counts">
                <h2>{orders?.length}</h2>
                <p>Buyurtmalar</p>
              </div>
              <BusinessCenterIcon />   
            </div>
            <div className="item">
              <div className="counts">
                <h2>{shares.length}</h2>
                <p>Reklamalar</p>
              </div>
              <AddTaskRoundedIcon />   
            </div>
        </div>

    </div>
  )
}

export default Dashboard