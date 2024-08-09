import React from 'react'
import AddSection from '../../Components/Home/AddSection'
import Cards from '../../Components/Home/Cards'

import "../../ui/CardStyle/card.css"
import TablesData from '../../Components/Home/TablesData'
import Languages from '../../Data/languages/langFunction'
import { Data } from '../../Data/Context/context'
function HomePage() {
  const lang = Languages();
  const cardsData = Data();

  if(window.localStorage.getItem("systemDetailsBuys") && window.localStorage.systemDetailsBuys !== null) {
    cardsData.setBuys(window.localStorage.systemDetailsBuys);
  }

  if(window.localStorage.getItem("systemDetailsSells") && window.localStorage.systemDetailsSells !== null) {
    cardsData.setSells(window.localStorage.systemDetailsSells);
  }

  return (
    <div>
        <AddSection />
        <div className="sectionCards">
          <Cards title={lang.home.cards.NumberOfProducts} Details={cardsData.products.length} />
          <Cards title={lang.home.cards.Buys} Details={"-"+cardsData.buys} color='danger'/>
          <Cards title={lang.home.cards.Sells} Details={cardsData.sells} color='success'/>
          <Cards title={"Your Money"} Details={"$" + cardsData.moneySystem} color='secondary'/>
        </div>
        <TablesData />
    </div>
  )
}

export default HomePage