import React,{useState} from 'react';
// css style
import "../../ui/Form/form.css";
// Data Functions => route: Data Folder
import Languages from "../../Data/languages/langFunction.js"; // fun to access data languages
import { Data } from '../../Data/Context/context.jsx'; // fun to access context
// hook
import notify from '../../hook/useNotifaction.js'; // fun to create message
// library
import { v4 as uuidv4 } from 'uuid'; // this create random id for product


function FormProduct({className}) {
   // variables
   const lang = Languages(); 
   // -- useState values
   const [name, setName] = useState("");
   const [price, setPrice] = useState(0);
   const [taxes, setTaxes] = useState(0);
   const [ads, setAds] = useState(0);
   const [gain, setGain] = useState(0);
   const [discount, setDiscount] = useState(0);
   const [count, setCount] = useState(1);
   const [category, setCategory] = useState("");
   // -- catch context
   const products = Data();
// --------------------------------------------------------------------- //

   // fun to create random id
   function randomId() {
      let id = uuidv4(); // Generate a new Id
      let state = false;
      const proLoop = products.products;
  
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

   //   This function to create product
   function create () {
      const p = products.products;
      // product data
      let product = {
         id: randomId(),
         name: name,
         category: category,
         count: count,
         price: price,
         taxes: taxes,
         ads: ads,
         discount: discount,
         gain: gain
     };
      // operation to know price product  
     let priceProduct = ((+price + +taxes + +ads) * +count);
     // security for create > if your money not enough to create product not allow create  
     if(priceProduct > +products.moneySystem){
        notify("Your money is not enough, Please add money in system money to create the product","error")
     } else {
         p.push(product)
         products.setProducts([...p])
         window.localStorage.productsC = JSON.stringify(products.products);
    
    
          //   Add Buy Function here
          products.setBuys(prev => {
             let x = prev
             x = +x + priceProduct;
             window.localStorage.systemDetailsBuys = x;
             return x;
          })
         //  Add Money System Function
          products.setMoneySystem(prev => {
            let x = prev
            x = +x - priceProduct;
            window.localStorage.moneySystem = x;
            return x;
          })
         //  make all things normal after create
         setName("");
         setCategory("");
         setCount(1);
         setPrice(0);
         setTaxes(0);
         setAds(0);
         setDiscount(0);
         setGain(0);
         //  show message for you say you create is success
         notify("Success Create Product","success")
     }

   
   }

  return (
    <div className='alert alert-light m-2 mt-5'>
        <h3 className="text-center">{lang.createProduct.content.title}</h3>
         {/* Name */}
        <div className='control-form'>
           <label>{lang.createProduct.content.ProductForm.name}</label>
           <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={lang.createProduct.content.ProductForm.name} className='form-control' />
        </div>

        <div className={`control-form group ${className[0]} ${className[1]}`}>
            {/* price */}
           <div>
            <label>{lang.createProduct.content.ProductForm.price}</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder={lang.createProduct.content.ProductForm.price} className='form-control' />
           </div>
            {/* taxes */}
           <div>
            <label>{lang.createProduct.content.ProductForm.taxes}</label>
            <input type="number" value={taxes} onChange={(e) => {setTaxes(e.target.value)}} placeholder={lang.createProduct.content.ProductForm.taxes} className='form-control' />
           </div>
            {/* ads */}
           <div>
            <label>{lang.createProduct.content.ProductForm.ads}</label>
            <input type="number" value={ads} onChange={(e) => {setAds(e.target.value)}} placeholder={lang.createProduct.content.ProductForm.ads} className='form-control' />
           </div>
            {/* gain */}
           <div>
            <label>{lang.createProduct.content.ProductForm.gain}</label>
            <input type="number" value={gain} onChange={(e) => {setGain(e.target.value)}} placeholder={lang.createProduct.content.ProductForm.gain} className='form-control' />
           </div>
            {/* discount */}
           <div className={`${className[2]}`}>
            <label>{lang.createProduct.content.ProductForm.discount}</label>
            <input type="number" value={discount} onChange={(e) => {setDiscount(e.target.value)}} placeholder={lang.createProduct.content.ProductForm.discount} className={`form-control ${+discount > +gain || +discount === +gain? "border-danger text-danger" : ""}`} />
           </div>
        </div>
         {/* first total */}
        <div className='control-form'>
           <span className={`total ${className[3]}`}>{lang.createProduct.content.ProductForm.total}<b>{+price + +taxes + +ads + +gain - +discount}</b>$</span>
        </div>
         {/* count */}
        <div className='control-form'>
         <label>{lang.createProduct.content.ProductForm.count}</label>
           <input type="number" value={count} onChange={(e) => {setCount(e.target.value)}} placeholder={lang.createProduct.content.ProductForm.count} className='form-control' />
        </div>
         {/* second total */}
        <div className='control-form'>
           <span className={`total ${className[4]} ${((+price + +taxes + +ads) * +count) > +products.moneySystem? "bg-danger" : "bg-dark"}`}>{lang.createProduct.content.ProductForm.total}<b>{(+price + +taxes + +ads) * +count}</b>$</span>
        </div>
         {/* category */}
        <div className='control-form'>
         <label>{lang.createProduct.content.ProductForm.Category}</label>
           <input type="text" value={category} onChange={(e) => {setCategory(e.target.value)}}  placeholder={lang.createProduct.content.ProductForm.Category} className='form-control' />
        </div>
         {/* button create */}
        <div className="d-flex justify-content-center align-items-center mt-3">
          <button 
          className={`btn btn-primary rounded-5 w-50 ${+discount > +gain || +discount === +gain? "disabled" : ""}`}
          onClick={create}
          >{lang.createProduct.content.ProductForm.btnForm}</button>
        </div>
    </div>
  )
}

export default FormProduct;