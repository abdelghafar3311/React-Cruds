import { createContext,useContext,useState,useEffect } from "react";



// create context
export const ContextVal = createContext({});
// context component
export function ContextShare({children}) {
    // values -useState
    const [products, setProducts] = useState([]);
    const [sells, setSells] = useState(0);
    const [buys, setBuys] = useState(0);
    const [moneySystem, setMoneySystem] = useState(0);

    useEffect(() => {
        if(window.localStorage.getItem("productsC") && window.localStorage.productsC !== null) {
            setProducts([...JSON.parse(window.localStorage.productsC)])
        }
    },[])
    // default value
    const defaultValue = {
        products: products,
        setProducts: setProducts,
        buys: buys,
        setBuys: setBuys,
        sells: sells,
        setSells: setSells,
        moneySystem: moneySystem,
        setMoneySystem: setMoneySystem
    }
    return(
        <ContextVal.Provider value={defaultValue}>
            {children}
        </ContextVal.Provider>
    )
}
// use context
export const Data = () => useContext(ContextVal)