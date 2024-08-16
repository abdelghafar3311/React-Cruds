import {useState} from 'react'
// css file
import "../../ui/style.AddSection/addSection.css";
// data folder functions 
import Languages from "../../Data/languages/langFunction";
import {Data} from "../../Data/Context/context";
// hook folder
import notify from "../../hook/useNotifaction";
// library
import { Link } from "react-router-dom";
// icons
import { IoMdAdd , IoMdSearch } from "react-icons/io";
// bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function AddSection({className}) {
  // catch data functions
  const lang = Languages();
  const db = Data()
  // control show modal
  const [show, setShow] = useState(false);
  // fun to control modal
  const handleClose = () => setShow(false); // close modal
  const handleShow = () => setShow(true); // show modal

  // here clear data from sells and buys
  function clear() 
  {
   db.setSells(0);
    window.localStorage.removeItem("systemDetailsSells");

    db.setBuys(0);
    window.localStorage.removeItem("systemDetailsBuys");

    notify("Success Clear Data", "success");
    handleClose();
  }

  return (
    <div className="Container">

      <div className="contentHeaderHome">

        <button className={`btn btn-danger ${className}`} onClick={handleShow}>{lang.home.headerHomePage.clearData}</button>
        
        <div className="d-flex align-items-center gap-1 dir">
          
          <div className="buttons">
            <Link to="/add-products" className="btn btn-outline-success d-flex justify-content-center align-items-center gap-1"> <IoMdAdd /> {lang.home.headerHomePage.createProducts}</Link>
            <Link to="/add-product" className="btn btn-primary d-flex justify-content-center align-items-center gap-1"> <IoMdAdd /> {lang.home.headerHomePage.createProduct}</Link>
          </div>

          <Link to="/search-page" className="searchContainer">
            <span className="input">{lang.home.headerHomePage.searchPage}</span>
            <span className="button"><IoMdSearch /></span>
          </Link>

        </div>
      </div>

      {/* modal */}
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
