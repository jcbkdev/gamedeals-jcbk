import Navbar from "./components/Navbar/Navbar";
import Hero from "./sections/Hero/Hero";
import Deals from "./sections/Deals/Deals";
import Footer from "./components/Footer/Footer";
import Disclaimer from "./components/Disclaimer/Disclaimer";

export default function Home() {
  return (
    <>
      <Disclaimer />
      <Navbar />
      <main>
        <Hero />
        <Deals />
      </main>
      <Footer />
    </>
  );
}
