import {useState, useEffect} from 'react';
// components
import HeaderSection from '../../Components/ChangeComponemts/HeaderSection';
import FormChange from '../../Components/ChangeComponemts/FormChange';
import Loading from '../../Utils/Loading';

function ChangePage() {
  // check site is start or no
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, [])
  if(isClient === false) {
    return <Loading />
  }
  return (
    <div>
        <HeaderSection />
        <FormChange />
    </div>
  )
}

export default ChangePage