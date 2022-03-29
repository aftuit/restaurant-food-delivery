import React from 'react';
import axios from "axios";
import { Button } from '@mui/material';
import Loader from "../../../components/Loader/Loader";
import { API_URL } from '../../../util/const';
import ReactReadMoreReadLess from "react-read-more-read-less";
import { AnimatePresence, motion } from "framer-motion";

const ADOrder = ({ getOrders, state }) => {

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
      <AnimatePresence>
        {
          state.length === 0 ?
            <Loader /> :
            state?.map(item => {
              return (
                <div className="ad-order-card" key={item.id}>
                  <motion.div
                    layout
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="ad-order-card-header">
                      <h3>Izoh:</h3> {item.descriptions !== ""
                        ? <ReactReadMoreReadLess
                          charLimit={80}
                          ellipsis="..."
                          readMoreText="more ▼"
                          readLessText=" less ▲"
                        >
                          {item.descriptions}
                        </ReactReadMoreReadLess>
                        : <i>Izoh yo'q!</i>}
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
                                    <h4>Ismi:</h4>
                                    <p>{list.name}</p>
                                  </div>
                                  <div className="d-flex j-between">
                                    <h4>Narxi:</h4>
                                    <p>{list.price} so'm</p>
                                  </div>
                                  <div className="d-flex j-between">
                                    <h4>Soni:</h4>
                                    <p>{list?.buy_count || 1 }</p>
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
                            <th>Ismi</th>
                            <th>Tel</th>
                            <th>Manzil</th>
                            <th>Ko'cha</th>
                            <th>Xonadon</th>
                            <th>Yetkazish turi</th>
                            <th>To'lov turi</th>
                            <th>Qo'ng'iroq</th>
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
                            <td>{item.call ? "Ha" : "Yo'q"}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="ad-order-card-footer d-flex j-between">
                      <Button variant="contained" disabled>
                        Jami summa: {JSON.parse(item.product_list)?.reduce((a, b) => +a + +b.price, 0)} So'm
                      </Button>

                      <Button
                        variant="contained"
                        onClick={() => removeItem(item.id)}
                      >
                        Bajarildi
                      </Button>
                    </div>
                  </motion.div>
                </div>
              )
            })
        }
      </AnimatePresence>
    </div>
  )
}

export default ADOrder