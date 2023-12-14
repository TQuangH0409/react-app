import './App.css';
import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
import PublicRoutes from './routes/index';
import DefaultLayout from './Layout/defaultLayout/Layout'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {PublicRoutes.map((route, index) => {
            const Page = route.component;
            const Layout = route.layout || DefaultLayout;
            return <Route key={index} path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>} />
          })}
        </Routes>
      </div>
    </Router>
  );
}


export default App;