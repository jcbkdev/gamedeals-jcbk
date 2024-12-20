import "./App.css";
import Navbar from "./components/navbar/navbar";
import Hero from "./sections/hero/hero";
import Deals from "./sections/deals/deals";
import Footer from "./components/footer/footer";
import Bubbles from "./components/bubbles/bubbles";
import Bubble from "./components/bubble/bubble";
import MessageIcon from "/message_icon.svg";
import CoffeeIcon from "/coffee_icon.svg";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Deals />
      <Footer />
      <Bubbles>
        <Bubble image={CoffeeIcon} url="https://ko-fi.com/jcbk" />
        <Bubble
          image={MessageIcon}
          url="mailto:jcbkdev@gmail.com?subject=GameDeals%20Feedback"
        />
      </Bubbles>
    </>
  );
}

export default App;
