import React, { useState, useRef, useCallback } from 'react';
import Form from './components/Form';
import Card from './components/Card';

import './assets/styles/global.scss';

const initialState = {
  cardNumber: '4984222289016789',
  cardHolder: 'Lauro Kirsch',
  cardMonth: '07',
  cardYear: '23',
  cardCvv: '123',
  isCardFlipped: false,
};

const App = () => {
  const [state, setState] = useState(initialState);
  const [currentFocusedElm, setCurrentFocusedElm] = useState(null);

  const updateState = useCallback(
    (name, value) => {
      setState({
        ...state,
        [name]: value,
      });
    },
    [state]
  );

  const formFieldsRefs = {
    cardNumber: useRef(),
    cardHolder: useRef(),
    cardDate: useRef(),
    cardCvv: useRef(),
  };

  let focusFormFieldByKey = useCallback((key) => {
    formFieldsRefs[key].current.focus();
  });

  let cardElementsRef = {
    cardNumber: useRef(),
    cardHolder: useRef(),
    cardDate: useRef(),
  };

  const handleInputFocus = (event) => {
    let focusedInputName = event.target.name;
    if (focusedInputName === 'cardMonth' || focusedInputName === 'cardYear') {
      focusedInputName = 'cardDate';
    }
    setCurrentFocusedElm(cardElementsRef[focusedInputName]);
  };

  const handleInputBlur = () => setCurrentFocusedElm(null);

  return (
    <div className='wrapper'>
      <Form
        state={state}
        updateState={updateState}
        formFieldsRefs={formFieldsRefs}
        handleInputFocus={handleInputFocus}
        handleInputBlur={handleInputBlur}
      >
        <Card
          state={state}
          isCardFlipped={state.isCardFlipped}
          currentFocusedElm={currentFocusedElm}
          onCardElementClick={focusFormFieldByKey}
          cardElementsRef={cardElementsRef}
        />
      </Form>
    </div>
  );
};

export default App;
