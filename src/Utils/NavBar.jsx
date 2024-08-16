import React,{useState,useEffect} from 'react';
// css file
import "../ui/navbar/nav.model.css"
// library
import { Link } from "react-router-dom";
import Joyride from "react-joyride";
// icon import
import { IoLanguageSharp,IoHome } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { BsCheckCircleFill } from "react-icons/bs";

// bootstrap
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
// functions
import { setLang, lang as lg } from "../Data/languages/langFunction";
import { Data } from "../Data/Context/context";
import Languages from "../Data/languages/langFunction";
// data steps
import navSteps from "../Data/OfferSite/Nav";



function NavBar() {
  // main values
  const money = Data();
  const lang = Languages();
  if(window.localStorage.getItem("moneySystem") && window.localStorage.moneySystem !== null) {
    money.setMoneySystem(window.localStorage.moneySystem);
  }
  // security value
  const [security, setSecurity] = useState({
    change: false,
    add: false,
    translate: false
  })
  // modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // useState Joyride
  const [runTour, setRunTour] = useState(false);
  // useState values
  const [addMoney, setAddMoney] = useState(0)
  const [translate, setTranslate] = useState(0)
  const [error, setError] = useState({state: false,massage: []})
  const [editMoney, setEditMoney] = useState(0)

  // show modal to say warning before active function
  function ShowModF()
  {
    setError({state: false,massage: []});
    handleShow();
  }


  useEffect(() => {
    setEditMoney(+money.moneySystem);
    // Check if the tour has been completed
    const isTourCompleted = localStorage.getItem('NavTour');
    if (!isTourCompleted) {
      setRunTour(true);
    }
  }, [money.moneySystem])



  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = ['finished', 'skipped'];

    if (finishedStatuses.includes(status)) {
      // Mark the tour as completed
      localStorage.setItem('NavTour', true);
      setRunTour(false);
    }
  };

  // fun add money
  function PlusMoney () 
  {
    money.setMoneySystem(prev => {
      let num = prev;
      num = +num + +addMoney;
      window.localStorage.moneySystem = num;
      return num;
    })
  }
  // fun translate money
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
  // fun edit money
  function ChangeMoney() 
  {
    money.setMoneySystem(prev => {
      let num = prev;
      num = +editMoney;
      window.localStorage.moneySystem = num;
      return num;
    })
  } 
 
  // fun control all functions three (add/edit/translate)
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
        <Joyride steps={navSteps} callback={handleJoyrideCallback} run={runTour} continuous showProgress showSkipButton/>

        <div className="MainNav">
            <h3>React CRUDS</h3>
        </div>

        <div className="Additional">
            <Nav  variant="dark" bg="dark" className="language-step">
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

            <span className="Link-Additional btn btn-dark money-system-step" onClick={ShowModF}><FaMoneyCheckDollar /></span>
            
            <Link to='/' className="Link-Additional btn btn-dark"><IoHome /></Link>
        
        </div>

        {/* money system */}
        <Modal show={show} onHide={handleClose} fullscreen={true} style={{direction: lg === "ar"? "rtl" : "ltr"}}>
        <Modal.Header>
          <Modal.Title className="d-flex justify-content-center align-items-center gap-2"><FaMoneyCheckDollar />{lang.MoneySys.titles.main}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          
          <div className="d-flex justify-content-end align-items-center">
            {/* start change */}
          <Form.Check 
                type="switch"
                id="custom-switch-Change"
                label={lang.MoneySys.activities.change}
                // disabled={true}
                checked={security.change}
                onClick={() => security.change ? setSecurity({...security, change: false}) : setSecurity({...security, change: true})}
                className="bg-light p-2 ps-5 mb-2"
              />
          </div>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>{lang.MoneySys.inputs.money}</Form.Label>
              <Form.Control
                type={!security.change? "text" : "number"}
                placeholder={lang.MoneySys.inputs.money}
                readOnly={security.change? false : true}
                value={!security.change? "$" + money.moneySystem : editMoney}
                className={!security.change ?"bg-light text-success text-center fw-bolder" : ""}
                onChange={e => setEditMoney(e.target.value)}
              />
            </Form.Group>

            {/* start add */}

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <div className="d-flex justify-content-end align-items-center">
                 <Form.Check 
                  type="switch"
                  id="custom-switch"
                  label={lang.MoneySys.activities.add}
                  // disabled={true}
                  checked={security.add}
                  className="bg-light p-2 ps-5 mb-2"
                  onClick={() => security.add ? setSecurity({...security, add: false}) : setSecurity({...security, add: true})}
                />
              </div>
             
              <Form.Label>{lang.MoneySys.inputs.addMoney}</Form.Label>
              <Form.Control
                 type="number"
                 placeholder={lang.MoneySys.inputs.addMoney}
                 value={addMoney}
                 onChange={(e) => setAddMoney(e.target.value)}
                 readOnly={security.add? false : true}
                 className={security.add? "" : "bg-light"}
              />
            </Form.Group>

            {/* start translate */}

            <div className="d-flex justify-content-end align-items-center">
              <Form.Check 
                type="switch"
                id="custom-switch-translate Sells to Money"
                label={lang.MoneySys.activities.trans}
                className="bg-light p-2 ps-5 mb-2"
                checked={security.translate}
                onClick={() => security.translate ? setSecurity({...security, translate: false}) : setSecurity({...security, translate: true})}
              />
            </div>
            
            <h3 className="text-center p-2 bg-light fw-lighter">{lang.MoneySys.titles.transTitle}</h3>
           
           <Row className="g-2">
            <Col md>
              <FloatingLabel controlId="floatingInputGrid" label={lang.MoneySys.inputs.sells}>
                <Form.Control type="number"className="bg-light" placeholder="" value={money.sells - translate} readOnly />
              </FloatingLabel>
            </Col>

            <Col md>
                <FloatingLabel label={lang.MoneySys.inputs.transMoney}>
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
            {lang.MoneySys.buttons.close}
          </Button>
          <Button variant="primary" onClick={AllActivity}>
          {lang.MoneySys.buttons.Save}
          </Button>
        </Modal.Footer>
      </Modal>
        

    </div>
  )
}

export default NavBar