import styles from './page.module.css';

export default function Loading() {
  return (
    <div className={styles.card}>
      <div className={`${styles.cardImg} ${styles.skeleton}`}></div>
      <div className={styles.cardBody}>
        <h2 className={`${styles.cardTitle} ${styles.skeleton}`}></h2>
        <p className={`${styles.cardIntro} ${styles.skeleton}`}></p>
      </div>
    </div>
  );
}
