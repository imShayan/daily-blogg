import Login from "./components/account/login";
import Home from "./components/home/home";
import Header from './components/header/header'
import DataProvider from "./components/context/DataProvider";
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import CreatePost from "./components/create/createPost";
import DetailView from "./components/details/DetailView";
import Update from "./components/create/updatePost";
import About from "./components/about/about";
import Contact from "./components/contacts/contact";

const PrivateRoute = ({ isAuthenticated , ...props}) => {
   return isAuthenticated ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};
function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);
  return (
    <DataProvider>
      <BrowserRouter>
        <div style={{marginTop: 100}}>
          <Routes>
            <Route
              path="/login"
              element={<Login isUserAuthenticated={isUserAuthenticated} />}
            />
            <Route
              path="/about"
              element={<About isUserAuthenticated={isUserAuthenticated} />}
            />
       
            <Route
              path="/"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/" element={<Home />} />
            </Route>
            <Route
              path="/create"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/create" element={<CreatePost />} />
            </Route>
            <Route
              path="/post/:id"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/post/:id" element={<DetailView />} />
            </Route>
            <Route
              path="/update/:id"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/update/:id" element={<Update />} />
            </Route>
            <Route 
            path="/contact"
            element={<PrivateRoute isAuthenticated= {isAuthenticated}/>}
            >
            <Route path="/contact" element={<Contact/>}
            />
            </Route>

            <Route 
            path="/about"
            element={<PrivateRoute isAuthenticated= {isAuthenticated}/>}
            >
              <Route path="/about" element={<About/>}/>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
