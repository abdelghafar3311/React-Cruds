import React, {useState} from 'react';
// css files
import "../../ui/Tables/table.css";
// bootstrap
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// library
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
// icons
import { BsCaretRight, BsCaretLeft } from "react-icons/bs";
// data folder
import Languages from '../../Data/languages/langFunction';
import { lang as lg } from '../../Data/languages/langFunction';
import { Data } from '../../Data/Context/context';
// hook
import notify from '../../hook/useNotifaction';


function TablesData({classNA = []}) { 
  // main values
  const dataF = Data();
  const products = dataF.products
  const lang = Languages();
  // useState for pagination
  const [itemOffset, setItemOffset] = useState(0);
  // modal control
  const [show, setShow] = useState(false);
  const [ShowMod, setShowMod] = useState(false)
  // modal functions control
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ShowModule = () => setShowMod(true);
  const CloseModule = () => setShowMod(false);

  // get id 
  const [getId, setGetId] = useState(0);
  // number sell in function numberSells
  const [numberSell, setNumberSell] = useState(2)
  // this to know what type function (delete all/delete one /sell one ...etc)
  const [catchActive, setCatchActive] = useState({type: "",massage: "",id: ""})
  // pagination library
  const Limit = 8;
  const endOffset = itemOffset + Limit;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / Limit);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * Limit) % products.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  // ----------------------------------------------------------- //

  // this fun to get index to number sells function
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
  // delete one database
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
    });

    dataF.setProducts(prev => {
      let d = [...prev];
      d.splice(index,1);
        window.localStorage.productsC = JSON.stringify(d);
        return d
      });

      notify("Success Delete Product","success")
  }
  // sell one package
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
      });

      dataF.setProducts(prev => {
        let d = [...prev];
        d[index].count = d[index].count - 1;
        window.localStorage.productsC = JSON.stringify(d);
        return d;
      });

      notify("success sells product","success");
    } else {
      const pro = dataF.products.length > 0? dataF.products : [];

      dataF.setSells(i => {
        let ii = i;
        ii = +ii + ((+pro[index].price + +pro[index].taxes + +pro[index].ads + +pro[index].gain) - +pro[index].discount);
        window.localStorage.systemDetailsSells = ii;
        return ii;
      });

      dataF.setProducts(prev => {
        let d = [...prev];
        d.splice(index,1);
          window.localStorage.productsC = JSON.stringify(d);
          return d
        });

        notify("success sells product","success");
        notify("success delete product","success");
    }
    
  }
  // sell all function
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
    });

    dataF.setProducts(prev => {
        let d = [...prev];
        d.splice(index,1);
        window.localStorage.productsC = JSON.stringify(d);
        return d
      });

      notify("success sells product","success");
      notify("success delete product","success");
  }
  // sell number function step one
  function SellNumber(id) {
    setGetId(getIndexItem(id));
    handleShow();
  }
  // sell number function step tow
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
      notify("success sells product","success");
    }
  }
  // delete all data
  const deleteDataAll = () => {
    products.splice(0,products.length);
    dataF.setProducts([...products])
    window.localStorage.productsC = JSON.stringify(products);
    notify("success delete all products","success")
  }

  // -------------------------------------------------------- //
  // function get type functions (delete all/sell one /...etc)
  function typeFunction({type= "",id = "",massage = ""}){
    setCatchActive({type : type,massage: massage, id: id});
    ShowModule()
  }
  // active function which get type it.
  function ActiveFunctionsSecurity()
  {
    if(catchActive.type === "del-one")
    {
      DeleteItem(catchActive.id);
      CloseModule();
    } else if(catchActive.type === "del-all")
    {
      deleteDataAll();
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

  // print data
  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item,i) => (
            <tr key={item.id}>
              <td>{i +1}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.count}</td>
              <td>{+item.price + +item.taxes + +item.ads + +item.gain - +item.discount}</td>
              <td>{(+item.price + +item.taxes + +item.ads + +item.gain - +item.discount) * +item.count}</td>
              <td><Link to={`/ChangeProduct/${item.id}`} className='btn btn-success'>{lang.home.table.buttons.change}</Link></td>
              <td><button className='btn btn-outline-danger' onClick={() => typeFunction({type: "sell-one",id : item.id,massage: `Do you sure about sell one about product called : ${item.name} and has id : ${item.id}. you have ${item.count} packages about this product`})}>{lang.home.table.buttons.sellOne}</button></td>
              <td><button className={`btn btn-outline-danger ${item.count > 2? "" : "disabled"}`} onClick={() => SellNumber(item.id)}>{lang.home.table.buttons.sellNumber}</button></td>
              <td><button className='btn btn-danger' onClick={() => typeFunction({type: "sell-all",id: item.id,massage: `Do you sure about sell all the product called : ${item.name} and has id : ${item.id}`})}>{lang.home.table.buttons.sellAll}</button></td>
              <td><button className='btn btn-danger' onClick={() => {typeFunction({type: "del-one",id: item.id,massage: `Do you sure about delete this product called: ${item.name} and has id: ${item.id}`})}}>{lang.home.table.rowMain.delete}</button></td>
            </tr>
          ))}
      </>
    );
  }

 


  return (
    <div className='p-2 mt-4 container'>
        <div className="d-flex justify-content-between align-items-center p-2 mb-2" style={{direction: lg === "ar"? "rtl" : "ltr"}}>
          <h2 className='text-center'>{lang.home.table.title}</h2>
          <button className={`btn btn-outline-danger ${products.length > 1? "" : "disabled"}`} onClick={() => typeFunction({type: "del-all",massage: "Do you sure you wand delete all?"})}>{lang.home.table.buttons.delAll}</button>
        </div>
        
         <div className="rtm">
            <Table striped bordered hover style={{direction: lg === "ar"? "rtl" : "ltr"}}>
              <thead>
                  <tr>
                  <th>#</th>
                  <th>{lang.home.table.rowMain.name}</th>
                  <th>{lang.home.table.rowMain.category}</th>
                  <th>{lang.home.table.rowMain.count}</th>
                  <th>{lang.home.table.rowMain.priceOne}</th>
                  <th>{lang.home.table.rowMain.priceAll}</th>
                  <th>{lang.home.table.rowMain.change}</th>
                  <th className={classNA.length > 0 ? classNA[0] : ""}>{lang.home.table.rowMain.sellOne}</th>
                  <th className={classNA.length > 0 ? classNA[1] : ""}>{lang.home.table.rowMain.countSell}</th>
                  <th className={classNA.length > 0 ? classNA[2] : ""}>{lang.home.table.rowMain.sellAll}</th>
                  <th className={classNA.length > 0 ? classNA[3] : ""}>{lang.home.table.rowMain.delete}</th>
                  </tr>
              </thead>
              <tbody>
                <Items currentItems={currentItems}/>
              </tbody>
          </Table>
         </div>
         
        <div className="paginationContent">
        
        <ReactPaginate
          breakLabel="..."
          nextLabel={<BsCaretRight />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel={<BsCaretLeft />}
          containerClassName='pagination'
          pageClassName='page-item'
          pageLinkClassName='page-link'
          previousLinkClassName='page-link'
          nextLinkClassName='page-link'
          previousClassName='page-item'
          nextClassName='page-item'
          activeClassName='active'
          breakClassName='page-item'
          breakLinkClassName='page-link'
          renderOnZeroPageCount={null}
        />
        </div>

        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={true}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{lang.ModuleNumber.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* table */}
          <table className="tableHomePage">
            <tbody>
              <tr>
                <th>{lang.ModuleNumber.name}</th> <td>{products.length > 0 ? products[getId].name : "notFount"}</td> <th>{lang.ModuleNumber.id}</th> <td>{products.length > 0 ? products[getId].id : "notFount"}</td>
              </tr>
              <tr>
                <th>{lang.ModuleNumber.category}</th> <td>{products.length > 0 ? products[getId].category : "notFount"}</td> <th>{lang.ModuleNumber.price}</th> <td>{products.length > 0 ? (+products[getId].price + +products[getId].taxes + +products[getId].ads + +products[getId].gain) - +products[getId].discount : "notFount"}</td>
              </tr>
              <tr>
                <th>{lang.ModuleNumber.count}</th> <td>{products.length > 0 ? products[getId].count : "notFount"}</td> <th>{lang.ModuleNumber.ps}</th> <td>{products.length > 0 ?numberSell * ((+products[getId].price + +products[getId].taxes + +products[getId].ads + +products[getId].gain) - +products[getId].discount) : "notFount 404!"}</td>
              </tr>
            </tbody>
          </table>
          {/* input limit */}
          <div className="control-form">
            <label>{lang.ModuleNumber.label}</label>
            <input type="number" value={numberSell} className={`form-control ${products.length > 0 ? numberSell > +products[getId].count -2 || numberSell < 2 ? "border-danger text-danger" : "" : "notFount 404!"}`} placeholder='here write number' onChange={(e) => setNumberSell(e.target.value)} />
            <span className={`font-monospace ${products.length > 0 ? numberSell > +products[getId].count -2 || numberSell < 2 ? "text-danger" : "text-secondary" : "notFount 404!"}`}>{products.length > 0 ? numberSell > +products[getId].count -2 || numberSell < 2 ?  "Sorry We can not work about this count" : `the limit 2 - ${+products[getId].count - 2}` : "notFount"}</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          {lang.ModuleNumber.cancel}
          </Button>
          <button className={`btn btn-primary ${products.length > 0 ? numberSell > +products[getId].count -2 || numberSell < 2 ? "disabled" : "" : "notFount 404!"}`} onClick={() => sellsNowNumberActive(getId)}>{lang.ModuleNumber.work}</button>
        </Modal.Footer>
        </Modal>


        <Modal show={ShowMod} onHide={CloseModule}>
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

export default TablesData