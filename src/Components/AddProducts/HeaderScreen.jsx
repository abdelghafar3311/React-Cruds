import React from 'react'
// css file
import "../../ui/headerAddProduct/header.css"


import { Link } from 'react-router-dom';

// languages function
import Languages from "../../Data/languages/langFunction.js";


function HeaderScreen() {
  const lang = Languages()
  return (
    <div className="containerAddProduct">
        <Link to="/add-product" className='btn btn-outline-success d-flex justify-content-center align-items-center gap-1'>+ {lang.createProducts.header.btn}</Link>
    </div>
  )
}

export default HeaderScreen