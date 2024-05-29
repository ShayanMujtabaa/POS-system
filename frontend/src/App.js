import './App.css';
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";
import AddItem from './components/AddItem';
import Navbar from './components/Navbar';
import DeleteItem from './components/DeleteItem';
import UpdateItem from './components/UpdateItem';
import AdminPage from './components/AdminPage';
import HomePage from './components/HomePage';

function App() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-r from-green-500 via-blue-500 to-blue-900">
    <div>
   <BrowserRouter>
   <Routes>
    
    <Route path="/addItem" element={<>  <Navbar /> <AddItem /> </>} />
    <Route path="/deleteItem" element={ <>  <Navbar /> <DeleteItem /> </>} />
    <Route path="/updateItem" element={ <>  <Navbar /> <UpdateItem /> </>} />
    <Route path="/adminPage" element={<><Navbar/> <AdminPage/> </>} />
    <Route path="/" element={<><Navbar/> <HomePage/> </>} />
    <Route path="/home" element={<><Navbar/> <HomePage/> </>} />

    
   </Routes>
   </BrowserRouter>
   </div>
   </main>
  );
}

export default App;
