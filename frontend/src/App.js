import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";
import AddItem from './components/AddItem';


function App() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
    <div className = "container mt-24 mx-auto px-12 py-4">
   <BrowserRouter>
   <Routes>
    
    <Route path="/AddItem" element={<AddItem/>} />
    
   </Routes>
   </BrowserRouter>
   </div>
   </main>
  );
}

export default App;
