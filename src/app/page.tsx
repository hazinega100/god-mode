import { TelegramLogin } from "@/components/features/TelegramLogin";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>Hello man</h1>
      <TelegramLogin />
    </div>
  );
}
