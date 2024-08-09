import React,{useState} from 'react'
import "../../ui/Form/form.css"
import Languages from "../../Data/languages/langFunction.js";
import { Data } from '../../Data/Context/context.jsx';
// import { randomId } from '../../Data/Data_Products/dataFun.js';
import notify from '../../hook/useNotifaction.js';
import { v4 as uuidv4 } from 'uuid';


function FormProduct() {
   const lang = Languages();
   const [name, setName] = useState("");
   const [price, setPrice] = useState(0);
   const [taxes, setTaxes] = useState(0);
   const [ads, setAds] = useState(0);
   const [gain, setGain] = useState(0);
   const [discount, setDiscount] = useState(0);
   const [count, setCount] = useState(0);
   const [category, setCategory] = useState("");

   const products = Data();

   function randomId() {
      let id = uuidv4(); // Generate a new UUID
      let state = false;
      const proLoop = products.products;
  
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

   function create () {
      const p = products.products;
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
     p.push(product)
     products.setProducts([...p])
     window.localStorage.productsC = JSON.stringify(products.products);
      //   Add Buy Function here
      products.setBuys(prev => {
         let x = prev
         x = +x + ((+price + +taxes + +ads) * +count);
         window.localStorage.systemDetailsBuys = x;
         return x;
      })
     setName("");
     setCategory("");
     setCount(0);
     setPrice(0);
     setTaxes(0);
     setAds(0);
     setDiscount(0);
     setGain(0);

     notify("Success Create Product","success")
   }

  return (
    <div className='alert alert-light m-2 mt-5'>
        <h3 className="text-center">{lang.createProduct.content.title}</h3>
        <div className='control-form'>
           <label>{lang.createProduct.content.ProductForm.name}</label>
           <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={lang.createProduct.content.ProductForm.name} className='form-control' />
        </div>
        <div className='control-form group'>
           <div>
            <label>{lang.createProduct.content.ProductForm.price}</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder={lang.createProduct.content.ProductForm.price} className='form-control' />
           </div>
           <div>
            <label>{lang.createProduct.content.ProductForm.taxes}</label>
            <input type="number" value={taxes} onChange={(e) => {setTaxes(e.target.value)}} placeholder={lang.createProduct.content.ProductForm.taxes} className='form-control' />
           </div>
           <div>
            <label>{lang.createProduct.content.ProductForm.ads}</label>
            <input type="number" value={ads} onChange={(e) => {setAds(e.target.value)}} placeholder={lang.createProduct.content.ProductForm.ads} className='form-control' />
           </div>
           <div>
            <label>{lang.createProduct.content.ProductForm.gain}</label>
            <input type="number" value={gain} onChange={(e) => {setGain(e.target.value)}} placeholder={lang.createProduct.content.ProductForm.gain} className='form-control' />
           </div>
           <div>
            <label>{lang.createProduct.content.ProductForm.discount}</label>
            <input type="number" value={discount} onChange={(e) => {setDiscount(e.target.value)}} placeholder={lang.createProduct.content.ProductForm.discount} className={`form-control ${+discount > +gain || +discount === +gain? "border-danger text-danger" : ""}`} />
           </div>
        </div>
        <div className='control-form'>
           <span className='total'>{lang.createProduct.content.ProductForm.total}<b>{+price + +taxes + +ads + +gain - +discount}</b>$</span>
        </div>
        <div className='control-form'>
         <label>{lang.createProduct.content.ProductForm.count}</label>
           <input type="number" value={count} onChange={(e) => {setCount(e.target.value)}} placeholder={lang.createProduct.content.ProductForm.count} className='form-control' />
        </div>
        <div className='control-form'>
         <label>{lang.createProduct.content.ProductForm.Category}</label>
           <input type="text" value={category} onChange={(e) => {setCategory(e.target.value)}}  placeholder={lang.createProduct.content.ProductForm.Category} className='form-control' />
        </div>

        <div className="d-flex justify-content-center align-items-center mt-3">
          <button 
          className={`btn btn-primary rounded-5 w-50 ${+discount > +gain || +discount === +gain? "disabled" : ""}`}
          onClick={create}
          >{lang.createProduct.content.ProductForm.btnForm}</button>
        </div>
    </div>
  )
}

export default FormProduct