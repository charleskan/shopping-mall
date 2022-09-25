import styles from '../styles/Home.module.css'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

interface PaginationHasPrevProps {
  value: number;
  onSet(): void;
  onDecrement(): void;
}

export const PaginationHasPrev: React.FC<PaginationHasPrevProps> = ({
  value,
  onSet,
  onDecrement,
}) => {
  const more = `${styles["pagination-button"]} ${styles.more}`;
  return (
    <>
      <div className={styles["pagination-button"]} onClick={onDecrement}>
        <ArrowCircleLeftIcon />
      </div>
      {value >= 2 && (
        <div className={more}>
         ...
        </div>
      )}
      <div className={styles["pagination-button"]} onClick={onSet}>
        <span>{value}</span>
      </div>
    </>
  );
};