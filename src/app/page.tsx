import styles from "./page.module.css";
import Hero from "./sections/Hero/Hero";
import Deals from "./sections/Deals/Deals";

export default function Home() {
  return (
    <div>
      <Hero />
      <Deals />
    </div>
  );
}
