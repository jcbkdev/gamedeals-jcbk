import styles from "./page.module.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./sections/Hero/Hero";
import Deals from "./sections/Deals/Deals";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Deals />
    </div>
  );
}
