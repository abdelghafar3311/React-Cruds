import React, {useState,useEffect} from 'react'
// css style component
import "../../ui/Tables.AddProducts/tables.css"

// bootstrap
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
// icons
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";

// Fun Data Folder
import { Data } from '../../Data/Context/context.jsx';
import Languages from "../../Data/languages/langFunction.js";
import { lang as lg } from '../../Data/languages/langFunction.js';

// hook
import notify from '../../hook/useNotifaction.js';

// library
import { v4 as uuidv4 } from 'uuid';


function Tables({className}) {
    
    // values !import
    const modules = Data();
    const lang = Languages();

    // useState Values
    const [limit, setLimit] = useState(1) // limit data create
    const [localData, setLocalData] = useState([]) // local data
    const [error, setError] = useState(false); // error status
    const [mError, setMError] = useState("") // error message
    // Know Price All Products Created
    const [allPriceCreate, setAllPriceCreate] = useState({errorStatus: false,price: 0})
    // ---------------------------------------------------------------------- //

    // Random function
    function randomId() {
        let id = uuidv4(); // Generate a new Id
        let state = false;
        const proLoop = modules.products;
        // this loop to check if id has like it in products
        for (let i = 0; i < proLoop.length; i++) {
            if (+id === proLoop[i].id) {
                state = true;
                break;
            }
        }
        // this status about id if like it in products or no 
        if (state) {
            console.log("the id is change...");
            return randomId();
        } else {
            return id;
        }
    }
  
    // Create Data in local data (not upload server)
    function createData() {
        const a = [];
        let d = {};
        // here loop in limit to create data
        for(let i = 0;i < limit; i++) {
            let r = randomId();
            d = {
                id: r,
                name: '',
                category: '',
                count: '',
                price: '',
                taxes: '',
                ads: '',
                gain: '',
                discount: ''
            }
            a.push(d);
        }
        // here put data in local data
        setLocalData([...localData,...a])
    }

    // this fun to catch changing in inputs create (This work like update data)
    function handleChange(index,flied, value) {
        setLocalData(prev => {
            const d = [...prev];
            d[index] = {...d[index],[flied]: value};
            return d
        })
    }
    // this allow you delete data which in local data
    function deleteOneItem(index) {
        setLocalData(prev => {
            const d = [...prev];
            d.splice(index,1);
            return d
        })
    }
    // this to create more data
    function createDataMore() {
        createData();
        setLimit(1);
    }
    // this security function to check if data is filled or no
    function check(item) {
        if (
            item.name === "" || item.name === undefined || item.name === null ||
            item.category === "" || item.category === undefined || item.category === null
        ) {
            setError(true);
            setMError("Has problem in name or category inputs");
        } else if (
            item.price === "" || +item.price <= 0 || item.price === undefined || item.price === null ||
            item.taxes === undefined || item.taxes === null ||
            item.ads === undefined || item.ads === null
        ) {
            setError(true);
            setMError("Has problem in price or taxes or ads inputs");
        } else if (
            item.gain === "" || +item.gain <= 0 || item.gain === undefined || item.gain === null ||
            item.discount === "" || +item.discount > +item.gain
        ) {
            setError(true);
            setMError("Has problem in gain or discount inputs");
        } else if (
            +item.count < 0 || item.count === ""
        ) {
            setError(true);
            setMError("Has problem in count input");
        } else {
            setError(false);
            setMError("");
        }
    }

    // Know The Price Product Local Which You Create Them.
    function BuysAllProductsLocal() {
        const totalBuys = localData.reduce((acc, item) => {
            const price = item.price ? +item.price : 0;
            const taxes = item.taxes ? +item.taxes : 0;
            const ads = item.ads ? +item.ads : 0;
            const count = item.count ? +item.count : 1;
            return acc + ((price + taxes + ads) * count);
        }, 0);
        if(totalBuys > +modules.moneySystem){
            setAllPriceCreate({errorStatus: true,price: totalBuys});
            notify("Your money is not enough", "warn")
        } else {
            setAllPriceCreate({errorStatus: false,price: totalBuys});
        }
    }


    useEffect(() => {
        localData.map(item => {
            check(item);
            return item;
        });
        BuysAllProductsLocal();
    }, [localData])

    // upload data from local to server and this finally step
     function Post() {
         for(let i = 0;i < localData.length;i++) {
            check(localData[i]);
        }

        if(error === true) {
            return null;
        } else  {

            const totalBuys = localData.reduce((acc, item) => {
                const price = item.price ? +item.price : 0;
                const taxes = item.taxes ? +item.taxes : 0;
                const ads = item.ads ? +item.ads : 0;
                const count = item.count ? +item.count : 1;
                return acc + ((price + taxes + ads) * count);
              }, 0);

            //   security money if not enough
              if(totalBuys > +modules.moneySystem)
              {
                notify("Your money is not enough,please go to system of money and add money or translate to create the products", "error");
              } else {
                const db = localData;

                modules.setProducts(prev => {
                    const g = [...prev, ...db];
                    console.log("db state:");
                    console.log(g);
                    window.localStorage.productsC = JSON.stringify(g);
                    return g;
                });
                
                modules.setBuys(prev => {
                    let x = prev;
                    x = +x + totalBuys
                    window.localStorage.systemDetailsBuys = x;
                    return x;
                })
                modules.setMoneySystem(prev => {
                    let x = prev
                    x = +x - totalBuys;
                    window.localStorage.moneySystem = x;
                    return x;
                  })
                setLocalData([]);
                notify("Success Create Products","success");
              }

            
            
        }
    }

   
  return (
    <div className='alert alert-light mt-5'>
        {/* alert if found error */}
        <Alert show={localData.length > 0? error : false } variant="danger">
            <p>
            {mError}
            </p>
        </Alert>

        <div className="headerTables">
            <h2>{lang.createProducts.content.title}</h2>

            <div className="AddForm">
                <input className={className[0]}  type="number" value={limit} onChange={(e) => {setLimit(+e.target.value)}} placeholder={lang.createProducts.content.placeholderLimit}/>
                <button className={className[1]} onClick={createDataMore}><IoIosAdd /></button>
            </div>

        </div>

        <div className="TableCR">
            <Table striped bordered hover style={{direction: lg === "ar"? "rtl" : "ltr"}}>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>{lang.createProducts.content.ProductsTable.row.name}</th>
                    <th>{lang.createProducts.content.ProductsTable.row.Category}</th>
                    <th className='text-center'>
                    {lang.createProducts.content.ProductsTable.row.price}
                    </th>
                    <th>{lang.createProducts.content.ProductsTable.row.count}</th>
                    <th>{lang.createProducts.content.ProductsTable.row.delete}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        localData.length > 0? (localData.map((item,i) => {
                            return(
                                <tr>
                                    <td>{i + 1}</td>
                                    <td><input type="text" value={item.name} onChange={(e) => handleChange(i,"name",e.target.value)} placeholder={lang.createProducts.content.ProductsTable.placeholderFormsRows.name}/></td>
                                    <td><input type="text" value={item.category} onChange={(e) => handleChange(i,"category",e.target.value)} placeholder={lang.createProducts.content.ProductsTable.placeholderFormsRows.Category}/></td>
                                    <th className='thContainer'>
                                        <td><input type="number" value={item.price} onChange={(e => handleChange(i,"price",e.target.value))} placeholder={lang.createProducts.content.ProductsTable.placeholderFormsRows.price}/></td>
                                        <td><input type="number" value={item.taxes} onChange={(e) => handleChange(i,"taxes",e.target.value)} placeholder={lang.createProducts.content.ProductsTable.placeholderFormsRows.taxes}/></td>
                                        <td><input type="number" value={item.ads} onChange={(e) => handleChange(i,"ads",e.target.value)} placeholder={lang.createProducts.content.ProductsTable.placeholderFormsRows.ads}/></td>
                                        <td><input type="number" value={item.gain} onChange={(e) => handleChange(i,"gain",e.target.value)} placeholder={lang.createProducts.content.ProductsTable.placeholderFormsRows.gain}/></td>
                                        <td><input type="number" value={item.discount} onChange={(e) => handleChange(i,"discount",e.target.value)} placeholder={lang.createProducts.content.ProductsTable.placeholderFormsRows.discount} className={`${+item.discount > +item.gain || +item.discount === +item.gain? "border-danger text-danger" : ""}`} /></td>
                                        <td><span className='total'>{lang.createProducts.content.ProductsTable.placeholderFormsRows.total}(<b>{+item.price + +item.taxes + +item.ads + +item.gain - +item.discount}</b>$)</span></td>
                                    </th>
                                    <td><input type="number" value={item.count} onChange={(e) => handleChange(i,"count",e.target.value)} placeholder={lang.createProducts.content.ProductsTable.placeholderFormsRows.count} /></td>
                                    <td><button className='btn btn-danger' onClick={() => deleteOneItem(i)}><MdOutlineDeleteOutline /></button></td>
                                </tr>
                            )
                        })) : <tr><td colSpan={6}><p className='alert alert-warning text-center'>The limit is zero</p></td></tr>
                    }
                </tbody>
            </Table>
        </div>

        <button className={`btn btn-outline-primary w-100 ${className[2]}`} onClick={createData}>{lang.createProducts.content.ProductsTable.btnForm.btnAdd}</button>
        
        <div className="btnServerUpload gap-1">
            <button className={`btn rounded-5 disabled ${allPriceCreate.errorStatus? "btn-danger" : "btn-outline-dark"}`}>{lang.createProducts.content.ProductsTable.btnForm.know}: ${allPriceCreate.price}</button>
            <button className={`btn btn-success rounded-5 ${error? "disabled" : ""} ${localData.length <= 0? "disabled" : ""} ${className[3]}`} onClick={Post}>{lang.createProducts.content.ProductsTable.btnForm.btnUpload}</button>
        </div>
    
    </div>
  )
}

export default Tables