import './App.css';
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";
import AddItem from './components/AddItem';
import Navbar from './components/Navbar';
import DeleteItem from './components/DeleteItem';

function App() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
    <div>
   <BrowserRouter>
   <Routes>
    
    <Route path="/addItem" element={<>  <Navbar /> <AddItem /> </>} />
    <Route path="/deleteItem" element={ <>  <Navbar /> <DeleteItem /> </>} />
    
   </Routes>
   </BrowserRouter>
   </div>
   </main>
  );
}

export default App;
