import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";
import AddItem from './components/AddItem';
import Navbar from './components/Navbar';

const AddNavbar = () => {
  return (
    <div>
      <Navbar />
      <AddItem />
    </div>
  );
};


function App() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
    <div>
   <BrowserRouter>
   <Routes>
    
    <Route path="/addItem" element={<AddNavbar />} />
    
   </Routes>
   </BrowserRouter>
   </div>
   </main>
  );
}

export default App;
