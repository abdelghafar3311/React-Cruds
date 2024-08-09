import "../../ui/style.AddSection/addSection.css";
import Languages from "../../Data/languages/langFunction";
import React from 'react'
import { Link } from "react-router-dom";
import { IoMdAdd , IoMdSearch } from "react-icons/io";



function AddSection() {
  const lang = Languages();


  return (
    <div className="Container">
      <div className="contentHeaderHome">
        <div className="buttons">
          <Link to="/add-products" className="btn btn-outline-success d-flex justify-content-center align-items-center gap-1"> <IoMdAdd /> {lang.home.headerHomePage.createProducts}</Link>
          <Link to="/add-product" className="btn btn-primary d-flex justify-content-center align-items-center gap-1"> <IoMdAdd /> {lang.home.headerHomePage.createProduct}</Link>
        </div>
        <Link to="/search-page" className="searchContainer">
            <span className="input">Search Page</span>
            <span className="button"><IoMdSearch /></span>
        </Link>
      </div>
    </div>
  )
}

export default AddSection