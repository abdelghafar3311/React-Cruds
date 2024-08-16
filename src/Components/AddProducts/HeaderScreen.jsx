import React from 'react'
// css file
import "../../ui/headerAddProduct/header.css"

// library
import { Link } from 'react-router-dom';

// languages function
import Languages from "../../Data/languages/langFunction.js";
// context
import { Data } from '../../Data/Context/context.jsx';


function HeaderScreen() {
  const money = Data()
  const lang = Languages()
  return (
    <div className="containerAddProduct">
        <p className='btn btn-outline-dark disabled d-flex justify-content-center align-items-center gap-1'>${money.moneySystem}</p>
        <Link to="/add-product" className='btn btn-outline-success d-flex justify-content-center align-items-center gap-1'>+ {lang.createProducts.header.btn}</Link>
    </div>
  )
}

export default HeaderScreen