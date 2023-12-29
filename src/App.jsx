import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./Layout/defaultLayout/Layout";
import { PublicRoutes, Login } from "./routes/index.js";
import { Switch } from "antd";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path={Login.path}
            element={<Login.component></Login.component>}
          ></Route>
          {PublicRoutes.map((route, index) => {
            const Page = route.component;
            const Layout = route.layout || DefaultLayout;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
