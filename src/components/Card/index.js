import React, { useState, useEffect, useMemo } from 'react';
import {
  CSSTransition,
  TransitionGroup,
  SwitchTransition,
} from 'react-transition-group';
import './styles.scss';

import {
  randomCreditCardBackgroundImage,
  creditCardsRegexMap,
} from '../../utils';
import { creditCardFlagTypes, creditCardBackground, chip } from '../../assets/';

const BACKGROUND_IMG = randomCreditCardBackgroundImage();

const Card = ({
  cardHolder,
  cardNumber,
  cardMonth,
  cardYear,
  cardCvv,
  isCardFlipped,
  currentFocusedElm,
  onCardElementClick,
  cardNumberRef,
  cardHolderRef,
  cardDateRef,
  cardNumberState,
  cardNameState,
}) => {
  const [style, setStyle] = useState(null);

  const getCreditCardFlagByRegex = (creditCardNumber) => {
    for (const [creditCardFlag, flagRegex] of Object.entries(
      creditCardsRegexMap
    )) {
      if (flagRegex.test(creditCardNumber)) {
        return creditCardFlag;
      }
    }
    // default
    return 'mastercard';
  };

  const creditCardFlag = useMemo(() => {
    return getCreditCardFlagByRegex(cardNumber);
  }, [cardNumber]);

  const outlineElementStyle = (element) => {
    return element
      ? {
          width: `${element.offsetWidth}px`,
          height: `${element.offsetHeight}px`,
          transform: `translateX(${element.offsetLeft}px) translateY(${element.offsetTop}px)`,
        }
      : null;
  };

  useEffect(() => {
    if (currentFocusedElm) {
      const style = outlineElementStyle(currentFocusedElm.current);
      setStyle(style);
    }
  }, [currentFocusedElm]);

  const maskCardNumber = (cardNumber) => {
    let cardNumberArr = cardNumber.split('');
    let mutableCardNumberArr = cardNumberArr;
    cardNumberArr.forEach((val, index) => {
      if (index === 4 || index === 8 || index === 12) {
        mutableCardNumberArr = [
          ...cardNumberArr.slice(0, index),
          '_',
          ...cardNumberArr.slice(index + 1),
        ];
        // mutableCardNumberArr.push('X');
      }
    });
    return mutableCardNumberArr;
  };

  return (
    <div className='credit-card-wrapper'>
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
              // ref={cardNumberRef}
              onClick={() => onCardElementClick('cardNumber')}
              value={cardNumberState}
            >
              <TransitionGroup className='slide-fade-up' component='div'>
                {cardNumber ? (
                  maskCardNumber(cardNumber).map((val, index) => (
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
                // ref={cardHolderRef}
                value={cardNameState}
              >
                {/* <div className='card-item__holder'>Card Holder</div> */}
                <div className='card-item__name'>
                  <TransitionGroup component='div' className='slide-fade-up'>
                    {cardHolder === 'FULL NAME' ? (
                      <CSSTransition classNames='slide-fade-up' timeout={250}>
                        <div>FULL NAME</div>
                      </CSSTransition>
                    ) : (
                      cardHolder.split('').map((val, index) => (
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
                ref={cardDateRef}
              >
                {/* <label className='card-item__dateTitle'>
                                Expires
                            </label> */}
                <label className='card-item__dateItem'>
                  <SwitchTransition in-out>
                    <CSSTransition
                      classNames='slide-fade-up'
                      timeout={200}
                      key={cardMonth}
                    >
                      <span>{!cardMonth ? 'MM' : cardMonth} </span>
                    </CSSTransition>
                  </SwitchTransition>
                </label>
                /
                <label htmlFor='cardYear' className='card-item__dateItem'>
                  <SwitchTransition out-in>
                    <CSSTransition
                      classNames='slide-fade-up'
                      timeout={250}
                      key={cardYear}
                    >
                      <span>
                        {!cardYear ? 'YY' : cardYear.toString().substr(-2)}
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
                {cardCvv.split('').map((val, index) => (
                  <CSSTransition
                    classNames='zoom-in-out'
                    key={index}
                    timeout={250}
                  >
                    <span>*</span>
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
