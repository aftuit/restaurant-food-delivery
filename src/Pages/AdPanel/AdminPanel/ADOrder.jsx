import React from 'react';
import axios from "axios";
import { Button } from '@mui/material';
import { API_URL } from '../../../util/const';
import ReactReadMoreReadLess from "react-read-more-read-less";

const ADOrder = ({getOrders, state}) => {

  
  const removeItem = (id) => {

    axios.delete(`${API_URL}/buyurtma/buyurtma/${id}/`)
      .then(res => {
        getOrders();
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <div>
      {
        state?.map(item => {
          return (item.id > 27) ? (
            <div className="ad-order-card" key={item.id}>
              <div className="ad-order-card-header">
                <h3>Comment:</h3> {item.descriptions !== ""
                  ? <ReactReadMoreReadLess
                    charLimit={80}
                    ellipsis="..."                    
                    readMoreText="more ▼"
                    readLessText="less ▲"
                  >
                    {item.descriptions}
                  </ReactReadMoreReadLess>
                  : <i>No Comment!</i>}
              </div>
              <div className="ad-order-card-body">
                <div className="food-row d-flex">
                  {
                    JSON.parse(item?.product_list)?.map(list => {
                      return (
                        <div className="food-card" key={list.id}>
                          <img src={list.image.includes("http")
                            ? list.image
                            : API_URL + list.image}
                            alt="" />
                          <div className="food-card-body">
                            <div className="d-flex j-between">
                              <h4>Name:</h4>
                              <p>{list.name}</p>
                            </div>
                            <div className="d-flex j-between">
                              <h4>Price:</h4>
                              <p>{list.price} ₽</p>
                            </div>
                            <div className="d-flex j-between">
                              <h4>Weight:</h4>
                              <p>{
                                list.weight ?
                                  `${list.weight} г` :
                                  list.size
                              }</p>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>

                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Street</th>
                      <th>Flat</th>
                      <th>Delivery Type</th>
                      <th>Payment</th>
                      <th>Call</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{item.user_name}</td>
                      <td>{item.phone}</td>
                      <td>{item.address}</td>
                      <td>{item.street}</td>
                      <td>{item.flat}</td>
                      <td>{item.delivery_type}</td>
                      <td>{item.payment}</td>
                      <td>{item.call ? "Yes" : "No"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="ad-order-card-footer d-flex j-between">
                <Button variant="contained" disabled>
                  Total: {JSON.parse(item.product_list)?.reduce((a, b) => +a + +b.price, 0)} ₽
                </Button>

                <Button
                  variant="contained"
                  onClick={() => removeItem(item.id)}
                >
                  Done
                </Button>
              </div>
            </div>
          ) : (<></>)
        })
      }

    </div>
  )
}

export default ADOrder