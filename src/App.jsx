// css file
import './App.css';
// library
import { Route,Routes,BrowserRouter } from 'react-router-dom';
import { ToastContainer,Zoom } from 'react-toastify';
// bootstrap route
import 'bootstrap/dist/css/bootstrap.min.css';

// import utils components
import NavBar from './Utils/NavBar';
// import Pages
import HomePage from './Pages/HomePages/Home';
import AddProductPage from './Pages/AddProductPage/AddProductPage';
import ChangePage from './Pages/ChangePage/ChangePage';
import AddProductsPage from './Pages/AddProductsPage/AddProductsPage';
import SearchItemsData from './Pages/SearchItemsDataPage/SearchItemsData';





function App() {

  document.title = "React Cruds"

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
         <Routes>
          <Route element={<HomePage />} path='/'/>
          <Route element={<AddProductPage />} path='/add-product'/>
          <Route element={<ChangePage />} path='/ChangeProduct/:id'/>
          <Route element={<AddProductsPage />} path='/add-products'/>
          <Route element={<SearchItemsData />} path='/search-page'/>
         </Routes>
        <ToastContainer 
         position='top-right'
         transition={Zoom}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;