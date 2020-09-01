import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './input-and-button.sass';

import { BUTTON_OK, INPUT_DEFAULT, INPUT_INVALID } from '../../constants/strings.js';

// import {  } from '../../utils/helper.js';

function InputAndButton(props) {

  const { parentFunction, inputPlaceholder, buttonValue, inputValue } = props;
  const [input, setInput] = useState(inputValue);
  const onInputChange = event => { setInput(event.target.value); }

  const onButtonClick = event => {
    if (input.length !== 0) {
      const data = input;
      setInput("");
      parentFunction(data);
    } else { console.log(INPUT_INVALID); }
  }

  return (
    <>
      <input onChange={onInputChange} className="input"
             type="text" name="input" placeholder={inputPlaceholder} value={input} />
      <input className="button" type="button" value={buttonValue} onClick={onButtonClick} />
    </>
  );
}

InputAndButton.propTypes = {
  parentFunction: PropTypes.func,
  inputPlaceholder: PropTypes.string,
  buttonValue: PropTypes.string,
  inputValue: PropTypes.string
};

InputAndButton.defaultProps = {
  parentFunction: () => { console.log("Invalid props.parentFunction"); },
  inputPlaceholder: INPUT_DEFAULT,
  buttonValue: BUTTON_OK,
  inputValue: ""
};

export default InputAndButton;
