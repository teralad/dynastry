import Image from "next/image";
import styles from "./page.module.css";
import Graph from "./canvas";

export default function Home() {
  return (
    <main className={styles.main}>
      <Graph/>
    </main>
  );
}
