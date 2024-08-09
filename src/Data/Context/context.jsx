import { createContext,useContext,useState,useEffect } from "react";




export const ContextVal = createContext({});

export function ContextShare({children}) {
    const [showModule, setShowModule] = useState(false);
    const [products, setProducts] = useState([]);
    const [sells, setSells] = useState(0);
    const [buys, setBuys] = useState(0);
    const [moneySystem, setMoneySystem] = useState(0)
    // if(localStorage.getItem('productsC') && localStorage.productsC !== null) {
    //     setProducts([...JSON.parse(localStorage.productsC)])
    // }

    useEffect(() => {
        if(window.localStorage.getItem("productsC") && window.localStorage.productsC !== null) {
            setProducts([...JSON.parse(window.localStorage.productsC)])
        }
    },[])

    const defaultValue = {
        products: products,
        setProducts: setProducts,
        showModule : showModule,
        setShowModule : setShowModule,
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

export const Data = () => useContext(ContextVal)