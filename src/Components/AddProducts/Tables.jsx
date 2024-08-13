import React, {useState,useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import { MdOutlineDeleteOutline } from "react-icons/md";
import "../../ui/Tables.AddProducts/tables.css"
import { IoIosAdd } from "react-icons/io";
import { Data } from '../../Data/Context/context.jsx';
// languages function
import Languages from "../../Data/languages/langFunction.js";
import notify from '../../hook/useNotifaction.js';
import { v4 as uuidv4 } from 'uuid';
import Alert from 'react-bootstrap/Alert';

function Tables() {
 
    const modules = Data();
    const lang = Languages();


    const [limit, setLimit] = useState(1)
    const [localData, setLocalData] = useState([])
    const [error, setError] = useState(false);
    const [mError, setMError] = useState("")
    // create data

    function randomId() {
        let id = uuidv4(); // Generate a new UUID
        let state = false;
        const proLoop = modules.products;
    
        for (let i = 0; i < proLoop.length; i++) {
            if (+id === proLoop[i].id) {
                state = true;
                break;
            }
        }
    
        if (state) {
            console.log("the id is change...");
            return randomId();
        } else {
            return id;
        }
    }
  

    function createData() {
        const a = [];
        let d = {};
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
        setLocalData([...localData,...a])
    }


    function handleChange(index,flied, value) {
        setLocalData(prev => {
            const d = [...prev];
            d[index] = {...d[index],[flied]: value};
            return d
        })
    }

    function deleteOneItem(index) {
        setLocalData(prev => {
            const d = [...prev];
            d.splice(index,1);
            return d
        })
    }

    function createDataMore() {
        createData();
        setLimit(1);
    }

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


    useEffect(() => {
        localData.map(item => {
            check(item);
            return item;
        })
    }, [localData])


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
        <Alert show={localData.length > 0? error : false } variant="danger">
        <p>
          {mError}
        </p>
      </Alert>
        <div className="headerTables">
            <h2>{lang.createProducts.content.title}</h2>
            <div className="AddForm">
                <input type="number" value={limit} onChange={(e) => {setLimit(+e.target.value)}} placeholder={lang.createProducts.content.placeholderLimit}/>
                <button onClick={createDataMore}><IoIosAdd /></button>
            </div>
        </div>
        <div className="TableCR">
        <Table striped bordered hover>
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
        <button className='btn btn-outline-primary w-100' onClick={createData}>{lang.createProducts.content.ProductsTable.btnForm.btnAdd}</button>
        <div className="btnServerUpload">
            <button className={`btn btn-success rounded-5 ${error? "disabled" : ""} ${localData.length <= 0? "disabled" : ""}`} onClick={Post}>{lang.createProducts.content.ProductsTable.btnForm.btnUpload}</button>
        </div>
    </div>
  )
}

export default Tables