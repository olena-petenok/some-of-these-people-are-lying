import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import './game-is-on.sass';

import { CAPTION_THE_GAME_IS_ON, ERROR_NO_TOPIC, ERROR_EMPTY_LIST } from '../../constants/strings.js';

// import {  } from '../../utils/helper.js';

function Player(props) {
  const { userNickname, userScore, changeUserScore } = props;

  // change so that the function changeUserScore isn't here, but called in the parrent throug event.target.smth
  const onIncrementClicked = event => { changeUserScore(userNickname, 1); }
  const onDecrementClicked = event => { changeUserScore(userNickname, -1); }

  return (
    <li>
      <ul className="player-block">
        <li className="circle green"></li>
        <li className="player">{userNickname}</li>
        <li className="player">{userScore}</li>
        <li className="" onClick={onIncrementClicked}>increment</li>
        <li className="" onClick={onDecrementClicked}>decrement</li>
      </ul>
    </li>
  );
}

function GameIsOn(props) {
  const { topic, playersInTheGame, changeUserScore } = props;

  let players = null;
  if (!playersInTheGame || playersInTheGame.length === 0) { players = <li className="player">{ERROR_EMPTY_LIST}</li>; }
  else {
    players = playersInTheGame.map(item =>
      <Player key={item.id} userNickname={item.userNickname} userScore={item.userScore}
              changeUserScore={changeUserScore} /> );
  }

  return (
    <section>
      <h4>{CAPTION_THE_GAME_IS_ON}</h4>
      <p>{topic ? topic : ERROR_NO_TOPIC }</p>
      <ul>{players}</ul>
    </section>
  )
}

// GameIsOn.propTypes = {
//   topic: PropTypes.string
//   // , players:
// };
//
// GameIsOn.defaultProps = {
//   topic: ""
// };

export default GameIsOn;
