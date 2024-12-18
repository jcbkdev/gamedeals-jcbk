import "./App.css";
import Navbar from "./components/navbar/navbar";
import Hero from "./sections/hero/hero";
import Deals from "./sections/deals/deals";
import Footer from "./components/footer/footer";
import Feedback from "./components/feedback/feedback";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Deals />
      <Footer />
      <Feedback />
    </>
  );
}

export default App;
