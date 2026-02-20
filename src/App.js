import './App.css';
import HomePage from './Pages/HomePage/HomePage';
import AccessibilityWidget from './components/Accessibilit/Accessibilit';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WhatsAppFloat from './components/Whatsapp/Whatsapp';
import ProductPage from './Pages/PoductPage/ProductPage';
import CartPage from './Pages/cartPage/cartPage';
import Clarity from './Clarity';
import SearchPage from './Pages/searchPage/searchPage';
import WelcomePopup from './components/WelcomePopup/WelcomePopup';
import AboutUsPage from './Pages/AboutUsPage/AboutUsPage';

function App() {
  return (
    <div className="App">
      <AccessibilityWidget />
      <WhatsAppFloat />
      <BrowserRouter basename="/">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/product/:name" element={<ProductPage />} />
          <Route exact path="/cart" element={<CartPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path='/about' element={<AboutUsPage/>}/>
        </Routes>
      </BrowserRouter>
      <WelcomePopup></WelcomePopup>
      <Clarity />
    </div>
  );
}

export default App;
