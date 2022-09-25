import styles from '../styles/Home.module.css'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

interface PaginationHasNextProps {
  value: number;
  onSet(): void;
  onIncrement(): void;
}

export const PaginationHasNext: React.FC<PaginationHasNextProps> = ({
  value,
  onSet,
  onIncrement,
}) => {
  const more = `${styles["pagination-button"]} ${styles.more}`;
  return (
    <>
      <div className={styles["pagination-button"]} onClick={onSet}>
        <span>{value}</span>
      </div>
      <div className={more}>
      .....
      </div>
      <div className={styles["pagination-button"]} onClick={onIncrement}>
        <ArrowCircleRightIcon  />
      </div>
    </>
  );
};