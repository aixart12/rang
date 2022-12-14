import styles from './shared-common-reacto-models.module.css';

/* eslint-disable-next-line */
export interface SharedCommonReactoModelsProps {}

export function SharedCommonReactoModels(props: SharedCommonReactoModelsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to SharedCommonReactoModels!</h1>
    </div>
  );
}

export default SharedCommonReactoModels;
