import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import Button from '../Button/Button';
import OnlinePlayersForGameMasterToChoose from '../OnlinePlayersForGameMasterToChoose/OnlinePlayersForGameMasterToChoose';

import './game-master-starts-the-game.sass';

import { BUTTON_CANCEL, INPUT_AMOUNT_OF_PLAYERS } from '../../constants/strings.js';

// import {  } from '../../utils/helper.js';

function ControlPanelForGameStarting(props) {
  const { onOkButtonClick, onCancelButtonClick, players } = props;
  return (
    <section className="main-content-container">
      <Button parentFunction={onOkButtonClick} decoration={"green-border"} />
      <Button parentFunction={onCancelButtonClick} buttonValue={BUTTON_CANCEL} decoration={'red-border margin-left-ten'} />
    </section>
  );
}

function GameMasterStartsTheGame(props) {
  const { parseAndApplySelectedPlayers, setIsGameMasterStartsTheGame, players } = props;

  // regular expression for the numbers
  const [amountOfPlayers, setAmountOfPlayers] = useState("");
  const onAmountOfPlayersChange = event => { setAmountOfPlayers(event.target.value); }

  const onCancelButtonClick = event => { setIsGameMasterStartsTheGame(false); }

  const onOkButtonClick = event => {
    // console.log(`amountOfPlayers = ${amountOfPlayers}`);
    // parseAndApplySelectedPlayers();
  }

  return (
    <section className="game-master-starts-the-game">
      <h4 className="message">Either select players from the list or enter the amount of players</h4>
      <section className="game-master-options-container">
        <input onChange={onAmountOfPlayersChange} className="input" type="text" name="input"
               placeholder={INPUT_AMOUNT_OF_PLAYERS} value={amountOfPlayers} />
        <OnlinePlayersForGameMasterToChoose players={players} />
      </section>
      <ControlPanelForGameStarting onOkButtonClick={onOkButtonClick} onCancelButtonClick={onCancelButtonClick} />
    </section>
  );
}

// GameMasterStartsTheGame.propTypes = {
//
// };
//
// GameMasterStartsTheGame.defaultProps = {
//
// };

export default GameMasterStartsTheGame;
