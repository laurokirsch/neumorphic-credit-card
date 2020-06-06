import React, { useState } from 'react';
import { validateInput } from '../../utils';

const Form = ({
  cardMonth,
  cardYear,
  onUpdateState,
  onCardInputFocus,
  onCardInputBlur,
  cardCvv,
  children,
  state,
}) => {
  const [cardNumber, setCardNumber] = useState('');

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    if (!validateInput(name, value)) return;

    onUpdateState(name, value);
  };

  const onCardNumberChange = (event) => {
    let { value: cardNumber, name } = event.target;
    const regexNumbers = /^[0-9]{0,16}$/;
    if (!regexNumbers.test(cardNumber)) return;
    setCardNumber(cardNumber);
    onUpdateState(name, cardNumber);
  };

  const onCvvFocus = (event) => {
    onUpdateState('isCardFlipped', true);
  };

  const onCvvBlur = (event) => {
    onUpdateState('isCardFlipped', false);
  };

  return (
    <div className='card-form'>
      <div className='card-form__inner'>
        <div className='card-input'>
          <label htmlFor='cardNumber' className='card-input__label'>
            Número do cartão
          </label>
          <input
            name='cardNumber'
            className='card-input__input'
            autoComplete='off'
            onChange={onCardNumberChange}
            maxLength='19'
            onFocus={(e) => onCardInputFocus(e, 'cardNumber')}
            onBlur={onCardInputBlur}
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
            onChange={handleFormChange}
            value={state.cardHolder}
            onFocus={(e) => onCardInputFocus(e, 'cardHolder')}
            onBlur={onCardInputBlur}
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
                onChange={handleFormChange}
                onFocus={(e) => onCardInputFocus(e, 'cardDate')}
                onBlur={onCardInputBlur}
                ref={cardCvv}
                required
                placeholder='Ex: 07'
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
                onChange={handleFormChange}
                onFocus={(e) => onCardInputFocus(e, 'cardDate')}
                onBlur={onCardInputBlur}
                ref={cardCvv}
                placeholder='Ex: 21'
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
                maxLength='4'
                autoComplete='off'
                name='cardCvv'
                onChange={handleFormChange}
                onFocus={onCvvFocus}
                onBlur={onCvvBlur}
                ref={cardCvv}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
