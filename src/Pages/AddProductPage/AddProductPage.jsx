import React, {useState,useEffect} from 'react';
// components
import HeaderSection from '../../Components/AddProduct/HeaderSection';
import FormProduct from '../../Components/AddProduct/FormProduct';
import Loading from '../../Utils/Loading';
// library
import Joyride from 'react-joyride';
// data Joyride
import addProductSteps from '../../Data/OfferSite/addProduct';


function AddProductPage() {
   // check site is start or no
   const [isClient, setIsClient] = useState(false);
  // useState for Joyride
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    // make client true
    setIsClient(true);
    // Check if the tour has been completed
    const isTourCompleted = localStorage.getItem('addProductTour');
    if (!isTourCompleted) {
      setRunTour(true);
    }
  }, [])
  
  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = ['finished', 'skipped'];

    if (finishedStatuses.includes(status)) {
      // Mark the tour as completed
      localStorage.setItem('addProductTour', true);
      setRunTour(false);
    }
  };

  if(isClient === false) {
    return <Loading />
  }

  return (
    <div>
      <Joyride steps={addProductSteps} callback={handleJoyrideCallback} run={runTour} continuous showProgress showSkipButton />
      <HeaderSection />
      <FormProduct className={["plus-one-step", "plus-tow-step", "min-step", "total-one-step", "total-tow-step"]} />
    </div>
  )
}

export default AddProductPage