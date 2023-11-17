import './App.css';
import Navbar from "./components/header/Navbar";
import Sidebar from './components/sidebar/sidebar';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className='sidebar'>
        <Sidebar />
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
