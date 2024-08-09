import React from 'react'
import Languages from "../../Data/languages/langFunction.js";
// css file
import "../../ui/headerAddProduct/header.css";

import { Link } from 'react-router-dom';

// import { Data } from '../../Data/Context/context.jsx';

function HeaderSection() {
  const lang = Languages();
  return (
    <div className="containerAddProduct">
        <Link to="/add-products" className='btn btn-outline-success d-flex justify-content-center align-items-center gap-1'>++ {lang.createProduct.header.btn}</Link>
    </div>
  )
}

export default HeaderSection