"use client";

import styles from "./styles.module.css";

import { Game } from "@/types/game.type";
import { isUrl } from "@/utils/isurl";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Tag from "../components/Tag/Tag";
import DealCard from "../components/DealCard/DealCard";
import Button from "../components/Button/Button";
import Timer from "../components/Timer/Timer";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import DealContent from "./DealContent";

export default function Page() {
  return (
    <>
      <Navbar />
      <div className={styles.dealPage}>
        <a className={styles.back} href="/">
          <Button>Back to home page</Button>
        </a>
        <Suspense fallback={<p>Loading...</p>}>
          <DealContent />
        </Suspense>
      </div>
      <Footer />
    </>
  );
}
