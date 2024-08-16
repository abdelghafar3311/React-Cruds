import React, {useEffect, useState} from 'react'
// css file
import "../../ui/Form/form.css"
// data folder functions
import Languages from "../../Data/languages/langFunction.js";
import { Data } from '../../Data/Context/context.jsx';
// hook
import notify from '../../hook/useNotifaction.js';

function FormChange() {
   const product = Data();
   // here catch id
   const update = (id) => {
      let pro = product.products;
      let index = -1;
      for (let i = 0; i < pro.length; i++) {
        if(pro[i].id.includes(id)) {
            index = i;
            break;
        }
      }
      return index;
    }
   //  here get id from link (http:........./1)
    const id = window.location.pathname.split("/").slice(-1);
    const index = update(id) // find index
   //  language site
    const lang = Languages();
   
   let buys = product.buys; // catch buys
   let money = product.moneySystem; // catch money system
   // useState Values
   const [name, setName] = useState("");
   const [price, setPrice] = useState(0);
   const [taxes, setTaxes] = useState(0);
   const [ads, setAds] = useState(0);
   const [gain, setGain] = useState();
   const [discount, setDiscount] = useState(0);
   const [count, setCount] = useState(0);
   const [category, setCategory] = useState("");

   


   useEffect(() => {
      // here put static data
      if(product.products.length > 0 && index >= 0 && index < product.products.length) {
        setName(product.products[index].name);
        setCategory(product.products[index].category);
        setCount(product.products[index].count);
        setPrice(product.products[index].price);
        setTaxes(product.products[index].taxes);
        setAds(product.products[index].ads);
        setGain(product.products[index].gain);
        setDiscount(product.products[index].discount);
      }
   
    }, [index, product.products]);

   //  operation for money and buys to become without product price
    buys =product.products.length > 0? +buys - ((+product.products[index].price + +product.products[index].taxes + +product.products[index].ads) * +product.products[index].count) : 0
    money =product.products.length > 0? +money + ((+product.products[index].price + +product.products[index].taxes + +product.products[index].ads) * +product.products[index].count) : 0

   //  Function Change 
   function alreadyUpdate() {
      const priceProduct = ((+price + +taxes + +ads) * +count); // price product
      // security for money if not enough
      if(priceProduct > money) {
         notify("your money is not enough", "error")
      } else {
         // products
         const s = product.products;
         // put data in products
         s[index].name = name;
         s[index].category = category;
         s[index].count = count;
         s[index].price = price;
         s[index].taxes = taxes;
         s[index].ads = ads; 
         s[index].gain = gain;
         s[index].discount = discount;
         // operation for buys and money (update all them)
         buys = +buys + priceProduct;
         money = +money - priceProduct;
         // push updates buys
         product.setBuys(prev => {
            let x = prev;
            x = buys
            window.localStorage.systemDetailsBuys = x;
            return x;
         })
         // push updates money
         product.setMoneySystem(prev => {
            let x = prev
            x = money;
            window.localStorage.moneySystem = x;
            return x;
         })
         // put data in main database
         product.setProducts([...s]);
         // save data in storage
         window.localStorage.productsC = JSON.stringify(product.products);
         // output message
         notify("Success Change Product, After Tow Seconds You Will Go To Home Page","success");
         // go to home page
         setTimeout(() => {
            window.location.pathname = '/';
         }, 2000);
      }
      
   }

  return (
    <div className='alert alert-light m-2 mt-5'>
        <h3 className="text-center">{lang.updateProduct.content.title} {id}</h3>
         {/* Name */}
        <div className='control-form'>
           <label>{lang.updateProduct.content.ProductForm.name}</label>
           <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={lang.updateProduct.content.ProductForm.name} className='form-control' />
        </div>

        <div className='control-form group'>
         {/* price */}
           <div>
            <label>{lang.updateProduct.content.ProductForm.price}</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder={lang.updateProduct.content.ProductForm.price} className='form-control' />
           </div>
         {/* taxes */}
           <div>
            <label>{lang.updateProduct.content.ProductForm.taxes}</label>
            <input type="number" value={taxes} onChange={(e) => {setTaxes(e.target.value)}} placeholder={lang.updateProduct.content.ProductForm.taxes} className='form-control' />
           </div>
         {/* ads */}
           <div>
            <label>{lang.updateProduct.content.ProductForm.ads}</label>
            <input type="number" value={ads} onChange={(e) => {setAds(e.target.value)}} placeholder={lang.updateProduct.content.ProductForm.ads} className='form-control' />
           </div>
         {/* gain */}
           <div>
            <label>{lang.updateProduct.content.ProductForm.gain}</label>
            <input type="number" value={gain} onChange={(e) => {setGain(e.target.value)}} placeholder={lang.updateProduct.content.ProductForm.gain} className='form-control' />
           </div>
         {/* discount */}
           <div>
            <label>{lang.updateProduct.content.ProductForm.discount}</label>
            <input type="number" value={discount} onChange={(e) => {setDiscount(e.target.value)}} placeholder={lang.updateProduct.content.ProductForm.discount} className={`form-control ${+discount > +gain || +discount === +gain? "border-danger text-danger" : ""}`} />
           </div>
        </div>
         {/* first total */}
        <div className='control-form'>
           <span className='total'>{lang.updateProduct.content.ProductForm.total}<b>{+price + +taxes + +ads + +gain - +discount}</b>$</span>
        </div>
         {/* count */}
        <div className='control-form'>
         <label>{lang.updateProduct.content.ProductForm.count}</label>
           <input type="number" value={count} onChange={(e) => {setCount(e.target.value)}} placeholder={lang.updateProduct.content.ProductForm.count} className='form-control' />
        </div>
         {/* second total */}
        <div className='control-form'>
           <span className={`total ${((+price + +taxes + +ads) * +count) > money? "bg-danger" : "bg-dark"}`}>{lang.createProduct.content.ProductForm.total}<b>{(+price + +taxes + +ads) * +count}</b>$</span>
        </div>
         {/* category */}
        <div className='control-form'>
         <label>{lang.updateProduct.content.ProductForm.Category}</label>
           <input type="text" value={category} onChange={(e) => {setCategory(e.target.value)}}  placeholder={lang.updateProduct.content.ProductForm.Category} className='form-control' />
        </div>
         {/* button change */}
        <div className="d-flex justify-content-center align-items-center mt-3">
          <button className={`btn btn-primary rounded-5 w-50 ${+discount > +gain || +discount === +gain? "disabled" : ""}`} onClick={alreadyUpdate}>{lang.updateProduct.content.ProductForm.btnForm}</button>
        </div>
    </div>
  )
}

export default FormChange