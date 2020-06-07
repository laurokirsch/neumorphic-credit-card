import React, { useState, useEffect, useMemo } from 'react';
import {
  randomCreditCardBackgroundImage,
  getCreditCardFlagByRegex,
  outlineElementStyle,
  maskCardNumber,
} from './utils';

// Styling and assets
import {
  CSSTransition,
  TransitionGroup,
  SwitchTransition,
} from 'react-transition-group';
import './styles.scss';
import { creditCardFlagTypes, creditCardBackground, chip } from '../../assets/';

const BACKGROUND_IMG = randomCreditCardBackgroundImage();

const Card = ({
  state,
  isCardFlipped,
  currentFocusedElm,
  onCardElementClick,
  cardElementsRef,
}) => {
  const [style, setStyle] = useState(null);

  useEffect(() => {
    if (currentFocusedElm) {
      const style = outlineElementStyle(currentFocusedElm.current);
      setStyle(style);
    }
  }, [currentFocusedElm]);

  const creditCardFlag = useMemo(() => {
    return getCreditCardFlagByRegex(state.cardNumber);
  }, [state]);

  return (
    <div className='card-item-wrapper'>
      <div className={'card-item ' + (isCardFlipped ? '-active' : '')}>
        <div className='card-item__side -front'>
          <div
            className={`card-item__focus ${currentFocusedElm ? `-active` : ``}`}
            style={style}
          />
          <div className='card-item__cover'>
            <img
              alt=''
              src={creditCardBackground[BACKGROUND_IMG]}
              className='card-item__bg'
            />
          </div>

          <div className='card-item__wrapper'>
            <div className='card-item__top'>
              <img src={chip} alt='' className='card-item__chip' />
              <div className='card-item__type'>
                <img
                  alt={creditCardFlag}
                  src={creditCardFlagTypes[creditCardFlag]}
                  className='card-item__typeImg'
                />
              </div>
            </div>

            <label
              className='card-item__number'
              ref={cardElementsRef.cardNumber}
              onClick={() => onCardElementClick('cardNumber')}
              value={state.cardNumber}
            >
              <TransitionGroup className='slide-fade-up' component='div'>
                {state.cardNumber ? (
                  maskCardNumber(state.cardNumber).map((val, index) => (
                    <CSSTransition
                      classNames='slide-fade-up'
                      timeout={250}
                      key={index}
                    >
                      <div className='card-item__numberItem'>{val}</div>
                    </CSSTransition>
                  ))
                ) : (
                  <CSSTransition classNames='slide-fade-up' timeout={250}>
                    <div className='card-item__numberItem'></div>
                  </CSSTransition>
                )}
              </TransitionGroup>
            </label>
            <div className='card-item__content'>
              <label
                className='card-item__info'
                onClick={() => onCardElementClick('cardHolder')}
                ref={cardElementsRef.cardHolder}
                value={state.cardHolder}
              >
                <div className='card-item__name'>
                  <TransitionGroup component='div' className='slide-fade-up'>
                    {state.cardHolder === 'FULL NAME' ? (
                      <CSSTransition classNames='slide-fade-up' timeout={250}>
                        <div>FULL NAME</div>
                      </CSSTransition>
                    ) : (
                      state.cardHolder.split('').map((val, index) => (
                        <CSSTransition
                          timeout={250}
                          classNames='slide-fade-right'
                          key={index}
                        >
                          <span className='card-item__nameItem'>{val}</span>
                        </CSSTransition>
                      ))
                    )}
                  </TransitionGroup>
                </div>
              </label>
              <div
                className='card-item__date'
                onClick={() => onCardElementClick('cardDate')}
                ref={cardElementsRef.cardDate}
              >
                <label className='card-item__dateItem'>
                  <SwitchTransition in-out>
                    <CSSTransition
                      classNames='slide-fade-up'
                      timeout={200}
                      key={state.cardMonth}
                    >
                      <span>{!state.cardMonth ? 'MM' : state.cardMonth} </span>
                    </CSSTransition>
                  </SwitchTransition>
                </label>
                /
                <label htmlFor='cardYear' className='card-item__dateItem'>
                  <SwitchTransition out-in>
                    <CSSTransition
                      classNames='slide-fade-up'
                      timeout={250}
                      key={state.cardYear}
                    >
                      <span>
                        {!state.cardYear
                          ? 'YY'
                          : state.cardYear.toString().substr(-2)}
                      </span>
                    </CSSTransition>
                  </SwitchTransition>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className='card-item__side -back'>
          <div className='card-item__cover'>
            <img
              src={creditCardBackground[BACKGROUND_IMG]}
              className='card-item__bg'
            />
          </div>
          <div className='card-item__band' />
          <div className='card-item__cvv'>
            <div className='card-item__cvvTitle'>CVV</div>
            <div className='card-item__cvvBand'>
              <TransitionGroup>
                {state.cardCvv.split('').map((val, index) => (
                  <CSSTransition
                    classNames='zoom-in-out'
                    key={index}
                    timeout={250}
                  >
                    <span>{val}</span>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </div>
            <div className='card-item__type'>
              <img
                alt='card-type'
                src={creditCardFlagTypes[creditCardFlag]}
                className='card-item__typeImg'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
