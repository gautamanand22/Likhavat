import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import AboutUsSection from "./components/AboutUsSection";
import CatalogSection from "./components/Service/CatalogDetail";
import StatsSection from "./components/StatsSection";

import NotFound from "./components/NotFound";
import ProcessSection from "./components/ProcessSection";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import VisitingCardCTA from "./components/VisitingCardCTA";
import AboutUsPage from "./pages/About";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Portfolio";
import CareersPage from "./pages/Careers";
import VisitingCardPage from "./pages/VisitingCard";

function HomePage() {
  return (
    <>
      <Header />
      <HeroBanner />
      <AboutUsSection />
      <CatalogSection />
      <StatsSection />
      <ProcessSection />
      <VisitingCardCTA />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/about-us" element={<Layout><AboutUsPage /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/portfolio" element={<Layout><Portfolio /></Layout>} />
        <Route path='/careers' element={<Layout><CareersPage /></Layout>} />
        <Route path='/visiting-card-designer' element={<Layout><VisitingCardPage /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
