import "./App.css";
import NavBar from "./components/navbar";
import UserHome from "./components/userHome";
import Create from "./components/Create";
import EventDetails from "./components/EventDetails";
import EditTrip from "./components/EditTrip";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Signin from "./Pages/SignIn";
import Account from "./Pages/Account";
import Protected from "./components/Protected";
import TripSignup from "./components/TripSignup";

function App() {
  return (
    <Router forceRefresh={true}>
      <div>
        <AuthContextProvider>
          <NavBar />
          <Routes>
            <Route exact path="/signin" element={<Signin />}></Route>
            <Route
              exact
              path="/"
              element={
                <Protected>
                  <UserHome />
                </Protected>
              }
            ></Route>
            <Route exact path="/events/:id" element={<EventDetails />}></Route>
            <Route exact path="/edit-trip/:id" element={<EditTrip />}></Route>
            <Route exact path="/create" element={<Create />}></Route>
            <Route exact path="/view-trip/:id" element={<TripSignup />}></Route>
            <Route
              exact
              path="/account"
              element={
                <Protected>
                  <Account />
                </Protected>
              }
            ></Route>
          </Routes>
        </AuthContextProvider>
      </div>
    </Router>
  );
}

export default App;
