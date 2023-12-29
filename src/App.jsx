import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRoutes from "./routes/index";
import DefaultLayout from "./Layout/defaultLayout/Layout";
import FormLogin from "./page/Login/FormLogin";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {PublicRoutes.map((route, index) => {
            const Page = route.component;
            const Layout = route.layout || DefaultLayout;
            if (route.path === "/login") {
              return (
                <Route key="login" path="/login" element={<Page />}></Route>
              );
            } else {
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
            }
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
