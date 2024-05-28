import "./App.css";
import ContactUs from "./components/contactUs";
import Homepage from "./components/homepage";
import Login from "./components/login";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterFactory from "./components/registerFactory";
import Footer from "./components/footer";
import FactoryEmissionDashboard from "./components/FactoryEmissionDashboard";
import RegulatorsDashboard from "./components/government";
import Analysis from "./components/analysis";
import Table from "./components/table";
import ChartComponent from "./components/chartComponet";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/registerFactory" element={<RegisterFactory />} />
          <Route path="/factoryDashboard" element={<FactoryEmissionDashboard />} />
          <Route path="/govt" element={<RegulatorsDashboard />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/table" element={<Table />} />
          <Route path="/chart" element={<ChartComponent />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
