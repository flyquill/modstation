import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
// import RandomAlert from './components/RandomAlert';
import Home from './pages/Home';
import About from './pages/About';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Cart from './pages/Cart';
import GlobalAlert from './components/GlobalAlert';
import Package from './components/Package';
import Categories from './pages/Categories';
import Login from './pages/Login';
import Auth from './pages/Auth';
import UploadPackageForm from './pages/PackageManagement';
import Contact from './pages/Contact';
import mainGIF from './images/main.gif'; // Make sure this import is present
import CustomMods from './pages/CustomMods';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import CarModelRequestsTable from './components/CarModelRequestsTable';
import { HelmetProvider } from 'react-helmet-async';
import ThankYou from './pages/ThankYou';
import PrivateProduct from './components/PrivateProduct';
import FreeCategoryForUser from './components/FreeCategoryForUser';

function App() {
  return (
    <HelmetProvider>
      <Router>
        {/* Main app wrapper */}
        <div className="app-wrapper">
          <Navbar />
          {/* <RandomAlert /> */}
          {/* Decorative curly lines */}
          {/* <div className="curly-line left-curly" />
        <div className="curly-line right-curly" /> */}
          <GlobalAlert />
          <Routes>
            <Route path="/package" element={<Package />} />
            <Route path="/free" element={<PrivateProduct />} />
            <Route path="/free_packages" element={<FreeCategoryForUser />} />
            <Route path="/custom_requests" element={<CarModelRequestsTable />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/category" element={<Categories />} />
            <Route path="/login" element={<Login />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/custom" element={<CustomMods />} />
            <Route path="/packageManagement" element={<UploadPackageForm />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;