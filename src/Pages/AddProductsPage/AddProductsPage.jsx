import React, {useState,useEffect} from 'react';
// components
import HeaderScreen from '../../Components/AddProducts/HeaderScreen';
import Tables from '../../Components/AddProducts/Tables';
// library
import Joyride from 'react-joyride';
// data Joyride
import addProductsSteps from '../../Data/OfferSite/addProducts'

function AddProductsPage() {
  // useState Joyride
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    // Check if the tour has been completed
    const isTourCompleted = localStorage.getItem('addProductsTour');
    if (!isTourCompleted) {
      setRunTour(true);
    }
  }, []);

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = ['finished', 'skipped'];

    if (finishedStatuses.includes(status)) {
      // Mark the tour as completed
      localStorage.setItem('addProductsTour', true);
      setRunTour(false);
    }
  };
  return (
    <div>
        <Joyride steps={addProductsSteps} callback={handleJoyrideCallback} run={runTour} continuous showProgress showSkipButton  />
        <HeaderScreen />
        <Tables className={["input-limit-step","plus-add-step","add-product-step","last-upload-step"]} />
    </div>
  )
}

export default AddProductsPage