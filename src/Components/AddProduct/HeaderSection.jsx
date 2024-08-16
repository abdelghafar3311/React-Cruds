import React from 'react';
// fun data
import Languages from "../../Data/languages/langFunction.js";
import { Data } from '../../Data/Context/context.jsx';
// css file
import "../../ui/headerAddProduct/header.css";
// library
import { Link } from 'react-router-dom';



function HeaderSection() {
  const money = Data(); // context
  const lang = Languages(); // lang fun in Data folder
  return (
    <div className="containerAddProduct">
        <p className='btn btn-outline-dark disabled d-flex justify-content-center align-items-center gap-1'>${money.moneySystem}</p>
        <Link to="/add-products" className='btn btn-outline-success d-flex justify-content-center align-items-center gap-1'>++ {lang.createProduct.header.btn}</Link>
    </div>
  )
}

export default HeaderSection