import React, { useState, useRef, useCallback } from 'react';
import Form from './components/Form';
import Card from './components/Card';

import './App.scss';

const initialState = {
  cardNumber: '',
  cardHolder: '',
  cardMonth: '',
  cardYear: '',
  cardCvv: '',
  isCardFlipped: false,
};

const App = () => {
  const [state, setState] = useState(initialState);
  const [currentFocusedElm, setCurrentFocusedElm] = useState(null);

  const updateStateValues = useCallback(
    (keyName, value) => {
      setState({
        ...state,
        [keyName]: value || initialState[keyName],
      });
    },
    [state]
  );

  // References for the Form Inputs used to focus corresponding inputs.
  let formFieldsRefObj = {
    cardNumber: useRef(),
    cardHolder: useRef(),
    cardDate: useRef(),
    cardCvv: useRef(),
  };

  let focusFormFieldByKey = useCallback((key) => {
    formFieldsRefObj[key].current.focus();
  });

  // These are the references for the Card DIV elements.
  let cardElementsRef = {
    cardNumber: useRef(),
    cardHolder: useRef(),
    cardDate: useRef(),
  };

  let onCardFormInputFocus = (_event, inputName) => {
    const refByName = cardElementsRef[inputName];
    setCurrentFocusedElm(refByName);
  };

  let onCardInputBlur = useCallback(() => {
    setCurrentFocusedElm(null);
  }, []);

  return (
    <div className='wrapper'>
      <Card
        cardNumber={state.cardNumber}
        cardHolder={state.cardHolder}
        cardMonth={state.cardMonth}
        cardYear={state.cardYear}
        cardCvv={state.cardCvv}
        isCardFlipped={state.isCardFlipped}
        currentFocusedElm={currentFocusedElm}
        onCardElementClick={focusFormFieldByKey}
        cardNumberRef={cardElementsRef.cardNumber}
        cardHolderRef={cardElementsRef.cardHolder}
        cardDateRef={cardElementsRef.cardDate}
        cardNumberState={state.cardNumber}
        cardHolderState={state.cardHolder}
      />
      <Form
        state={state}
        onUpdateState={updateStateValues}
        cardNumberRef={formFieldsRefObj.cardNumber}
        cardHolderRef={formFieldsRefObj.cardHolder}
        cardDateRef={formFieldsRefObj.cardDate}
        onCardInputFocus={onCardFormInputFocus}
        onCardInputBlur={onCardInputBlur}
        cardNumberState={state.cardNumber}
        cardNameState={state.cardNameState}
      />
    </div>
  );
};

export default App;