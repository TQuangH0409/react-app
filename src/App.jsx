import './App.css';
import Navbar from "./components/header/Navbar";
import Menu from './components/menu/Menu';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className='menu'>
        <Menu />
      </div>
      <div className='container'>
        <div className='headerContainer'>
          <Navbar />
        </div>
        <div className='contentContainer'>
          //...
        </div>
      </div>
    </div>
  );
}

export default App;
