import "./nav.model.css"

import React,{useState} from 'react'
import { Link } from "react-router-dom";
// icon import
import { IoLanguageSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
// import { Link } from "react-router-dom";

import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
// functions
import { setLang } from "../../Data/languages/langFunction";
import { Data } from "../../Data/Context/context";



function NavBar() {

  const money = Data();

  if(window.localStorage.getItem("moneySystem") && window.localStorage.moneySystem !== null) {
    money.setMoneySystem(window.localStorage.moneySystem);
  }

  const [security, setSecurity] = useState(true)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const mmm = money.moneySystem

  const [addMoney, setAddMoney] = useState(0)
  const [translate, setTranslate] = useState(0)
  const [editMoneyState, setEditMoneyState] = useState(false)
  const [editMoney, setEditMoney] = useState(mmm)


  function PlusMoney () 
  {
    money.setMoneySystem(prev => {
      let num = prev;
      num = +num + +addMoney;
      window.localStorage.moneySystem = num;
      return num;
    })
    handleClose();
  }

  function TransSToMoney()
  {
    if(+money.sells < +translate) return null;
    money.setMoneySystem(prev => {
          let p = prev;
          p = +p + +translate;
          window.localStorage.moneySystem = p;
          return p;
        })

        money.setSells(prev => {
          let p = prev;
          p = +p - +translate;
          window.localStorage.systemDetailsSells = p;
          return p;
        })

        handleClose();
  }
  
    
 

  return (
    <div className="NavBar">
        <div className="MainNav">
            <h3 className=''>React CRUDS</h3>
            <div className="link-group">
              <Link to='/' className="link">Home</Link>
            </div>
        </div>
        <div className="Additional">
            <Nav  variant="dark" bg="dark">
                <Dropdown data-bs-theme="dark">
                  <Dropdown.Toggle id="dropdown-basic" variant="dark" className="dropdownMenu">
                    <IoLanguageSharp />
                  </Dropdown.Toggle>
                   <Dropdown.Menu>
                      <Dropdown.Item onClick={() => {setLang("en");window.location.reload()}}>English</Dropdown.Item>
                      <Dropdown.Item onClick={() => {setLang("ar");window.location.reload()}}>Arabic</Dropdown.Item>
                   </Dropdown.Menu>
                
                </Dropdown>
            </Nav>
            <span className="Link-Additional btn btn-dark" onClick={handleShow}><FaMoneyCheckDollar /></span>
            <Link to='/' className="Link-Additional btn btn-dark"><IoMdSettings /></Link>
        </div>


        <Modal show={show} onHide={handleClose} fullscreen={true}>
        <Modal.Header closeButton>
          <Modal.Title><FaMoneyCheckDollar /> Money System</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <div className="d-flex justify-content-end align-items-center">
            <Button variant="outline-success" className="d-flex justify-content-center align-items-center gap-1" onClick={() => editMoneyState ? setEditMoneyState(false) : setEditMoneyState(true)}><FaEdit /> {editMoneyState ? "Close Edit" : "Edit Money"}</Button>
          </div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Your Money</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your Money"
                readOnly={editMoneyState ? false : true}
                value={"$" + editMoney}
                className="bg-light text-success text-center fw-bolder"
                onChange={e => setEditMoney(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Add Money</Form.Label>
              <Form.Control
                 type="number"
                 placeholder="Add Money"
                 value={addMoney}
                 onChange={(e) => setAddMoney(e.target.value)}
              />
            </Form.Group>
            <h3 className="text-center p-2 bg-light fw-lighter">Translate Money from Sells to Money System</h3>
           <Row className="g-2">
           <Col md>
            <FloatingLabel controlId="floatingInputGrid" label="Sells">
              <Form.Control type="number" placeholder="" value={money.sells - translate} readOnly />
            </FloatingLabel>
          </Col>
          <Col md>
            <FloatingLabel label="Money Translate">
              <Form.Control className={`${+money.sells < +translate? "border-danger text-danger" : ""}`} type="number" placeholder="Money Translate" value={translate} onChange={(e) => setTranslate(e.target.value)} />
            </FloatingLabel>
          </Col>
           </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" disabled={+money.sells > +translate? false : true} onClick={TransSToMoney}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        

    </div>
  )
}

export default NavBar