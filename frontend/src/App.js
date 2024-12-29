import './App.css';
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";
import { Provider } from "react-redux"
import AddItem from './components/AddItem';
import AddCategory from './components/AddCategory';
import AddExpense from './components/AddExpense';
import Navbar from './components/Navbar';
import DeleteItem from './components/DeleteItem';
import UpdateItem from './components/UpdateItem';
import AdminPage from './Pages/AdminPage';
import ItemPage from './Pages/ItemPage';
import CategoryPage from './Pages/CategoryPage';
import ReportPage from './Pages/ReportPage';
import ItemReportPage from './Pages/ItemReportPage';
import SalesReportPage from './Pages/SalesReportPage';
import CategoryReportPage from './Pages/CategoryReportPage';
import HomePage from './Pages/HomePage';
import store from './components/redux/store';
import Cart from './components/Cart';
import DeleteCategory from './components/DeleteCategory';
import UpdateStock from './components/UpdateStock';

import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { fetchItems } from './components/redux/ItemsSlice';
import StockReportPage from './Pages/StockReportPage';

function App() {
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);
  
  return (
    <Provider store={store}>
    <main className="flex min-h-screen flex-col bg-gradient-to-r from-green-500 via-blue-500 to-blue-900">
    <div>
   <BrowserRouter>
   <Routes>
    
    <Route path="/addItem" element={<>  <Navbar /> <AddItem /> </>} />
    <Route path="/addCategory" element={<>  <Navbar /> <AddCategory /> </>} />
    <Route path="/addExpense" element={<>  <Navbar /> <AddExpense /> </>} />
    <Route path="/deleteItem" element={ <>  <Navbar /> <DeleteItem /> </>} />
    <Route path="/deleteCategory" element={<>  <Navbar /> <DeleteCategory /> </>} />
    <Route path="/updateItem" element={ <>  <Navbar /> <UpdateItem /> </>} />
    <Route path="/updateStock" element={ <>  <Navbar /> <UpdateStock /> </>} />
    <Route path="/adminPage" element={<><Navbar/> <AdminPage/> </>} />
    <Route path="/itemPage" element={<><Navbar/> <ItemPage/> </>} />
    <Route path="/categoryPage" element={<><Navbar/> <CategoryPage/> </>} />
    <Route path="/reportPage" element={<><Navbar/> <ReportPage/> </>} />
    <Route path="/salesReportPage" element={<><Navbar/> <SalesReportPage/> </>} />
    <Route path="/itemReportPage" element={<><Navbar/> <ItemReportPage/> </>} />
    <Route path="/categoryReportPage" element={<><Navbar/> <CategoryReportPage/> </>} />
    <Route path="/stockReportPage" element={<><Navbar/> <StockReportPage/> </>} />
    <Route path="/" element={<><Navbar/> <HomePage/> </>} />
    <Route path="/home" element={<><Navbar/> <HomePage/> </>} />
    <Route path="/cart" element={<><Navbar/> <Cart/> </>} />

    
   </Routes>
   </BrowserRouter>
   </div>
   </main>
   </Provider>
  );
}

export default App;
