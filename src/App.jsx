import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import DestinationDetails from "./pages/DestinationDetails";
import MyTrip from "./pages/MyTrip";
import TripProvider from "./context/TripContext";

function App() {
  return (
    <Router>
      <TripProvider>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/destination/:id" element={<DestinationDetails />} />
              <Route path="/my-trip" element={<MyTrip />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="bottom-right" />
        </div>
      </TripProvider>
    </Router>
  );
}

export default App;