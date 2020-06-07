import React from 'react';
import styles from './styles.scss';

const FormHeader = ({ cardHolder }) => {
  return (
    <div className={styles.header}>
      <h2>
        Olá, <span>{cardHolder}</span>
      </h2>
      <p>Complete os dados do seu cartão</p>
    </div>
  );
};

export default FormHeader;
