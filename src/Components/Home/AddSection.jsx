import "../../ui/style.AddSection/addSection.css";

import Languages from "../../Data/languages/langFunction";
import {Data} from "../../Data/Context/context";
import notify from "../../hook/useNotifaction";

import {useState} from 'react'

import { Link } from "react-router-dom";

import { IoMdAdd , IoMdSearch } from "react-icons/io";


import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function AddSection() {
  const lang = Languages();
  const db = Data()

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function clear() 
  {
    db.setSells(0);
    window.localStorage.systemDetailsSells = db.sells;
    db.setBuys(0);
    window.localStorage.systemDetailsBuys = db.buys;
    notify("Success Clear Data", "success")
    handleClose();
  }

  return (
    <div className="Container">
      <div className="contentHeaderHome">
        <button className="btn btn-danger" onClick={handleShow}>Clear Data</button>
        <div className="d-flex align-items-center gap-1 dir">
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Massage For You</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you sure to clear data from sells and buys ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={clear}>
            Clear
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddSection