import React, {useEffect, useState} from 'react'
import "../../ui/Form/form.css"
// import { update } from '../../Data/Data_Products/dataFun.js';
// languages function
import Languages from "../../Data/languages/langFunction.js";
import { Data } from '../../Data/Context/context.jsx';
import notify from '../../hook/useNotifaction.js';

function FormChange() {
   const product = Data();
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

    const id = window.location.pathname.split("/").slice(-1);
    const index = update(id)
    
    console.log("index test: " + index)
    const lang = Languages();

    let buys = product.buys;
   const [name, setName] = useState("");
   const [price, setPrice] = useState(0);
   const [taxes, setTaxes] = useState(0);
   const [ads, setAds] = useState(0);
   const [gain, setGain] = useState();
   const [discount, setDiscount] = useState(0);
   const [count, setCount] = useState(0);
   const [category, setCategory] = useState("");

   


   useEffect(() => {
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

    buys =product.products.length > 0? +buys - ((+product.products[index].price + +product.products[index].taxes + +product.products[index].ads) * +product.products[index].count) : 0
    console.log(`p: ${product.buys} now: ${buys}`)
     
   function alreadyUpdate() {
      const s = product.products;
      s[index].name = name;
      s[index].category = category;
      s[index].count = count;
      s[index].price = price;
      s[index].taxes = taxes;
      s[index].ads = ads; 
      s[index].gain = gain;
      s[index].discount = discount;
      buys = +buys + ((+price + +taxes + +ads) * +count)
      product.setBuys(prev => {
         let x = prev;
         x = buys
         window.localStorage.systemDetailsBuys = x;
         return x;
      })
      product.setProducts([...s]);
      window.localStorage.productsC = JSON.stringify(product.products);
      notify("Success Change Product, After Tow Seconds You Will Go To Home Page","success");
      setTimeout(() => {
         window.location.pathname = '/';
      }, 2000);
      
   }

  return (
    <div className='alert alert-light m-2 mt-5'>
        <h3 className="text-center">{lang.updateProduct.content.title} {id}</h3>
        <div className='control-form'>
           <label>{lang.updateProduct.content.ProductForm.name}</label>
           <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={lang.updateProduct.content.ProductForm.name} className='form-control' />
        </div>
        <div className='control-form group'>
           <div>
            <label>{lang.updateProduct.content.ProductForm.price}</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder={lang.updateProduct.content.ProductForm.price} className='form-control' />
           </div>
           <div>
            <label>{lang.updateProduct.content.ProductForm.taxes}</label>
            <input type="number" value={taxes} onChange={(e) => {setTaxes(e.target.value)}} placeholder={lang.updateProduct.content.ProductForm.taxes} className='form-control' />
           </div>
           <div>
            <label>{lang.updateProduct.content.ProductForm.ads}</label>
            <input type="number" value={ads} onChange={(e) => {setAds(e.target.value)}} placeholder={lang.updateProduct.content.ProductForm.ads} className='form-control' />
           </div>
           <div>
            <label>{lang.updateProduct.content.ProductForm.gain}</label>
            <input type="number" value={gain} onChange={(e) => {setGain(e.target.value)}} placeholder={lang.updateProduct.content.ProductForm.gain} className='form-control' />
           </div>
           <div>
            <label>{lang.updateProduct.content.ProductForm.discount}</label>
            <input type="number" value={discount} onChange={(e) => {setDiscount(e.target.value)}} placeholder={lang.updateProduct.content.ProductForm.discount} className={`form-control ${+discount > +gain || +discount === +gain? "border-danger text-danger" : ""}`} />
           </div>
        </div>
        <div className='control-form'>
           <span className='total'>{lang.updateProduct.content.ProductForm.total}<b>{+price + +taxes + +ads + +gain - +discount}</b>$</span>
        </div>
        <div className='control-form'>
         <label>{lang.updateProduct.content.ProductForm.count}</label>
           <input type="number" value={count} onChange={(e) => {setCount(e.target.value)}} placeholder={lang.updateProduct.content.ProductForm.count} className='form-control' />
        </div>
        <div className='control-form'>
         <label>{lang.updateProduct.content.ProductForm.Category}</label>
           <input type="text" value={category} onChange={(e) => {setCategory(e.target.value)}}  placeholder={lang.updateProduct.content.ProductForm.Category} className='form-control' />
        </div>

        <div className="d-flex justify-content-center align-items-center mt-3">
          <button className={`btn btn-primary rounded-5 w-50 ${+discount > +gain || +discount === +gain? "disabled" : ""}`} onClick={alreadyUpdate}>{lang.updateProduct.content.ProductForm.btnForm}</button>
        </div>
    </div>
  )
}

export default FormChange