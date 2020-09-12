import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import Button from '../Button/Button';
import OnlinePlayersForGameMasterToChoose from '../OnlinePlayersForGameMasterToChoose/OnlinePlayersForGameMasterToChoose';

import './game-master-starts-the-game.sass';

import {
  BUTTON_SEND_AMOUNT_OF_PLAYERS,
  BUTTON_SEND_SELECTED_PLAYERS,
  BUTTON_CANCEL,
  INPUT_AMOUNT_OF_PLAYERS
} from '../../constants/strings.js';

// import {  } from '../../utils/helper.js';

function ControlPanelForGameStarting(props) {
  const {
    onStartGameWithSelectedPlayersButtonClick,
    onStartGameWithRandomPlayersButtonClick,
    onCancelButtonClick,
    players
  } = props;

  return (
    <section className="main-content-container">
      <Button parentFunction={onStartGameWithRandomPlayersButtonClick} buttonValue={BUTTON_SEND_AMOUNT_OF_PLAYERS} decoration={"green-border"} />
      <Button parentFunction={onStartGameWithSelectedPlayersButtonClick} buttonValue={BUTTON_SEND_SELECTED_PLAYERS} decoration={"green-border"} />
      <Button parentFunction={onCancelButtonClick}  buttonValue={BUTTON_CANCEL} decoration={'red-border margin-left-ten'} />
    </section>
  );
}

function GameMasterStartsTheGame(props) {
  const {
    sendAmountOfRandomPlayersThroughWebSocket,
    parseAndApplySelectedPlayers,
    setIsGameMasterStartsTheGame,
    players
  } = props;

  // regular expression for the numbers
  const [amountOfPlayers, setAmountOfPlayers] = useState("");
  const onAmountOfPlayersChange = event => { setAmountOfPlayers(event.target.value); }

  const onCancelButtonClick = event => { setIsGameMasterStartsTheGame(false); }

  const onStartGameWithRandomPlayersButtonClick = event => {
    if (amountOfPlayers !== "") {
      sendAmountOfRandomPlayersThroughWebSocket(amountOfPlayers);
      // if (amountOfPlayers < players.length - 2) {
      //   // validate data and probably parse int // console.log(`amountOfPlayers = ${amountOfPlayers}`);
      // } else {
      //   // tell user he's stupid
      // }
    }
  }

  const onStartGameWithSelectedPlayersButtonClick = event => {
    parseAndApplySelectedPlayers("test");
  }

  return (
    <section className="game-master-starts-the-game">
      <h4 className="message">Either select players from the list or enter the amount of players</h4>
      <section className="game-master-options-container">
        <input onChange={onAmountOfPlayersChange} className="input" type="text" name="input"
               placeholder={INPUT_AMOUNT_OF_PLAYERS} value={amountOfPlayers} />
        <OnlinePlayersForGameMasterToChoose players={players} />
      </section>
      <ControlPanelForGameStarting onStartGameWithRandomPlayersButtonClick={onStartGameWithRandomPlayersButtonClick}
                                   onStartGameWithSelectedPlayersButtonClick={onStartGameWithSelectedPlayersButtonClick}
                                   onCancelButtonClick={onCancelButtonClick} />
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
