import "./App.css";
import "antd/dist/antd.css";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookingCar from "./pages/BookingCar";
import UserBooking from "./pages/UserBooking";
import AddCar from "./pages/AddCar";
import EditCar from "./pages/EditCar";
import AdminHome from "./pages/AdminHome";
import About from "./pages/About";
import Service from "./pages/Service";
import Contact from "./components/Contact";
import BookService from "./pages/BookService";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              
                <Home />
              
            }
          ></Route>
          <Route
            path="/contact"
            exact
            element={
              
                <Contact />
              
            }
          ></Route>
          <Route path="/login" exact element={<Login />}></Route>
          <Route path="/register" exact element={<Register />}>
            {" "}
          </Route>
          <Route
            path="/booking"
            exact
            element={
              
                <Home />
              
            }
          ></Route>

          <Route
            path="/booking/:id"
            exact
            element={
              
                <BookingCar />
              
            }
          ></Route>
          <Route
            path="/userbookings"
            exact
            element={
              
                <UserBooking />
              
            }
          ></Route>
          <Route
            path="/userbookings/:id"
            exact
            element={
              
                <UserBooking />
              
            }
          ></Route>
          <Route
            path="/addcar"
            exact
            element={
              
                <AddCar />
              
            }
          ></Route>
          <Route
            path="/editcar/:carid"
            exact
            element={
              
                <EditCar />
              
            }
          ></Route>
          <Route
            path="/admin"
            exact
            element={
              
                <AdminHome />
              
            }
          ></Route>
          <Route
            path="/about"
            exact
            element={
              
                <About />
              
            }
          ></Route>
          <Route
            path="/services"
            exact
            element={
              
                <Service />
              
            }
          ></Route>
          <Route
            path="/bookservice"
            exact
            element={
              
                <BookService />
              
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute({ children }) {
  const auth = localStorage.getItem("user");
  return auth ? children : <Navigate to="/login"></Navigate>;
}
