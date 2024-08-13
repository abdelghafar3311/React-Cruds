import React, {useState,useEffect, useMemo} from 'react';
import { Link } from 'react-router-dom';
import {Data} from "../../Data/Context/context"

import notify from '../../hook/useNotifaction';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import "../../ui/SearchMode/search.css";

import { FaAngleDown } from "react-icons/fa6";
import { MdOutlineDone } from "react-icons/md";



function SearchItemsData() {
  const dataF = Data();
  const pro = Data();
  const products = useMemo(() => {
    return pro.products.length > 0 ? pro.products : [];
  }, [pro.products]);
  // show list useState ...
  const [show, setShow] = useState(false);

  // functions to show or close list
  const handleShowList = () => setShow(true);
  const handleCloseList = () => setShow(false);


  // model
  const [showMod, setShowMod] = useState(false);
  const [ShowModTow, setShowModTow] = useState(false)

  const handleClose = () => setShowMod(false);
  const handleShow = () => setShowMod(true);

  const ShowModule = () => setShowModTow(true);
  const CloseModule = () => setShowModTow(false);

  const [getId, setGetId] = useState(0)
  const [numberSell, setNumberSell] = useState(2)

  const [catchActive, setCatchActive] = useState({type: "",massage: "",id: ""})

  function getIndexItem(id) {
    let index = -1; 
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) { 
        index = i;
        break; 
      }
    }
    return index;
  }

  // search all things here:...
  const [nOrC, setNOrC] = useState("N");
  const [dataSearching, setDataSearching] = useState([]);
  const [keyWords, setKeyWords] = useState("")


    // Delete one
    function DeleteItem(id)  {
      let index = -1; 
      for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) { 
          index = i;
          break; 
        }
      }
      const pro = dataF.products.length > 0? dataF.products : [];
      dataF.setMoneySystem(mon => {
        let money = mon;
        money = pro.length > 0? +money + (((+pro[index].price + +pro[index].taxes + +pro[index].ads)) * +pro[index].count) : money;
        window.localStorage.moneySystem = money;
        return money;
      })
  
      dataF.setBuys(i => {
        let ii = i;
        ii = +ii - (((+pro[index].price + +pro[index].taxes + +pro[index].ads)) * +pro[index].count);
        window.localStorage.systemDetailsBuys = ii;
        return ii;
      })
      dataF.setProducts(prev => {
        let d = [...prev];
        d.splice(index,1);
          window.localStorage.productsC = JSON.stringify(d);
          return d
        })
        notify("Success Delete Product","success")
    }

    // Sell One
    function SellOneData(id) {
      let index = -1; 
      for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) { 
          index = i;
          break; 
        }
      }
      if(+dataF.products[index].count > 1) {
        const pro = dataF.products.length > 0? dataF.products : [];
        dataF.setSells(i => {
          let ii = i;
          ii = +ii + ((+pro[index].price + +pro[index].taxes + +pro[index].ads + +pro[index].gain) - +pro[index].discount);
          window.localStorage.systemDetailsSells = ii;
          return ii;
        })
        dataF.setProducts(prev => {
          let d = [...prev];
          d[index].count = d[index].count - 1;
          window.localStorage.productsC = JSON.stringify(d);
          return d;
        })
        notify("success sells product","success")
      } else {
        const pro = dataF.products.length > 0? dataF.products : [];
        dataF.setSells(i => {
          let ii = i;
          ii = +ii + ((+pro[index].price + +pro[index].taxes + +pro[index].ads + +pro[index].gain) - +pro[index].discount);
          window.localStorage.systemDetailsSells = ii;
          return ii;
        })
        dataF.setProducts(prev => {
          let d = [...prev];
          d.splice(index,1);
            window.localStorage.productsC = JSON.stringify(d);
            return d
          })
          notify("success sells product","success")
          notify("success delete product","success")
      }
      
    }

    // Sell All
    function SellAll(id)
    {
      let index = -1; 
      for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) { 
          index = i;
          break; 
        }
      }
  
      const pro = dataF.products.length > 0? dataF.products : [];
      dataF.setSells(i => {
        let ii = i;
        ii = +ii + (((+pro[index].price + +pro[index].taxes + +pro[index].ads + +pro[index].gain) - +pro[index].discount) * +pro[index].count);
        window.localStorage.systemDetailsSells = ii;
        return ii;
      })
      dataF.setProducts(prev => {
          let d = [...prev];
          d.splice(index,1);
          window.localStorage.productsC = JSON.stringify(d);
          return d
        })
        notify("success sells product","success")
        notify("success delete product","success")
    }


    // Sell Number
    function SellNumber(id) {
      setGetId(getIndexItem(id));
      handleShow();
    }
  
    function sellsNowNumberActive(index) 
    {
      if(products.length > 0) 
      {
        const pro = dataF.products.length > 0? dataF.products : [];
        dataF.setSells(i => {
          let ii = i;
          let p = +numberSell * ((+pro[index].price + +pro[index].taxes + +pro[index].ads + +pro[index].gain) - +pro[index].discount)
          ii = +ii + +p;
          window.localStorage.systemDetailsSells = ii;
          return ii;
        })
  
        dataF.setProducts(prev => {
          let d = [...prev];
          d[index].count = +d[index].count - +numberSell;
          window.localStorage.productsC = JSON.stringify(d);
          return d;
        })
        handleClose();
        setNumberSell(2);
        notify("success sells product","success")
      }
    }


    // active functions cruds

    function typeFunction({type= "",id = "",massage = ""}){
      setCatchActive({type : type,massage: massage, id: id});
      ShowModule()
    }
  
    function ActiveFunctionsSecurity()
    {
      if(catchActive.type === "del-one")
      {
        DeleteItem(catchActive.id);
        CloseModule();
      } else if(catchActive.type === "sell-one")
      {
        SellOneData(catchActive.id);
        CloseModule();
      } else if(catchActive.type === "sell-all")
      {
        SellAll(catchActive.id);
        CloseModule();
      }
  
    }


    // ------------------------------------

 

  useEffect(() => {
    function searchMode() {
      let resSearch = [];
     // loop to search value 
      for(let i = 0;i < products.length; i++) {
         if(nOrC === "N") 
         {
           if(products[i].name.toLowerCase().includes(keyWords.toLowerCase())) {
              resSearch.push(products[i]);
           }
         } else
         {
           if(products[i].category.toLowerCase().includes(keyWords.toLowerCase())) {
             resSearch.push(products[i]);
          }
         }
      }
 
     //  save new array
     return setDataSearching([...resSearch]);
   }
    if (products.length > 0) {
      searchMode();
    }
  }, [keyWords, products.length,products,nOrC]);



  const highlightText = (text, keywords) => {
    const keywordArray = keywords.split("").map((key) => key.toLowerCase());
    return text.split("").map((item, index) => {
      const lowerItem = item.toLowerCase();
      return keywordArray.includes(lowerItem) ? (
        <span key={index} className="select">
          {item}
        </span>
      ) : (
        item
      );
    });
  };

  const matchedData = dataSearching.find((data) => {
    if (nOrC === "N") {
      return data.name.toLowerCase().includes(keyWords.toLowerCase());
    } else {
      return data.category.toLowerCase().includes(keyWords.toLowerCase());
    }
  });

  // ----------------------------------------
  function ShowResultSearching() {
    if(nOrC === "N") {
      if(!matchedData) {
        return <div className='alert alert-info text-center w-100'>not found Products</div>;
      }
      return (
        <>
           {
              dataSearching.map(item => {
                return (
                  <div className="card-data">
                    <header>
                        <h3>{highlightText(item.name, keyWords)}</h3>
                        <p>price: {(+item.price + +item.taxes + +item.ads + +item.gain) - +item.discount}</p>
                    </header>
                    <section>
                      <p>Category is <span>{item.category}</span></p>
                      <p>Count product is <span>{item.count}</span></p>
                    </section>
                    <footer>
                      <Link to={`/ChangeProduct/${item.id}`} className='button'>Edit</Link>
                      <button onClick={() => typeFunction({type: "del-one",id: item.id,massage: `Do you sure about delete this product called: ${item.name} and has id: ${item.id}`})}>Delete</button>
                      <button onClick={() => typeFunction({type: "sell-one",id : item.id,massage: `Do you sure about sell one about product called : ${item.name} and has id : ${item.id}. you have ${item.count} packages about this product`})}>Sell One</button>
                      <button onClick={() => typeFunction({type: "sell-all",id: item.id,massage: `Do you sure about sell all the product called : ${item.name} and has id : ${item.id}`})}>Sell All</button>
                      <button onClick={() => SellNumber(item.id)}>Sell Number</button>
                    </footer>
                  </div>
                )
              })
           }
        </>
      )
    } else {
      if(!matchedData) {
        return <div className='alert alert-info text-center w-100'>not found Products</div>;
      }
      return (
        <>
           {
              dataSearching.map(item => {
                return (
                  <div className="card-data">
                    <header>
                        <h3>{item.name}</h3>
                        <p>price: {(+item.price + +item.taxes + +item.ads + +item.gain) - +item.discount}</p>
                    </header>
                    <section>
                      <p>Category is <span>{highlightText(item.category, keyWords)}</span></p>
                      <p>Count product is <span>{item.count}</span></p>
                    </section>
                    <footer>
                      <Link to={`/ChangeProduct/${item.id}`} className='button'>Edit</Link>
                      <button onClick={() => typeFunction({type: "del-one",id: item.id,massage: `Do you sure about delete this product called: ${item.name} and has id: ${item.id}`})}>Delete</button>
                      <button onClick={() => typeFunction({type: "sell-one",id : item.id,massage: `Do you sure about sell one about product called : ${item.name} and has id : ${item.id}. you have ${item.count} packages about this product`})}>Sell One</button>
                      <button onClick={() => typeFunction({type: "sell-all",id: item.id,massage: `Do you sure about sell all the product called : ${item.name} and has id : ${item.id}`})}>Sell All</button>
                      <button onClick={() => SellNumber(item.id)}>Sell Number</button>
                    </footer>
                  </div>
                )
              })
           }
        </>
      )
    }
  }



  if(products.length <= 0) {
    return(
      <div className='CONTAINER-SEARCH-MODE'>
      <header>
        <div className="container-search">
          <input type="search" placeholder="Search" value={keyWords} onChange={(e) => setKeyWords(e.target.value)}/>
          
          <div className="subTitle" onClick={() => show? handleCloseList() : handleShowList()}><span className={`resChose ${nOrC === "N"? "" : "bg-secondary"}`}>{nOrC}</span> <span className='iconDown'><FaAngleDown /></span></div>
          
        </div>
        <div className={`list ${show? "show" : ""}`}>
                <p className="item" onClick={() => setNOrC("N")}>
                  <span>Name</span>
                  <span className="isChose">{nOrC === "N"? <MdOutlineDone /> : null}</span>
                </p>
                <p className="item" onClick={() => setNOrC("C")}>
                  <span>Category</span>
                  <span className="isChose">{nOrC === "C"? <MdOutlineDone /> : null}</span>
                </p>
              </div>
      </header>
      <div className="container-result-data">
        <div className='alert alert-info text-center w-100'>not found Products</div>
      </div>
    </div>
    )
  }
      

  return (
    <div className='CONTAINER-SEARCH-MODE'>
      <header>
        <div className="container-search">
          <input type="search" placeholder="Search" value={keyWords} onChange={(e) => setKeyWords(e.target.value)}/>
          
          <div className="subTitle" onClick={() => show? handleCloseList() : handleShowList()}><span className={`resChose ${nOrC === "N"? "" : "bg-secondary"}`}>{nOrC}</span> <span className='iconDown'><FaAngleDown /></span></div>
          
        </div>
        <div className={`list ${show? "show" : ""}`}>
                <p className="item" onClick={() => setNOrC("N")}>
                  <span>Name</span>
                  <span className="isChose">{nOrC === "N"? <MdOutlineDone /> : null}</span>
                </p>
                <p className="item" onClick={() => setNOrC("C")}>
                  <span>Category</span>
                  <span className="isChose">{nOrC === "C"? <MdOutlineDone /> : null}</span>
                </p>
              </div>
      </header>
      <div className="container-result-data">
      <ShowResultSearching />
      </div>

      <Modal
        show={showMod}
        onHide={handleClose}
        backdrop="static"
        keyboard={true}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Sells Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* table */}
          <table className="tableHomePage">
            <tbody>
              <tr>
                <th>Name Product</th> <td>{products.length > 0 ? products[getId].name : "notFount"}</td> <th>id</th> <td>{products.length > 0 ? products[getId].id : "notFount"}</td>
              </tr>
              <tr>
                <th>Category</th> <td>{products.length > 0 ? products[getId].category : "notFount"}</td> <th>price</th> <td>{products.length > 0 ? (+products[getId].price + +products[getId].taxes + +products[getId].ads + +products[getId].gain) - +products[getId].discount : "notFount"}</td>
              </tr>
              <tr>
                <th>count</th> <td>{products.length > 0 ? products[getId].count : "notFount"}</td> <th>price (sells)</th> <td>{products.length > 0 ?numberSell * ((+products[getId].price + +products[getId].taxes + +products[getId].ads + +products[getId].gain) - +products[getId].discount) : "notFount 404!"}</td>
              </tr>
            </tbody>
          </table>
          {/* input limit */}
          <div className="control-form">
            <label>number of product you want sell them:</label>
            <input type="number" value={numberSell} className={`form-control ${products.length > 0 ? numberSell > +products[getId].count -2 || numberSell < 2 ? "border-danger text-danger" : "" : "notFount 404!"}`} placeholder='here write number' onChange={(e) => setNumberSell(e.target.value)} />
            <span className={`font-monospace ${products.length > 0 ? numberSell > +products[getId].count -2 || numberSell < 2 ? "text-danger" : "text-secondary" : "notFount 404!"}`}>{products.length > 0 ? numberSell > +products[getId].count -2 || numberSell < 2 ?  "Sorry We can not work about this count" : `the limit 2 - ${+products[getId].count - 2}` : "notFount"}</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <button className={`btn btn-primary ${products.length > 0 ? numberSell > +products[getId].count -2 || numberSell < 2 ? "disabled" : "" : "notFount 404!"}`} onClick={() => sellsNowNumberActive(getId)}>Save</button>
        </Modal.Footer>
        </Modal>


        <Modal show={ShowModTow} onHide={CloseModule}>
        <Modal.Header closeButton>
          <Modal.Title>Warning Massage Before Work</Modal.Title>
        </Modal.Header>
        <Modal.Body>{catchActive.massage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={CloseModule}>
            Close
          </Button>
          <Button variant="primary" onClick={ActiveFunctionsSecurity}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default SearchItemsData;