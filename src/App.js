import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import RandomAlert from './components/RandomAlert';
import Home from './pages/Home';
import About from './pages/About';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Footer from './components/Footer';
import Cart from './pages/Cart';
import GlobalAlert from './components/GlobalAlert';
import Package from './components/Package';
import Categories from './pages/Categories';
import Login from './pages/Login';
import Auth from './pages/Auth';

function App() {

  return (
    <Router>
      <Navbar />
      <RandomAlert />
      <GlobalAlert />
      <Routes>
        <Route exact path="/package" element={<Package />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/category" element={<Categories />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/auth" element={<Auth />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
