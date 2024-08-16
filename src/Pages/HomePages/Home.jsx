import React, {useEffect,useState} from 'react';
// library
import Joyride from 'react-joyride';
// data Joyride
import HomeSteps from '../../Data/OfferSite/home';
// components
import AddSection from '../../Components/Home/AddSection'
import Cards from '../../Components/Home/Cards'
import TablesData from '../../Components/Home/TablesData';
// css file
import "../../ui/CardStyle/card.css"
// data folder
import Languages from '../../Data/languages/langFunction'
import { Data } from '../../Data/Context/context'


function HomePage() {
  // main values
  const lang = Languages();
  const cardsData = Data();
  // useState Joyride
  const [runTour, setRunTour] = useState(false);


  useEffect(() => {
    // catch if data found or no
    if(window.localStorage.getItem("systemDetailsBuys") && window.localStorage.systemDetailsBuys !== null) {
    cardsData.setBuys(window.localStorage.systemDetailsBuys);
    }

    if(window.localStorage.getItem("systemDetailsSells") && window.localStorage.systemDetailsSells !== null) {
      cardsData.setSells(window.localStorage.systemDetailsSells);
    }

    // Check if the tour has been completed
    const isTourCompleted = localStorage.getItem('HomeTour');
    if (!isTourCompleted) {
      setRunTour(true);
    }
  }, []);

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = ['finished', 'skipped'];

    if (finishedStatuses.includes(status)) {
      // Mark the tour as completed
      localStorage.setItem('HomeTour', true);
      setRunTour(false);
    }
  };
  

  return (
    <div>
        <Joyride steps={HomeSteps} run={runTour} continuous showProgress showSkipButton callback={handleJoyrideCallback}/>
        <AddSection className="del-all-bs-step" />
        <div className="sectionCards">
          <Cards title={lang.home.cards.NumberOfProducts} Details={cardsData.products.length}/>
          <Cards title={lang.home.cards.Buys} Details={cardsData.buys} color='danger' className="buys-step"/>
          <Cards title={lang.home.cards.Sells} Details={cardsData.sells} color='success' className="sells-step"/>
          <Cards title={lang.home.cards.Money} Details={"$" + cardsData.moneySystem} color='secondary' className="money-cart-step"/>
        </div>
        <TablesData classNA={["sell-one-step","sell-number-step","sell-all-step","del-step"]}/>
    </div>
  )
}

export default HomePage