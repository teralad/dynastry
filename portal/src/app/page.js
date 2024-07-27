import Image from "next/image";
import styles from "./page.module.css";
import {ForceGraph} from "./canvas";

export default function Home() {
  return (
    <main className={styles.main}>
      <ForceGraph/>
    </main>
  );
}
