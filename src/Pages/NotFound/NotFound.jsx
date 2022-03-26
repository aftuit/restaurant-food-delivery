import React from 'react'
import { Link } from "react-router-dom";
import "./style.scss"
const NotFound = () => {
  return (
    <div className="notfound d-flex a-center j-center">
      <div className='d-flex j-center'>
        <h1>XATOLIK 404 :)</h1>
        <p>Saxifa topilmadi</p>

        <Link to="/">Bosh sahifa</Link>
      </div>
    </div>
  )
}

export default NotFound;