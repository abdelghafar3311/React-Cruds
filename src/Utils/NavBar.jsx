import "../ui/navbar/nav.model.css"

import React,{useState,useEffect} from 'react'
import { Link } from "react-router-dom";
// icon import
import { IoLanguageSharp,IoHome } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { BsCheckCircleFill } from "react-icons/bs";
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
import { setLang } from "../Data/languages/langFunction";
import { Data } from "../Data/Context/context";



function NavBar() {

  const money = Data();

  if(window.localStorage.getItem("moneySystem") && window.localStorage.moneySystem !== null) {
    money.setMoneySystem(window.localStorage.moneySystem);
  }

  const [security, setSecurity] = useState({
    change: false,
    add: false,
    translate: false
  })
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // const mmm = money.moneySystem

  const [addMoney, setAddMoney] = useState(0)
  const [translate, setTranslate] = useState(0)
  const [error, setError] = useState({state: false,massage: []})
  const [editMoney, setEditMoney] = useState(0)


  function ShowModF()
  {
    setError({state: false,massage: []});
    handleShow();
  }


  useEffect(() => {
    setEditMoney(+money.moneySystem)
  }, [money.moneySystem])

  function PlusMoney () 
  {
    money.setMoneySystem(prev => {
      let num = prev;
      num = +num + +addMoney;
      window.localStorage.moneySystem = num;
      return num;
    })
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
  }
  
  function ChangeMoney() 
  {
    money.setMoneySystem(prev => {
      let num = prev;
      num = +editMoney;
      window.localStorage.moneySystem = num;
      return num;
    })
  } 
 

  function AllActivity()
  {

    setError({state: false,massage: []});

    if(security.change === false && security.add === false && security.translate === false)
      {
        setError({state: true, massage: [{ms:"Please Active One Switch To Work",type: "err"}]})
      } 

    if(security.change) {
      ChangeMoney();
      setError({state: error.state? true : false ,massage: [...error.massage,{ms: "Success Change Work",type: "suc"}]})
    }

    if(security.add) {
      if(addMoney <= 0) {
        setError({state: true,massage: [...error.massage,{ms:"Please we not allow 0 or litter than!",type: "err"}]})
      } else {
        setError({state: error.state? true : false ,massage: [...error.massage,{ms: "Success Add Work",type: "suc"}]});
        PlusMoney();
      }
    }

    if(security.translate) 
    {
      if(+translate > +money.sells || +translate <= 0) {
        setError({state: true , massage: [...error.massage,{ms:"The Translate has an error",type: "err"}]})
      } else {
        setError({state: error.state? true : false ,massage: [...error.massage,{ms: "Success Translate Work",type: "suc"}]})
        TransSToMoney()
      }
    }


    if(error.state === false && security.add === true || security.change === true || security.translate === true) {
      handleClose()
    }
  }

  return (
    <div className="NavBar">
        <div className="MainNav">
            <h3>React CRUDS</h3>
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
            <span className="Link-Additional btn btn-dark" onClick={ShowModF}><FaMoneyCheckDollar /></span>
            <Link to='/' className="Link-Additional btn btn-dark"><IoHome /></Link>
        </div>


        <Modal show={show} onHide={handleClose} fullscreen={true}>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex justify-content-center align-items-center gap-2"><FaMoneyCheckDollar /> Money System</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          
          <div className="d-flex justify-content-end align-items-center">
          <Form.Check 
                type="switch"
                id="custom-switch-Change"
                label="Active Change Money"
                // disabled={true}
                checked={security.change}
                onClick={() => security.change ? setSecurity({...security, change: false}) : setSecurity({...security, change: true})}
                className="bg-light p-2 ps-5 mb-2"
              />
            {/* <Button variant="outline-success" className="d-flex justify-content-center align-items-center gap-1" onClick={() => editMoneyState ? setEditMoneyState(false) : setEditMoneyState(true)}><FaEdit /> {editMoneyState ? "Close Edit" : "Edit Money"}</Button> */}
          </div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Your Money</Form.Label>
              <Form.Control
                type={!security.change? "text" : "number"}
                placeholder="Your Money"
                readOnly={security.change? false : true}
                value={!security.change? "$" + money.moneySystem : editMoney}
                className={!security.change ?"bg-light text-success text-center fw-bolder" : ""}
                onChange={e => setEditMoney(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <div className="d-flex justify-content-end align-items-center">
                 <Form.Check 
                  type="switch"
                  id="custom-switch"
                  label="Active Add Money"
                  // disabled={true}
                  checked={security.add}
                  className="bg-light p-2 ps-5 mb-2"
                  onClick={() => security.add ? setSecurity({...security, add: false}) : setSecurity({...security, add: true})}
                />
              </div>
             
              <Form.Label>Add Money</Form.Label>
              <Form.Control
                 type="number"
                 placeholder="Add Money"
                 value={addMoney}
                 onChange={(e) => setAddMoney(e.target.value)}
                 readOnly={security.add? false : true}
                 className={security.add? "" : "bg-light"}
              />
            </Form.Group>
            <div className="d-flex justify-content-end align-items-center">
              <Form.Check 
                type="switch"
                id="custom-switch-translate Sells to Money"
                label="Active Translate"
                className="bg-light p-2 ps-5 mb-2"
                checked={security.translate}
                onClick={() => security.translate ? setSecurity({...security, translate: false}) : setSecurity({...security, translate: true})}
              />
            </div>
            
            <h3 className="text-center p-2 bg-light fw-lighter">Translate Money from Sells to Money System</h3>
           <Row className="g-2">
           <Col md>
            <FloatingLabel controlId="floatingInputGrid" label="Sells">
              <Form.Control type="number" placeholder="" value={money.sells - translate} readOnly />
            </FloatingLabel>
          </Col>
          <Col md>
            <FloatingLabel label="Money Translate">
              <Form.Control className={`${security.translate ? +money.sells < +translate? "border-danger text-danger" : "" : "bg-light"}`} readOnly={security.translate ? false : true} type="number" placeholder="Money Translate" value={translate} onChange={(e) => setTranslate(e.target.value)} />
            </FloatingLabel>
          </Col>
           </Row>
          </Form>

          <div className="">
              {error.state? error.massage.map((err) => {
                return (
                  <p className={`mt-3 alert ${err.type === "err"? "alert-danger" : "alert-success"}`}>{err.type === "err"? <IoIosCloseCircle/> : <BsCheckCircleFill /> } {err.ms}</p>
                )
              }) : ""}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={AllActivity}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        

    </div>
  )
}

export default NavBar