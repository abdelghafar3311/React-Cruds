import { Data } from "../Context/context";
export const getData = () => {
    const products = Data();
    if(window.localStorage.getItem('productsC') && window.localStorage.productsC != null) {
      products.setProducts([...JSON.parse(window.localStorage.productsC)])
    }
}