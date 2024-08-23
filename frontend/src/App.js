import './App.css';
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";
import { Provider } from "react-redux"
import AddItem from './components/AddItem';
import AddCategory from './components/AddCategory';
import Navbar from './components/Navbar';
import DeleteItem from './components/DeleteItem';
import UpdateItem from './components/UpdateItem';
import AdminPage from './components/AdminPage';
import ItemPage from './components/ItemPage';
import CategoryPage from './components/CategoryPage';
import ReportPage from './components/ReportPage';
import HomePage from './components/HomePage';
import store from './components/redux/store';
import Cart from './components/Cart';
import DeleteCategory from './components/DeleteCategory';
import UpdateStock from './components/UpdateStock';

function App() {
  return (
    <Provider store={store}>
    <main className="flex min-h-screen flex-col bg-gradient-to-r from-green-500 via-blue-500 to-blue-900">
    <div>
   <BrowserRouter>
   <Routes>
    
    <Route path="/addItem" element={<>  <Navbar /> <AddItem /> </>} />
    <Route path="/addCategory" element={<>  <Navbar /> <AddCategory /> </>} />
    <Route path="/deleteItem" element={ <>  <Navbar /> <DeleteItem /> </>} />
    <Route path="/deleteCategory" element={<>  <Navbar /> <DeleteCategory /> </>} />
    <Route path="/updateItem" element={ <>  <Navbar /> <UpdateItem /> </>} />
    <Route path="/updateStock" element={ <>  <Navbar /> <UpdateStock /> </>} />
    <Route path="/adminPage" element={<><Navbar/> <AdminPage/> </>} />
    <Route path="/itemPage" element={<><Navbar/> <ItemPage/> </>} />
    <Route path="/categoryPage" element={<><Navbar/> <CategoryPage/> </>} />
    <Route path="/reportPage" element={<><Navbar/> <ReportPage/> </>} />
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
