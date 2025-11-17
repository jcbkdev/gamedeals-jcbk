import styles from "./page.module.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./sections/Hero/Hero";
import Deals from "./sections/Deals/Deals";
import Footer from "./components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Deals />
      </main>
      <Footer />
    </>
  );
}
