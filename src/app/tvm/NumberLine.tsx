import styles from "./numberline.module.css";

type NumberLineProps = {
  n: number;
  pv?: number;
};

export function NumberLine({ n, pv }: NumberLineProps) {
  // Generate an array of numbers from 1 to n
  const numbers = Array.from({ length: n + 1 }, (_, i) => i);

  return (
    <div className={styles.numberLineContainer}>
      <div className={styles.numberLine} />
      {numbers.map((number) => (
        <div
          key={number}
          className={styles.tickAtTimeN}
          style={{
            left: `${(number / n) * 100}%`,
          }}
        >
          <div className={styles.numberTick} />
          <div>{number}</div>
          {number === 0 && pv && (
            <div className={pv > 0 ? styles.pvPositive : styles.pvNegative}>
              {pv}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
