import React from 'react';
import FormHeader from '../FormHeader';
import './styles.scss';

import { validateInput } from './utils';

const Form = ({
  cardDate,
  updateState,
  handleInputFocus,
  handleInputBlur,
  children,
  state,
  formFieldsRefs,
}) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let inputVal = value;
    if (!validateInput(name, value)) {
      // removes last character
      inputVal = inputVal.substr(0, inputVal.length - 2);
    }
    updateState(name, inputVal);
  };

  const handleCvvFocus = () => {
    updateState('isCardFlipped', true);
  };

  const handleCvvBlur = () => {
    updateState('isCardFlipped', false);
  };

  return (
    <div className='card-form'>
      <div className='card-form__inner'>
        <FormHeader cardHolder={state.cardHolder} />
        {children}
        <div className='card-input'>
          <label htmlFor='cardNumber' className='card-input__label'>
            Número do cartão
          </label>
          <input
            className='card-input__input'
            autoComplete='off'
            maxLength='19'
            name='cardNumber'
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            ref={formFieldsRefs.cardNumber}
            value={state.cardNumber}
          />
        </div>

        <div className='card-input'>
          <label htmlFor='cardName' className='card-input__label'>
            Nome no cartão
          </label>
          <input
            className='card-input__input'
            autoComplete='off'
            name='cardHolder'
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            ref={formFieldsRefs.cardHolder}
            value={state.cardHolder}
          />
        </div>

        <div className='card-form__row'>
          <div className='card-form__col'>
            <div className='card-input'>
              <label htmlFor='cardMonth' className='card-input__label'>
                Mês
              </label>
              <input
                className='card-input__input'
                maxLength='2'
                autoComplete='off'
                name='cardMonth'
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
                placeholder='Ex: 07'
                ref={formFieldsRefs.cardDate}
                value={state.cardMonth}
              />
            </div>
          </div>
          <div className='card-form__col'>
            <div className='card-input'>
              <label htmlFor='cardYear' className='card-input__label'>
                Ano
              </label>
              <input
                className='card-input__input'
                maxLength='2'
                autoComplete='off'
                name='cardYear'
                placeholder='Ex: 21'
                ref={cardDate}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                ref={formFieldsRefs.cardDate}
                value={state.cardYear}
              />
            </div>
          </div>

          <div className='card-form__col -cvv'>
            <div className='card-input'>
              <label htmlFor='cardCvv' className='card-input__label'>
                CVV
              </label>
              <input
                className='card-input__input'
                maxLength='3'
                autoComplete='off'
                name='cardCvv'
                onChange={handleInputChange}
                onFocus={handleCvvFocus}
                onBlur={handleCvvBlur}
                ref={formFieldsRefs.cardCvv}
                value={state.cardCvv}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
