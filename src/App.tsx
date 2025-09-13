import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import AboutUsSection from "./components/AboutUsSection";
import CatalogSection from "./components/Service/CatalogDetail";
import StatsSection from "./components/StatsSection";

// (Optional) Future route components like Services, ContactUs, etc.
import NotFound from "./components/NotFound"; // If you want a 404 page
import ProcessSection from "./components/ProcessSection";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import AboutUsPage from "./pages/About";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Portfolio";
import CareersPage from "./pages/Careers";

function HomePage() {
  return (
    <>
      <Header />
      <HeroBanner />
      <AboutUsSection />
      <CatalogSection />
  <StatsSection />
  <ProcessSection />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* You can add more routes like below */}
        {/* <Route path="/services" element={<ServicesPage />} /> */}
        <Route path="*" element={<NotFound />} />
  <Route path="/about-us" element={<Layout><AboutUsPage /></Layout>} />
  <Route path="/contact" element={<Layout><Contact /></Layout>} />
  <Route path="/portfolio" element={<Layout><Portfolio /></Layout>} />
  <Route path='/careers' element={<Layout><CareersPage /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
