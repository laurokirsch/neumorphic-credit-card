import React from 'react';
import './styles.scss';

const FormHeader = ({ cardHolder }) => {
  return (
    <div className='header'>
      <h2>
        Olá, <span>{cardHolder ? cardHolder : 'Visitante'}</span>
      </h2>
      <p>Preencha os dados do seu cartão</p>
    </div>
  );
};

export default FormHeader;
