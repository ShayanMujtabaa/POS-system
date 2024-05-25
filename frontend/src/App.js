import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";
import AddItem from './components/AddItem';


function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/AddItem" element={<AddItem/>} />
   </Routes>
   </BrowserRouter>
  );
}

export default App;
